const $api = require('../../api/api').API;
Page({
  data: {
    userInfo: {},
    isExit: false,
    groups: [{
      text: '退出登录',
      value: true
    }]
  },
  onShow() {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
  },
  onLoad() {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
  },
  exit() {
    if (this.data.userInfo) {
      this.setData({
        isExit: true,
      })
    } else {
      wx.showToast({
        title: '您还尚未登录',
        icon: "error"
      })
    }
  },
  toRider() {
    if (wx.getStorageSync('riderAccount')) {
      wx.redirectTo({
        url: '/rider/index/index',
      })
    } else {
      wx.redirectTo({
        url: '/rider/login/login',
      })
    }
  },
  editAddress() {
    const buyerAccountName = wx.getStorageSync('accountName');
    wx.chooseAddress({
      success(res) {
        var addressMessage = {
          buyerAccountName: buyerAccountName,
          buyerName: res.userName,
          buyerSex: 1,
          buyerAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buyerTel: res.telNumber
        }
        $api.updateAddress(addressMessage)
          .then((res) => {
            if(res.data.result == 1 ){
              wx.showToast({
                title: '修改成功',
                icon: "success"
              })
            }else{
              wx.showToast({
                title: '修改失败',
                icon: "error"
              })
            }
           
          })
      }
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/Login/Login',
    })
  },
  exitLogin() {
    wx.clearStorage();
    this.onLoad();
    this.setData({
      isExit: false
    })
    wx.reLaunch({
      url: '/pages/my/my',
    })
  },
})