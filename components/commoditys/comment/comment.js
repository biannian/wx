const $api = require('../../../api/api').API;
Component({
  data: {
    comments: [],
    shopId: '',
  },
  properties: {
    shopId: {
      type: String,
    }
  },
  ready() {
    this.setData({
      shopId: this.properties.shopId,
    }) 
    var param = {
      shopId: this.properties.shopId
    }
    $api.selectComment(param)
      .then((res) => {  
        this.setData({
          comments: res.data.result.reverse()
        }) 
      })  
  }
})