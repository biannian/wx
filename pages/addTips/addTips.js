 Page({
   data: {
     tips: "",
   },
   onLoad(options) {
     this.setData({
       tips: options.tips
     })
   },
   setTips(e) {
     this.setData({
       tips: e.detail.value
     })
   },
   submit() {
     var pages = getCurrentPages(); // 当前页，
     var prevPage = pages[pages.length - 2]; // 上一页   
     prevPage.setData({
       tips: this.data.tips,
     })
     wx.navigateBack({
       delta: 1
     })
   },

 })