const $api = require('../../../api/api').API;
Component({
  data: {
    comments: [{
      shopId: '',
      orderId: '',
      commentImg: '',
      commentInfo: '',
      accountName: '',
      commentTime: '',
      commentScore: '',
      shopReply: '',
      shopReplyTime: '',
    }], 
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
    var comments = [] ;
    var param = {
      shopId: this.properties.shopId
    }
    $api.selectComment(param)
      .then((res) => {
        comments.push (res.data.result); 
      })
    console.log(this.data.comments);
  }
})