 Component({
   data: {
     shops: [],
     dialog: false,
     activeIndex: '',
   },
   properties: {
     shop: {
       type: Object,
       value: {}
     }
   },
   options: {
     addGlobalClass: true
   },
   pageLifetimes: {
     show: function () {},
   },
   methods: {
     addShopping(e) {
       var commodityID = e.currentTarget.id;
       var commodity = this.data.shop.shop.commodity;
       var commoditys = this.data.shop.commodity;
       var shops = this.data.shops;
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
                 ele.shoppingNumber += 1;
                 if(shops.indexOf(ele) == -1){
                  shops.push(ele);
                 }
               }
             }
           });
         }
       });
       var shop = this.data.shop; 
       shop.commodity = commoditys;
       this.setData({
         shops: shops,
         shop: shop,
       });
     },
     deleteShopping(e) {
       var commodityID = e.currentTarget.id;
       var commodity = this.data.shop.shop.commodity;
       var commoditys = this.data.shop.commodity;
       var shops = this.data.shops;
       commodity.forEach(element => {
         if (element.commodityId == commodityID) {
           commoditys[element.commodityMenuId].forEach(ele => {
             if (ele.commodityId == commodityID) { 
                 ele.shoppingNumber -= 1;
                 if (0 >= ele.shoppingNumber) {
                   for (let i = 0; i < shops.length; i++) {
                      if(shops[i].commodityId == ele.commodityId){
                         shops.splice(i,1);
                      } 
                   }
                } 
             }
           });
         }
       });
       var shop = this.data.shop;
       shop.commodity = commoditys;
       this.setData({
         shops:shops,
         shop: shop,
       });
     },
     menuTap(e) {
       this.setData({
         activeIndex: e.currentTarget.id
       });
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
     toBuy(){
     
     },
   }

 })