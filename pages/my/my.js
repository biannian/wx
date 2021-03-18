 Page({
   data: {
    userInfo:{},
   },
   onLoad() {
     var userInfo =  wx.getStorageSync('userInfo');
     this.setData({
      userInfo:userInfo
     })
   },
 })