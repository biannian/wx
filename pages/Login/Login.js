const $api = require('../../api/api').API;
Page({
  data: {
    accountName: '',
    accountPassword: '',
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
  loadAccount(e) {
    this.setData({
      accountName: e.detail.value
    })
  },
  loadPassword(e) {
    this.setData({
      accountPassword: e.detail.value
    })
  },
  login() {
    var accountName = this.data.accountName;
    var accountPassword = this.data.accountPassword;
    if (accountName == "") {
      wx.showToast({
        title: '请输入账户名',
        icon: "none"
      })
      return;
    }
    if (accountPassword == "") {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return;
    }
    let params = {
      accountPassword: accountPassword,
      accountName: accountName
    }
    $api.login(params)
      .then((res) => {  
        if (res.data.result) {
          if(res.data.code == '403'){
            wx.showToast({
              title: '账户被禁用',
              icon: "error"
            })
            return;
          } 
          if(res.data.result.limit != '1'){
            wx.showToast({
              title: '非用户账户',
              icon: "error"
            })
            return;
          }
          wx.showToast({
            title: '登录成功',
            icon: "success"
          })
          let token = res.data.result.token;
          wx.setStorage({
            key: "accountName",
            data: accountName
          }) 
          var nickName =res.data.result.wxName;
          var avatarUrl = res.data.result.wxImage;
          var userInfo={
            nickName:nickName,
            avatarUrl:avatarUrl
          };
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          }) 
          wx.setStorage({
            key: "token",
            data: token
          })
          if (getCurrentPages().length > '1') {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 700)
          } else {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/my/my',
              })
            }, 700) 
          }
        } else {
          //登录失败
          wx.showToast({
            title: '账户或密码错误',
            icon: "error"
          })
        }
      })
  },
  wxLogin() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          let params = {
            limit:'1',
            wxName: that.data.userInfo.nickName,
            wxImage: that.data.userInfo.avatarUrl,
            code: res.code,
            encryptedData: that.data.encryptedData,
            iv: that.data.iv,
          }
          $api.wxLogin(params)
            .then((resp) => {  
              if (resp.data.result) { 
                if ("" == resp.data.result.token) {
                  wx.redirectTo({
                    url: '/pages/account/account?openId=' + resp.data.result.openId,
                  })
                } else {
                  var token = resp.data.result.token;
                  wx.setStorage({
                    key: "token",
                    data: token
                  })
                  wx.showToast({
                    title: '登录成功',
                    icon: "success"
                  })
                  $api.getAccount()
                  .then((res)=>{
                    var name = res.data.result.accountName
                    wx.setStorage({
                      key: "accountName",
                      data: name
                    })
                  })
                  if (getCurrentPages().length > '1') {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 700)
                  } else {
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '/pages/my/my',
                      })
                    }, 700) 
                  }
                }
              } else {
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
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key: "userInfo",
          data: res.userInfo
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