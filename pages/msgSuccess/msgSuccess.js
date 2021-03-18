 Page({
   data: {
    money:'',
    orderId:'',
   },
   onLoad(options) { 
     this.setData({
      money: options.money,
      orderId:options.orderId
     })
   },
   toOrder(){
     var orderId = this.data.orderId;
     wx.reLaunch({
       url: '/pages/order/order?orderId='+orderId,
     })
   },

 })