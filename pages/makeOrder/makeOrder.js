const $api = require('../../api/api').API;
Page({

  data: {
    buyerAddress: {},
    buyerAccountName:"",
  },


  onLoad() {
    this.getBuyerAddress();

  },
 
  getAddress(){
    var that = this;
    wx.chooseAddress({
      success(res) {
        
        let addressMessage={
          buyerAccountName:that.data.buyerAccountName,
          buyerName:res.userName,
          buyerSex:1,
          buyerAddress:res.provinceName+res.cityName+res.countyName+res.detailInfo,
          buyerTel:res.telNumber
        }
        $api.updateAddress(addressMessage)
        .then((response)=>{
          console.log(response);
        })
      }
    }) 
  },
  getBuyerAddress() {
    $api.getAccount()
      .then((res) => {
        var accountName = res.data.result.accountName;
        $api.getBuyerAddress(accountName)
          .then((resp) => {
        console.log(resp);
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