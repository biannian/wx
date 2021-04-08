const $api = require('../../api/api').API;
Page({
  data: {
    account: "",
    pwd: "",
    pwd1: "",
    riderName:"",
    riderSex:"",
    riderAddress:"",
    riderTel:'',  
    riderAge:'',  
    passwordIcon: "eyes-off",
    passwordType: "password",
    passwordIcon1: "eyes-off",
    passwordType1: "password",
    accountWarning: false,
    accountIsRepeat: false,
    pwdWarning: false,
    pwdWarning1: false,
    nameWarning:false,
    addressWarning:false,
    telWarning:false,
    ageWarning:false,
    openId:"",
  },
  onLoad: function (options) {  
    this.setData({
      openId:options.openId
    }) 
  },
  //检查手机号格式
  checkTel(evt) {
    var reg = /^[0-9]{11}$/;
    var riderTel = evt.detail.value;
    if (!reg.test(riderTel)) {
      this.setData({
        riderTel: riderTel,
        telWarning: true,
      });
    } else {
      this.setData({
        riderTel: riderTel,
        telWarning: false,
      });
    }
  },
  checkAge(evt) { 
    var riderAge =  evt.detail.value ; 
    if ( Number(riderAge) < '18' ||  Number(riderAge) > '55') {
      this.setData({
        riderAge: riderAge,
        ageWarning: true,
      });
    } else {
      this.setData({
        riderAge: riderAge,
        ageWarning: false,
      });
    }
  },
  checkAddress(evt) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]{6,25}$/;
    var riderAddress = evt.detail.value;
    if (!reg.test(riderAddress)) {
      this.setData({
        riderAddress: riderAddress,
        addressWarning: true,
      });
    } else {
      this.setData({
        riderAddress: riderAddress,
        addressWarning: false,
      });
    }
  },
  checkAccount(evt) {
    var reg = /^[A-Za-z0-9]{4,8}$/;
    var account = evt.detail.value;
    if (!reg.test(account)) {
      this.setData({
        account: account,
        accountWarning: true,
      });
    } else {
      this.setData({
        account: account,
        accountWarning: false,
      });
    }
  },
  checkName(evt) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z-z]{2,8}$/;
    var riderName = evt.detail.value;
    if (!reg.test(riderName)) {
      this.setData({
        riderName: riderName,
        nameWarning: true,
      });
    } else {
      this.setData({
        riderName: riderName,
        nameWarning: false,
      });
    }
  },
  checkPwd(evt) {
    var reg = /^[A-Za-z0-9]{4,10}$/;
    var pwd = evt.detail.value;
    if (!reg.test(pwd)) {
      this.setData({
        pwd: pwd,
        pwdWarning: true,
      });
    } else {
      this.setData({
        pwd: pwd,
        pwdWarning: false,
      });
    }
  },
  checkPwd1(evt) {
    var pwd1 = evt.detail.value;
    if (pwd1 != this.data.pwd) {
      this.setData({
        pwd1: pwd1,
        pwdWarning1: true,
      });
    } else {
      this.setData({
        pwd1: pwd1,
        pwdWarning1: false,
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
    if (!this.data.pwdWarning && !this.data.pwdWarning1 && !this.data.accountWarning && !this.data.nameWarning && !this.data.addressWarning && !this.data.telWarning && !this.data.ageWarning) {
      var message = "";
      if ("" == this.data.riderTel) {
        message = "请输入手机号";
      }
      if ("" == this.data.riderAddress) {
        message = "请输入联系地址";
      }
      if ("" == this.data.riderAge) {
        message = "请输入年龄";
      }
      if ("" == this.data.riderSex) {
        message = "请选择性别";
      }
      if ("" == this.data.riderName) {
        message = "请输入姓名";
      }
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
        return;
      } 
      if ("" != this.data.account && "" != this.data.pwd && "" != this.data.pwd1 && "" != this.data.riderName && "" != this.data.riderSex && "" != this.data.riderAddress && "" != this.data.riderTel && "" != this.data.riderAge ) {
        var account = this.data.account;
        $api.checkAccount(account)
          .then((res) => { 
            if (res.data.result == -1) {
              wx.showToast({
                title: "用户名重复",
                icon: 'none',
                duration: 1000
              })
            } else {
              let a ={
                name:this.data.riderName,
                sex:this.data.riderSex,
                address:this.data.riderAddress,
                tel:this.data.riderTel,
                age:this.data.riderAge,
                accountName:account,
                accountPassword:this.data.pwd,
                accountLimit:'2',
                openId:this.data.openId
              }
              $api.register(a)
              .then((res)=>{
                if(res.data.result){
                  var token = res.data.result;
                  wx.setStorage({
                    key:"token",
                    data:token
                  }) 
                  wx.showToast({
                    title: '提交成功',
                    icon:"success", 
                  })
                  setTimeout(function () {
                   wx.redirectTo({
                     url: '/rider/index/index',
                   })
                  }, 700) 
                }else{
                  wx.showToast({
                    title: '更新失败，请联系管理员',
                    icon:"error", 
                  })
                }
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
  },
  radioChange(e) { 
    this.setData({
      riderSex:e.detail.value
    })
  }
});