const $api = require('../../api/api').API;
Page({
  data: {
    passwordIcon: "eyes-off",
    passwordType: "password",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    encryptedData: "",
    iv: "",
    canIUseOpenData: false // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  login() {
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          let params = {
            wxName:that.data.userInfo.nickName,
            wxImage:that.data.userInfo.avatarUrl,
            code: res.code,
            encryptedData: that.data.encryptedData,
            iv: that.data.iv,
          }
          $api.wxLogin(params)
            .then((resp) => {
              console.log(resp);
             if(resp.data.result){ 
                if("" == resp.data.result.token ){
                  wx.redirectTo({
                    url: '/pages/account/account?openId='+resp.data.result.openId,
                  }) 
                }else{ 
                  var token = resp.data.result.token;
                  wx.setStorage({
                    key:"token",
                    data:token
                  })
                  wx.navigateBack({
                    delta: 1
                })
                }
             }else{
              console.log('登录服务器失败');
             }
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          encryptedData: res.encryptedData,
          iv: res.iv
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    this.getUserInfo();
  },
  showPassword() {
    if (this.data.passwordType == "password") {
      this.setData({
        passwordIcon: "eyes-on",
        passwordType: "text"
      })
    } else {
      this.setData({
        passwordIcon: "eyes-off",
        passwordType: "password"
      })
    }

  },
})