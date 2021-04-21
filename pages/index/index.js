  
 const $api = require('../../api/api').API;
Page({ 
    onShareAppMessage() {
        return {
          title: 'swiper',
          path: 'page/component/pages/swiper/swiper'
        }
      },
  data: { 
    images:[ 
   "/pages/resources/picture/background.jpg","/pages/resources/picture/background1.jpg","/pages/resources/picture/background2.jpg" ],
    shops:"",
    inputShowed: false,
    inputVal: ""
  },
  //页面下拉
  onPullDownRefresh: function () {
    wx.vibrateShort();
    wx.showNavigationBarLoading(); 
    this.queryAllShop();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading(); //完成停止加载图标 
},
  //页面加载
  onLoad: function (options) {   
    this.queryAllShop();
  },
  queryAllShop(){ 
    $api.queryAllShop()
    .then(res =>{ 
        this.setData({
            shops: res.data.result
        }) 
    })
  },
  toSearch(){
    wx.navigateTo({
        url:"/pages/search/search"
    })
  }
})