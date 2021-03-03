// index.js



// 获取应用实例
const app = getApp()
const $api = require("/wx/api/api");
Page({ 
  data: {
    inputShowed: false,
    inputVal: ""
  },
  //页面加载
  onLoad: function (options) {
    // $api.queryAllShop()
    // .then(res =>{
    // })
  },
  showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},
inputTyping: function (e) {
    this.setData({
        inputVal: e.detail.value
    });
}

})