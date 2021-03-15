const $api = require('../../api/api').API;
Page({

  data: {
    shopId: "",
    shopSendPrice: "",
    shopName: "",
    buyerAddress: [],
    buyerAccountName: "",
  },


  onLoad(options) {
    this.getBuyerAddress();
    var shopId = options.shopId;
    var shopSendPrice = options.shopSendPrice;
    var shopName = options.shopName;
    this.setData({
      shopId: shopId,
      shopSendPrice: shopSendPrice,
      shopName: shopName,
    }) 
    
  },

  getAddress() {
    var that = this;
    wx.chooseAddress({
      success(res) {
        let addressMessage = {
          buyerAccountName: that.data.buyerAccountName,
          buyerName: res.userName,
          buyerSex: 1,
          buyerAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buyerTel: res.telNumber
        }
        $api.updateAddress(addressMessage)
          .then((response) => {
            wx.showToast({
              title: '添加成功',
              icon: "none"
            })
          })
      }
    })
    that.onLoad();
  },
  getBuyerAddress() {
    $api.getAccount()
      .then((res) => {
        var accountName = res.data.result.accountName;
        $api.getBuyerAddress(accountName)
          .then((resp) => {

            if (resp.data.code == -1) {
              this.setData({
                buyerAccountName: accountName
              })
            } else {
              var address = resp.data.result;
              this.setData({
                buyerAddress: address
              })

            }
          })


      })

  }

})