const $api = require('../../api/api').API;
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
    money: "",
    markers: [], 
    order:{}, 
  },
  onLoad(options) {
    qqmapsdk = new QQMapWX({
      key: 'MTTBZ-QC2CX-BQ34E-TE6WQ-ZO27E-JQFT6'
    });
    this.mapCtx = wx.createMapContext('myMap');
    this.queryOrder(options.orderId)
  },
  delete(){
    var orderId = this.data.order.orderId 
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '删除订单',
      content: '删除后无法再查看此订单，是否要继续',
      success: function (res) {
        if (res.confirm) { 
          var param = { 
            orderId: orderId
          }
          $api.deleteOrder(param)
            .then((res) => {
         
              if(res.data.result == 1){
                wx.showToast({
                  title: '删除成功',
                  icon:'success'
                })
              }
            })
        }
      }
    })
  },
  cancel(){  
    var orderId = this.data.order.orderId 
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '退款申请',
      content: '发起退款后无法再继续操作订单，是否要继续',
      success: function (res) {
        if (res.confirm) { 
          var param = {
            orderState: '-2', 
            orderId: orderId
          }
          $api.updateState(param)
            .then((res) => {
              console.log(res);
            })
        }
      }
    })

  },
  cancelCancel(){
    var orderId = this.data.order.orderId 
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '取消退款',
      content: '是否取消退款',
      success: function (res) {
        if (res.confirm) { 
          var param = {
            orderState: '0', 
            orderId: orderId
          }
          $api.updateState(param)
            .then((res) => {
              console.log(res);
            })
        } 
      } 
    })

  },
  queryAddress(buyerAddress, shopAddress) {
    var markers = []; 
    var _this = this;
    var buyerLatitude;
    var buyerLongitude;
    qqmapsdk.geocoder({
      address: buyerAddress,
      success: function (res) {
        var res = res.result;
        buyerLatitude = res.location.lat;
        buyerLongitude = res.location.lng;
        var point = [{
          latitude: buyerLatitude,
          longitude: buyerLongitude,
        }]
       var marker = {
          id: 0,
          title: res.title,
          latitude: buyerLatitude,
          longitude: buyerLongitude,
          iconPath: '../resources/picture/buyerAddress.jpg',
          width: 30,
          height: 30,
          callout: {
            content: '收货地址',
            color: '#409EFF',
            display: 'ALWAYS'
          }
        }
        markers.push(marker);
        qqmapsdk.geocoder({
          address: shopAddress,
          success: function (res) {
            var res = res.result;
            var latitude = res.location.lat;
            var longitude = res.location.lng;
            point.push({
              latitude: latitude,
              longitude: longitude,
            })   
            _this.mapCtx.includePoints({ 
              points:point
            })
            marker = {
                id: 1,
                title: res.title,
                latitude: latitude,
                longitude: longitude,
                iconPath:'../resources/picture/shopAddress.jpg',
                width: 30,
                height: 30,
                callout: {
                  content: ' 商家位置 ',
                  color: '#409EFF',
                  display: 'ALWAYS'
                }
              },
              markers.push(marker); 
            _this.setData({  
              markers: markers, 
            });
          },
          fail: function (error) {
            console.log(error);
            wx.showToast({
              title: '地图加载失败',
              icon:"error"
            }) 
          }
        }) 
      },
      fail: function (error) {
        console.log(error);
        wx.showToast({
          title: '地图加载失败',
          icon:"error"
        })
      }
    })
  }, 
  
  queryOrder(orderId) {
    var _this = this;
    let params = {
      orderId: Number(orderId)
    }
    $api.queryOrder(params)
      .then((res) => { 
        _this.queryAddress(res.data.result.buyerAddress.buyerAddress, res.data.result.shopAddress); 
        var order = res.data.result;
        var money = 0;
        order.shopping.forEach(ele =>{ 
            money += Number(ele.commodityNumber)*Number(ele.commodityPrice); 
        }) 
         _this.setData({
          money:money,
          order:order
         })
      }) 
  },
})