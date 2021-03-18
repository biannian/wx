const $api = require('../../api/api').API;

Page({
 
  data: {
    shops:{},
  }, 
  onLoad: function (options) {
    this.queryByType(options.shopTypeId);
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