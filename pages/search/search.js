const $api = require('../../api/api').API;

Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      inputVal: "" //清空搜索框
    })
  },

//显示搜索框
showInput: function () {
  this.setData({
      inputShowed: true
  });
},
//隐藏搜索框
hideInput: function () {
  this.setData({
      inputVal: "",
      inputShowed: false,
      history: true, //显示历史记录
      shoppinglist: false //隐藏商品列表
  });
},
//清空搜索框
// clearInput: function () {
//   this.setData({
//       inputVal: "",
//       history: true, //显示历史记录
//       shoppinglist: false //隐藏商品列表
//   });
// },
//搜索框输入触发事件
search:function (e) {
  this.setData({
      inputVal: e.detail.value
  });
  this.data.historyArray.push(e.detail.value);
  console.log(this.data.historyArray);
  $api.queryShop(this.data.inputVal)
  .then((res)=>{
    console.log(res);
  })
  
},

  //搜索
  // search: function(e) {
  //   var searchtext = this.data.inputVal; //搜索框的值
  //   var sss = true;
  //   if (searchtext != "") {
  //     //将搜索框的值赋给历史数组
  //     this.data.historyArray.push(searchtext);
  //     //模糊查询 循环查询数组中的title字段
  //     for (var index in this.data.shoopingarray) {
  //       var num = this.data.shoopingarray[index].title.indexOf(searchtext);
  //       let temp = 'shoopingarray[' + index + '].status';
  //       if (num != -1) { //不匹配的不显示
  //         this.setData({
  //           [temp]: 1,
  //         })
  //         sss = false //隐藏未找到提示
  //       }
  //     }
  //     this.setData({
  //       history: false, //隐藏历史记录
  //       noneview: sss, //隐藏未找到提示
  //       shoppinglist: true, //显示商品列表
  //       newArray: this.data.historyArray //给新历史记录数组赋值
  //     })
  //   } else {
  //     this.setData({
  //       noneview: true, //显示未找到提示
  //       shoppinglist: false, //隐藏商品列表
  //       history: false, //隐藏历史记录
  //     })
  //   }
  // },
  data: {
    inputShowed: false,//隐藏搜索框
    inputVal: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //商品
      id: 0,
      images: "/images/3201.png",
      title: "完达山甄选牧场酸奶饮品牛奶饮料常温发酵乳包...",
      money: "88.00",
      sold: "78箱",
      status: 0
    }, {
      id: 1,
      images: "/images/3202.jpg",
      title: "网红 天日盐饼干 粗粮早餐 代餐宿舍小吃零食 130g*...",
      money: "26.80",
      sold: "34包",
      status: 0
    }]
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shoopingarray) {
        let temp = 'shoopingarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
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