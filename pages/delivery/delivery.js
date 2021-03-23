Page({ 
  data: { 
    address:"",
    toAddress:"",
  },  
  onLoad: function (options) {  
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
    var accountName = wx.getStorageSync('accountName');
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