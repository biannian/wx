
Page({
  data: {
    tabs: ["点餐", "评价", "商家"],
    activeIndex: 0,
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})