const $api = require('../../api/api').API;
Page({
  data: {
    money: "",
  },
  onLoad(options) {
    this.queryOrder(options.orderId)
  },
  queryOrder(orderId) {
    let params = {
      orderId:Number(orderId)
    } 
    $api.queryOrder(params).then((res) => {
      console.log(res);
    })
  }
})