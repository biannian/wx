Page({ 
  data: {  
    address:"",
    toAddress:"",
    thingName:"",
  },  
  onLoad: function (options) {  
  },
  inputChange(e){ 
    this.setData({
      thingName:e.detail.value
    })
  },
  makeErrand(){
   var thingName = this.data.thingName;
    var address = this.data.address;
    var toAddress = this.data.toAddress;
    var accountName = wx.getStorageSync('accountName');
    if(!address){
      wx.showToast({
        title: '寄件地址不能为空',
        icon:"error"
      })
      return;
    }
    if(!toAddress){
      wx.showToast({
        title: '收件地址不能为空',
        icon:"error"
      })
      return;
    }
    if(!thingName){
      wx.showToast({
        title: '物品名不能为空',
        icon:"error"
      })
      return;
    }
    let param = {
      thingName:thingName,
      address : address,
      toAddress:toAddress,
      accountName:accountName
    }
    console.log(param);
   
  },
  whereToAddress(){
    var _this = this; 
    wx.chooseAddress({
      success(res) {
        var address = { 
          buyerName: res.userName, 
          buyerAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buyerTel: res.telNumber
        } 
        _this.setData({
          toAddress:address
        })
      }
    })
  },
  selectAddress(){
    var _this = this; 
    wx.chooseAddress({
      success(res) {
        var address = {
        
          buyerName: res.userName, 
          buyerAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buyerTel: res.telNumber
        } 
        _this.setData({
          address:address
        })
      }
    })
  },

})