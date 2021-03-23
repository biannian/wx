const $api = require('../../api/api').API;

Page({
 
  data: {
    shops:{},
  }, 
  onLoad: function (options) { 
    if(options.shopTypeId){
      this.queryByType(options.shopTypeId);
    }else{
      this.queryBuyerLikeShop();
    }
  
  },
  queryBuyerLikeShop(){
    var accountName = wx.getStorageSync('accountName'); 
      let params = {
        buyerAccount:accountName
      }
      $api.queryBuyerLikeShopInfo(params)
      .then((res)=>{ 
        this.setData({
          shops:res.data.result
        })
      })
  
  },
  queryByType(shopTypeId){
    $api.queryByType(shopTypeId)
    .then((res)=>{
        this.setData({
          shops:res.data.result
        })
    })
  },
})