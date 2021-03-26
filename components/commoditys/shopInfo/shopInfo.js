const $api = require('../../../api/api').API;
Component({
  data: {
   shopInfo:{}
  },
  properties: { 
    shopId: {
      type: Number,
    }
  },
 ready(){
  let a = {
    shopId:this.data.shopId
  }
 $api.queryShopInfo(a).then((res)=>{  
   this.setData({
    shopInfo:res.data.result
   })
 })
 },
 
})