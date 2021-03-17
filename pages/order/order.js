const $api = require('../../api/api').API;
 Page({
   data: {
    money:"",
   },
   onLoad(options) { 
     this.setData({
      money: options.money
     })
   },
   queryOrder(){
    $api.queryOrder()
   } 
 })