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
    nameWarning:false,
    addressWarning:false,
    telWarning:false,
    ageWarning:false,
    openId:"",
  },
  onLoad() {  
    this.queryRiderInfo(); 
  },
  //查询信息
  queryRiderInfo(){
    var account = wx.getStorageSync('riderAccount');
    this.setData({
      account:account
    }) 
    let a = {
      riderAccount:account
    } 
    $api.queryRiderInfo(a)
    .then((res)=>{
      this.setData({
        riderName:res.data.result.name,
        riderSex:res.data.result.sex,
        riderAddress:res.data.result.address,
        riderTel:res.data.result.tel,  
        riderAge:res.data.result.age, 
      })
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
  onConfirm() {   
    if (!this.data.nameWarning && !this.data.addressWarning && !this.data.telWarning && !this.data.ageWarning) {
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
      if ("" != message) {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 1000
        })
        return;
      } 
      if ("" != this.data.account && "" != this.data.riderName && "" != this.data.riderSex && "" != this.data.riderAddress && "" != this.data.riderTel && "" != this.data.riderAge ) {
        var account = this.data.account; 
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
              $api.updateRiderInfo(a)
              .then((res)=>{
                if(res.data.result ==1){
            
                  wx.showToast({
                    title: '提交成功',
                    icon:"success", 
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
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