 
 const $api = require('../../api/api').API;
Page({
  data: {
    current: 0,
    riderInfo:"",
    isExit:false,
    groups:[{
      text:'退出登录',value:true
    }]
  },
  onShow(){
    var riderInfo =  wx.getStorageSync('riderInfo');
    this.setData({
      riderInfo:riderInfo
    }) 
   },
   onPullDownRefresh: function () {
    wx.vibrateShort();
    wx.showNavigationBarLoading();  
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading(); //完成停止加载图标 
   },
  onLoad:function(){ 
    this.queryOrder();
  }, 
  queryOrder(){
    var riderAccount = wx.getStorageSync('riderAccount');
    let a = {
      orderState:'0',
      orderRiderAccount:riderAccount
    }
    $api.queryOrder(a).then((res)=>{
      console.log(res);
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {

    this.setData({
      current: e.detail.current
    })
  }, 
  exitLogin(){
    wx.removeStorageSync('riderInfo');
    wx.removeStorageSync('riderAccount');
    this.setData({
      isExit:false
    })
    wx.reLaunch({
      url: '/pages/my/my',
    })
   },
  exit(){
    if(this.data.riderInfo){
     this.setData({
       isExit:true,
      })
    }else{
      wx.showToast({
        title: '您还尚未登录',
        icon:"error"
      })
    } 
  },
})