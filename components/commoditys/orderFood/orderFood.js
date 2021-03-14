 Component({
   data: {
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
   ready: function () {
     this.shopping();

   },
   options: {
     addGlobalClass: true
   },
   observers: {
    'scrollTop': function (scrollTop) {
     var menus = []; 
      var commodity = this.data.shop.shop.commodity;
      if(commodity){ 
        commodity.forEach(commo=>{
          if(!menus.includes(commo.commodityMenuId)){
            menus.push(commo.commodityMenuId);
          } 
        }) 
          for (let i = 0; i < menus.length; i++) {
            this.createSelectorQuery().select('#shopMenu' + menus[i]).boundingClientRect((res) => {   
               if(scrollTop >= res.top){
                 if(menus[i+1]){
                  this.createSelectorQuery().select('#shopMenu' + menus[i+1]).boundingClientRect((res) => {  
                    if(scrollTop < res.top){
                      this.setData({
                        activeIndex:i+1
                      })
                    }
                  }).exec()
                 }{
                  this.setData({
                    activeIndex:i
                  })
                 } 
               }
            }).exec()
             
          }


        menus.forEach(menu=>{
          this.createSelectorQuery().select('#shopMenu' + menu).boundingClientRect((res) => {  
            menusMap.set(menu,res.top);
          }).exec()
        })
       
      } 
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
     menuTap(e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      }) 
       var menuId = e.currentTarget.id;
       this.setData({
         activeIndex: menuId
       });
       this.createSelectorQuery().select('#shopMenu' + menuId).boundingClientRect((res) => { 
           wx.pageScrollTo({
             scrollTop:  res.top,
             duration: 300
           }) 
       }).exec()
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
       wx.navigateTo({
         url: '/pages/makeOrder/makeOrder'
       })
     },
   }

 })