 const $api = require('../../api/api').API;
 const formatTime = require('../../utils/util').formatTime;
 Page({
   data: {
     isLogin:false,
     current: 0,
     orderlist: []
   },
   onPullDownRefresh: function () {
    wx.vibrateShort();
    wx.showNavigationBarLoading(); 
    this.queryAllShop();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading(); //完成停止加载图标 
   },
   onShow(){
    this.queryAllShop();
   },
   onLoad() {
     this.queryAllShop();
   },
   queryAllShop() {
     var orderBuyerAccount = wx.getStorageSync('accountName');
     if(orderBuyerAccount){ 
      var params = {
        orderBuyerAccount: orderBuyerAccount
      }
      $api.selectOrder(params)
        .then(res => { 
          this.setData({
            isLogin:true,
            orderlist: res.data.result
          })
        })
     }  
   },
   toShop(e) {
     wx.navigateTo({
       url: '/pages/commodity/commodity?shopId=' + e.currentTarget.id,
     })
   },
   toOrder(e) {
     wx.navigateTo({
       url: '/pages/order/order?orderId=' + e.currentTarget.id,
     })
   },
   makeSure(e) {
     var _this = this;
     wx.showModal({
       cancelColor: 'cancelColor',
       title: '确认收货',
       content: '确认收货后无法再继续操作订单，是否要继续',
       success: function (res) {
         if (res.confirm) {
           let time = formatTime("YYYY-mm-dd HH:MM:SS", new Date());
           var param = {
             orderState: '4',
             orderBuyerTime1: time,
             orderId: e.currentTarget.id
           }
           $api.updateState(param)
             .then(() => {
              _this.queryAllShop();
             })
         }
       }
     })
   
   },
   payorder: function (e) {
     var orderid = e.target.dataset.id;
     wx.setStorageSync('orderid', orderid)
     uctooPay.generateOrder();
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
 
 })