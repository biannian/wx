const $api = require('../../api/api').API;
const formatTime = require('../../utils/util').formatTime;
Page({

  data: {
    pwd: '',
    buyOn: false,
    tableware: "",
    tablewares: ["不需要提供",
      "一人份",
      "两人份",
      "依据餐量提供",
    ],
    tips: "",
    totalMoney: "",
    shopId: "",
    shopSendPrice: "",
    shopName: "",
    shops: [],
    buyerAddress: [],
    buyerAccountName: "",
  },
  //从url里取得各类数据 
  onLoad(options) {
    this.getBuyerAddress();
    var shopId = options.shopId;
    var shopSendPrice = options.shopSendPrice;
    var shopName = options.shopName;
    var totalMoney = options.totalMoney;
    var shops = wx.getStorageSync("shop" + shopId);
    this.setData({
      totalMoney: totalMoney,
      shops: shops,
      shopId: shopId,
      shopSendPrice: shopSendPrice,
      shopName: shopName,
    })
  },

  //添加餐具
  bindPickerChange(e) {
    var tablewares = this.data.tablewares;
    this.setData({
      tableware: tablewares[e.detail.value]
    })
  },
  //添加订单备注
  addTips() {
    wx.navigateTo({
      url: "/pages/addTips/addTips?tips=" + this.data.tips,
    })
  },
  //新增地址
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
  //从后台查询买家地址
  getBuyerAddress() {
    $api.getAccount()
      .then((res) => {
        var accountName = res.data.result.accountName;
        wx.setStorage({
          data: accountName,
          key: 'accountName',
        })
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

  },
  //下单
  buy() {
    this.setData({
      buyOn: true
    })
  },
  closeBuy() {
    this.setData({
      buyOn: false
    })
  },
  pwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  checkPwd() {
    var pwd = this.data.pwd;
    var accountName = wx.getStorageSync('accountName');
    var shopId = this.data.shopId;
    var shopping = this.data.shops;
    var tips = this.data.tips;
    var tableware = this.data.tableware;
    let params = {
      accountName: accountName,
      accountPassword: pwd
    }
    $api.login(params)
      .then((res) => {
        if (res.data.code == '200') {
          wx.showToast({
            title: '支付成功',
            icon: "success"
          })
          let time = formatTime("YYYY-mm-dd HH:MM:SS", new Date());
          let param = {
            orderBuyerId:accountName,
            orderBuyerTime: time,
            orderState: '0',
            shopId: shopId,
            shopping:shopping,
            orderTips:tips,
            tableware:tableware,
          } 
        $api.addOrder(param)
        .then((res)=>{
          if(res.data.code == '200'){
            wx.reLaunch({
              url: '../msgSuccess/msgSuccess?money='+this.data.totalMoney
            })
          }
        })
        wx.removeStorage({
          key: 'shop'+shopId, 
        })
        } else {
          wx.showToast({
            title: '密码错误',
            icon: "error"
          })
          this.setData({
            buyOn:false
          })
        }
      })
  }

})