 Page({
   data: {
    userInfo:{},
    isExit:false,
    groups:[{
      text:'退出登录',value:true
    }]
   },
   onShow(){
    var userInfo =  wx.getStorageSync('userInfo');
    this.setData({
     userInfo:userInfo
    })
   },
   onLoad() {
     var userInfo =  wx.getStorageSync('userInfo');
     this.setData({
      userInfo:userInfo
     })
   },
   exit(){
     if(this.data.userInfo){
      this.setData({
        isExit:true,
       })
     }else{
       wx.showToast({
         title: '您还尚未登录',
         icon:"error"
       })
     } 
   },
   toRider(){ 
     if(wx.getStorageSync('riderAccount')){
        wx.redirectTo({
          url: '/rider/index/index',
        })
     }else{
       wx.redirectTo({
         url: '/rider/login/login',
       })
     }
   },
   editAddress(){
    wx.chooseAddress({
      success(res) {
        console.log(res);
      }
   })
  },
   toLogin(){
     wx.navigateTo({
       url: '/pages/Login/Login',
     })
   },
   exitLogin(){
    wx.clearStorage();
    this.onLoad();
    this.setData({
      isExit:false
    })
    wx.reLaunch({
      url: '/pages/my/my',
    })
   },
 })