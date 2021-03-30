const $api = require('../../api/api').API;
Page({
  data: {
    account: "",
    pwd: "",
    pwd1: "",
    passwordIcon: "eyes-off",
    passwordType: "password",
    passwordIcon1: "eyes-off",
    passwordType1: "password",
    pwdWaring: false,
    pwdWaring1: false,
  },
  onLoad() {
    this.setData({
      account: wx.getStorageSync('riderAccount')
    })
  },

  checkPwd(evt) {
    var reg = /^[A-Za-z0-9]{4,10}$/;
    var pwd = evt.detail.value;
    if (!reg.test(pwd)) {
      this.setData({
        pwd: pwd,
        pwdWaring: true,
      });
    } else {
      this.setData({
        pwd: pwd,
        pwdWaring: false,
      });
    }
  },
  checkPwd1(evt) {
    var pwd1 = evt.detail.value;
    if (pwd1 != this.data.pwd) {
      this.setData({
        pwd1: pwd1,
        pwdWaring1: true,
      });
    } else {
      this.setData({
        pwd1: pwd1,
        pwdWaring1: false,
      });
    }
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
  showPassword1() {
    if (this.data.passwordType1 == "password") {
      this.setData({
        passwordIcon1: "eyes-on",
        passwordType1: "text"
      })
    } else {
      this.setData({
        passwordIcon1: "eyes-off",
        passwordType1: "password"
      })
    }

  },
  onConfirm() {
    if (!this.data.pwdWaring && !this.data.pwdWaring1) {
      var message = "";
      if ("" == this.data.pwd1) {
        message = "请输入重复密码";
      }
      if ("" == this.data.pwd) {
        message = "请输入密码";
      }
      if ("" == this.data.account) {
        message = "请输入账户名";
      }
      if ("" != message) {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 1000
        })
      }
      if ( "" != this.data.pwd && "" != this.data.pwd1) { 
        let a = {
          accountName: this.data.account,
          accountPassword: this.data.pwd, 
        }
        $api.updatePassword(a)
          .then((res) => {
            if (res.data.result == '1') { 
              wx.showToast({
                title: '提交成功',
                icon: "success",
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 700)
            } else {
              wx.showToast({
                title: '更新失败，请联系管理员',
                icon: "error",
              })
            }
          })
      }

    } else {
      wx.showToast({
        title: '信息未完成不能提交',
        icon: 'none',
        duration: 1000
      })
    }
  }
});