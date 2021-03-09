 Component({ 
  data:{
    activeIndex:'', 
  },
  properties:{
    shop:{
      type:Object,
      value:{}
    }
  }, 
  options: {
    addGlobalClass: true
},
pageLifetimes: { 
  show: function () { 
 
   }, 
},
  methods: {
    menuTap(e){
      console.log(this.properties.shop);
      this.setData({ 
        activeIndex: e.currentTarget.id
      }); 
     },
  }
 
})