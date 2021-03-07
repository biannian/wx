const $api = require('../../api/api').API;

Page({ 
sort(e){
  let property = e.currentTarget.dataset.property;
  let shops = this.data.shops;
  
  shops.sort(this.compare(property,this.data.sortRule)); 
  this.setData({
    shops:shops,
    sortRule:!this.data.sortRule
  }) 
},
//排序
compare: function (property, sortRule) {
  return function (a, b) {
  var value1 = a[property];
  var value2 = b[property];
  if(sortRule){
    return value1 - value2;
  }else {
    return value2 - value1;
  }
}
}, 
 
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      inputVal: "" //清空搜索框
    })
  },
 
 // 搜索
  search: function(e) {
    var searchtext = this.data.inputVal; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      //模糊查询 循环查询数组中的title字段

      $api.queryShop(searchtext)
        .then((res)=>{ 
          if(res.data.result != ""){
            this.setData({
              shops:res.data.result,
              noneview:false,
              newArray: this.data.historyArray,
              history: false
            }) 
          }else{
            this.setData({ 
              history: false, 
              noneview: true, 
              shops: false,  
              newArray: this.data.historyArray //给新历史记录数组赋值
            })
          }
        })  
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  data: {
    sortRule:true,
    shops:false,
    inputVal: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示 
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组 
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shops: false ,//隐藏商品列表
        noneview:false
      }); 
    }
    this.setData({
      inputVal: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      inputVal: e.target.dataset.text
    })
  }
})