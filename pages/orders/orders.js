 
const $api = require('../../api/api').API;
Page({
  data: {
    current: 0,
    orderlist:[]
  },
  onLoad(){
    this.queryAllShop();
  },
  queryAllShop(){
    var orderBuyerAccount = wx.getStorageSync('accountName'); 
    var params = {
      orderBuyerAccount:orderBuyerAccount
    }
    $api.selectOrder(params)
    .then(res =>{ 
        this.setData({
          orderlist: res.data.result
        }) 
    }) 
  },
  toShop(e){   
    wx.navigateTo({
      url: '/pages/commodity/commodity?shopId='+ e.currentTarget.id,
    })
  },
  payorder:function(e){
    var orderid=e.target.dataset.id;
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
  delorder:function(e){
  wx.showToast({
      title: '正在取消订单，请稍候...',
      icon: 'loading',
      duration: 10000
  })
    var that=this
    console.log(e.target.dataset.id)
    wx.request({
      url: `${app.globalData.API_URL}`+'/order/'+e.target.dataset.id,
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data==1){
           that.onLoad()
          wx.hideToast()
        }
       
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})