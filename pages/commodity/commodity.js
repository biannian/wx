const $api = require('../../api/api').API;
Page({
  data: { 
    shop:{}, 
    tabs: ["点餐", "评价", "商家"],
    activeIndex: 0,
  },
  onLoad: function (options) { 
    this.queryById(options.shopId); 
  },
  queryById(shopId) {
    $api.queryById(shopId)
    .then((res)=>{
      this.setData({
       shop:res.data.result
      });
    })
  },
  tabClick: function (e) { 
    this.setData({ 
      activeIndex: e.currentTarget.id
    });
  }
})