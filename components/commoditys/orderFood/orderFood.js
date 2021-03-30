const $api = require('../../../api/api').API;
Component({
  data: {
    shop: {},
    shopId: "",
    img: "",
    imgOn: false,
    menuMap: [],
    totalMoney: 0,
    shops: [],
    dialog: false,
    activeIndex: '',
  },
  properties: {
    shop: {
      type: Object,
    },
    scrollTop: {
      type: Number,
    },
    shopId: {
      type: String,
    }
  },
  ready() {
    this.setData({
      shopId: this.properties.shopId,
    })
    $api.queryById(this.properties.shopId)
      .then((res) => {
        this.setData({
          shop: res.data.result
        });
        wx.nextTick(() => {
          this.shopping();
          this.commodityHeight(); // 在当前同步流程结束后，下一个时间片执行
        })
      })
  },
  options: {
    addGlobalClass: true
  },
  observers: {
    'scrollTop': function (scrollTop) {
      var _this = this;
      var menuMap = this.data.menuMap;
      var menuId = this.data.activeIndex;
      menuMap.forEach(map => {
        var he = map.height - 160;
        if (he <= scrollTop) {
          // if (map.height <= scrollTop) {
          menuId = map.menuId;
          _this.setData({
            imgOn: true,
            activeIndex: menuId
          })
        }
      })

    },
    'shops': function (shops) {
      var shopId = this.data.shopId;
      wx.setStorage({
        key: "shop" + shopId,
        data: shops
      })
      if (shops.length == 0) {
        wx.removeStorageSync("shop" + shopId);
      }
    }
  },
  methods: {

    commodityHeight() {
      var menus = [];
      var menuMaps = [];
      var commodity = this.data.shop.shop.commodity;
      if (commodity) {
        commodity.forEach(commo => {
          if (!menus.includes(commo.commodityMenuId)) {
            menus.push(commo.commodityMenuId);
          }
        })
        menus.forEach(menu => {
          this.createSelectorQuery().select('#shopMenu' + menu).boundingClientRect((res) => {
            var menuMap = {
              menuId: '',
              height: ''
            };

            menuMap.menuId = menu;
            menuMap.height = res.top;
            // menuMap.height = res.top-160;
            menuMaps.push(menuMap);
          }).exec()
        });
        this.setData({
          menuMap: menuMaps
        })
      }
    },
    //排序
    compare: function (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    shopping() {
      var shops = wx.getStorageSync("shop" + this.data.shopId);
      var commodity = this.data.shop.shop.commodity;

      //显示的商品列表
      var commodityIndex = this.data.shop.commodity;
      var money = this.data.totalMoney;
      if (shops) {
        shops.forEach(element => {
          money += element.shoppingNumber * element.commodityPrice;
        });

        for (let i = 0; i < shops.length; i++) {
          const element = shops[i];
          commodity.forEach(ele => {
            if (ele.commodityId == element.commodityId) {
              commodityIndex[ele.commodityMenuId].forEach(commo => {
                if (element.commodityId == commo.commodityId) {
                  commo.shoppingNumber = element.shoppingNumber;
                }
              })
            }
          });
        }

        var shop = this.data.shop;
        shop.commodity = commodityIndex;
        this.setData({
          shop: shop,
          shops: shops,
          totalMoney: money
        })
      }
    },
    addShopping(e) {
      var commodityID = e.currentTarget.id;
      var commodity = this.data.shop.shop.commodity;
      var commoditys = this.data.shop.commodity;
      var shops = this.data.shops;
      var totalMoney = this.data.totalMoney;
      commodity.forEach(element => {
        if (element.commodityId == commodityID) {
          commoditys[element.commodityMenuId].forEach(ele => {
            if (ele.commodityId == commodityID) {
              if (ele.commodityNumber <= ele.shoppingNumber) {
                wx.showToast({
                  title: '没有库存',
                  icon: 'none',
                  duration: 1500
                })
              } else {
                shops.push(ele);
                ele.shoppingNumber += 1;
                var ids = [];
                for (let m = 0; m < shops.length; m++) {
                  const sh = shops[m];
                  if (!ids.includes(sh.commodityId)) {
                    ids.push(sh.commodityId);
                  } else {
                    if (sh.shoppingNumber > shops[ids.indexOf(sh.commodityId)].shoppingNumber) {
                      shops.splice(ids.indexOf(sh.commodityId), 1);
                    } else {
                      shops.splice(m, 1);
                    }
                    shops.sort(this.compare("commodityId"));
                  }
                }
                totalMoney += ele.commodityPrice;
              }
            }
          });
        }
      });
      var shop = this.data.shop;
      shop.commodity = commoditys;
      this.setData({
        totalMoney: totalMoney,
        shops: shops,
        shop: shop,
      });
    },
    deleteShopping(e) {
      var totalMoney = this.data.totalMoney;
      var commodityID = e.currentTarget.id;
      var commodity = this.data.shop.shop.commodity;
      var commoditys = this.data.shop.commodity;
      var shops = this.data.shops;
      commodity.forEach(element => {
        if (element.commodityId == commodityID) {
          commoditys[element.commodityMenuId].forEach(ele => {
            if (ele.commodityId == commodityID) {
              totalMoney -= ele.commodityPrice;
              shops.forEach(shs => {
                if (shs.commodityId == commodityID) {
                  ele.shoppingNumber -= 1;
                  shs.shoppingNumber = ele.shoppingNumber;
                  if (shs.shoppingNumber == 0) {
                    ele.shoppingNumber = 0;
                    shops.splice(shops.indexOf(shs), 1);
                  }
                }
              })
            }
          });
        }
      });
      var shop = this.data.shop;
      shop.commodity = commoditys;
      this.setData({
        totalMoney: totalMoney,
        shops: shops,
        shop: shop,
      });
    },
    //左侧菜单点击事件
    menuTap(e) {
      var _this = this;
      var menuId = e.currentTarget.id;
      var menuMap = _this.data.menuMap;
      menuMap.forEach(men => {
        if (men.menuId == menuId) {
          wx.pageScrollTo({
            scrollTop: men.height - 150,
            duration: 300
          })
        }
      })
      setTimeout(function () {
        _this.setData({
          activeIndex: menuId
        });
      }, 350)

    },
    closeImg() {
      this.setData({
        imgOn: true,
      })
    },
    image(e) {
      var img = e.currentTarget.id;
      var imgOn = !this.data.imgOn;
      this.setData({
        img: img,
        imgOn: imgOn,
      })
    },
    close: function () {
      this.setData({
        dialog: false,
      });
    },
    touchStart() {
      this.setData({
        dialog: false,
      });
    },
    open() {
      this.setData({
        dialog: !this.data.dialog
      });
    },
    toBuy() {
      if (!wx.getStorageSync('accountName')) {
        wx.showModal({
          title: '提示',
          content: '您还尚未登录，请登录后操作',
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/Login/Login'
              })
            } else if (res.cancel) {

            }
          }
        })
        return;
      }
      if (this.data.shops.length == '0') {
        wx.showToast({
          title: '您还未添加商品',
          icon: 'error',
          duration: 1500
        })
        return;
      }
      if (this.data.totalMoney < this.data.shop.shop.shopStartPrice) {
        wx.showToast({
          title: "￥" + this.data.shop.shop.shopStartPrice + "起送",
          icon: 'none',
          duration: 1500
        })
        return;
      }
      var shopId = this.data.shop.shop.shopId;
      var shopSendPrice = this.data.shop.shop.shopSendPrice;
      var shopName = this.data.shop.shop.shopName;
      var totalMoney = this.data.totalMoney;
      wx.navigateTo({
        url: "/pages/makeOrder/makeOrder?shopId=" + shopId + "&shopSendPrice=" + shopSendPrice + "&shopName=" + shopName + "&totalMoney=" + totalMoney
      })
    },
  }

})