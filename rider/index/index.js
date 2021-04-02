 const $api = require('../../api/api').API;
 const formatTime = require('../../utils/util').formatTime;
 Page({
   data: {
     orderState: '1',
     order: {},
     current: 0,
     riderInfo: "",
     isExit: false,
     groups: [{
       text: '退出登录',
       value: true
     }]
   },
   onShow() {
     var riderInfo = wx.getStorageSync('riderInfo');
     this.setData({
       riderInfo: riderInfo
     })
   },
   onPullDownRefresh: function () {
     wx.vibrateShort();
     wx.showNavigationBarLoading();
     this.queryOrder();
     wx.stopPullDownRefresh();
     wx.hideNavigationBarLoading(); //完成停止加载图标 
   },
   onLoad: function () { 
     this.queryOrder();
   },
   isArrive(e){
     var _this = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '确认送达',
      content: '是否已送达',
      success: function (res) {
        if (res.confirm) {
          let time = formatTime("YYYY-mm-dd HH:MM:SS", new Date());
          var param = {
            orderState: '3',
            orderRiderTime1: time,
            orderId: e.currentTarget.id
          }
          $api.updateState(param)
            .then((res) => {
              if(res.data.result == '1'){
                wx.showToast({
                  icon:"success"
                })
                _this.queryOrder();
              }
            })
        }
      }
    })
   },
   getOrder(e){  
     var _this = this;
     wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确认派送此单吗',
      success: function (res) {
        if (res.confirm) { 
          let time = formatTime("YYYY-mm-dd HH:MM:SS", new Date());
          var param = {
            orderState: '2', 
            orderRiderTime: time,
            orderRiderAccount:wx.getStorageSync('riderAccount'),
            orderId:e.currentTarget.id 
          }
          $api.riderUpdateState(param)
            .then((res) => {
              if(res.data.code == 200){
                wx.showToast({
                  title: '接单成功',
                })
                _this.queryOrder();
              }
            })
        }
      }
    })
   },
   toOrder(e) {
     wx.navigateTo({
       url: '/rider/order/order?orderId=' + e.currentTarget.id,
     })
   },
   queryOrder() {
     var riderAccount = wx.getStorageSync('riderAccount');
     let a = {
       orderState: this.data.orderState,
       orderRiderAccount: riderAccount
     } 
     $api.queryOrder(a).then((res) => { 
       this.setData({
         order: res.data.result
       })
     })
   },
   switchSlider(e) {
     this.setData({
       current: e.target.dataset.index
     }) 
     switch (e.target.dataset.index) {
       case '0': 
       this.setData({
         orderState:'1'
       })
         break;
       case '1':
        this.setData({
          orderState:'2'
        })
         break;
       case '2':
        this.setData({
          orderState:'3'
        })
         break; 
     }
    this.queryOrder(); 
   }, 
   exitLogin() {
     wx.removeStorageSync('riderInfo');
     wx.removeStorageSync('riderAccount');
     this.setData({
       isExit: false
     })
     wx.reLaunch({
       url: '/pages/my/my',
     })
   },
   exit() {
     if (this.data.riderInfo) {
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
 })