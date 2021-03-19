const $api = require('../../api/api').API;
Page({
  data: { 
    isSave:false,
    current: 0,
    scrollTop:'',
    shopId:"",
    shop:{}, 
    saveColor:'',
    // tabs: ["点餐", "评价", "商家"],
    // activeIndex: 0,
  },
  onLoad: function (options) { 
    this.queryById(options.shopId) 
    this.queryBuyerLikeShop(options.shopId);
      this.setData({
        shopId:options.shopId
      })
  },
  queryBuyerLikeShop(shopId){ 
  var accountName = wx.getStorageSync('accountName');
  let param = {
    buyerAccount:accountName
  }
    $api.queryBuyerLikeShop(param)
    .then((res)=>{ 
     
      var shops = res.data.result;   
      if(shops.includes(Number(shopId))){
         this.setData({
           isSave:true,
          saveColor:"yellow"
         })
      }
    }) 
  },
  save(){  
    var _this = this;
    var shopId = _this.data.shopId;
    var buyerAccount = wx.getStorageSync('accountName');
    var params = {
      buyerAccount:buyerAccount,
      shopId:shopId
    }
    if(!_this.data.isSave){ 
      $api.addBuyerLikeShop(params)
      .then((res)=>{
        if(res.data.code == '200'){
          wx.showToast({
            title: '收藏成功',
            icon:"success"
          })
          _this.setData({
            isSave:true,
            saveColor:"yellow",
          })
        }
      })
    }else{
      $api.deleteBuyerLikeShop(params)
      .then((res)=>{
        if(res.data.code == '200'){
          wx.showToast({
            title: '取消收藏',
            icon:"error"
          })
          _this.setData({
            isSave:false,
            saveColor:'',
          })
        }
      })
    } 
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  onPageScroll:function(e){ 
     this.setData({ 
      scrollTop: e.scrollTop
     })  
  },
  queryById(shopId) {
    $api.queryById(shopId)
    .then((res)=>{ 
      this.setData({
       shop:res.data.result
      });
    })
  },
  // tabClick: function (e) { 
  //   this.setData({ 
  //     activeIndex: e.currentTarget.id
  //   });
  // },

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