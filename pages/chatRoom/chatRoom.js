  Page({

    data: {
      sjc_time:'',//时间戳
      time:'',//系统当前时间
      end_time:'2019-12-31',//结束时间
      start_time: '2019-12-11',//开始时间
      yh_quan: '', //劵的名称
      quan_end: '', //有效期
      money_num: '', //劵的金额
      voucher: [{
          yh_quan: '满20-3',
          quan_end: '2021-12-31',
          money_num: '去使用'
        },
        {
          yh_quan: '满20-5',
          quan_end: '2021-12-31',
          money_num: '去使用'
        },{
          yh_quan: '满20-1',
          quan_end: '2021-12-31',
          money_num: '去使用'
        },{
          yh_quan: '满20-3',
          quan_end: '2021-12-31',
          money_num: '去使用'
        },{
          yh_quan: '满20-3',
          quan_end: '2021-12-31',
          money_num: '去使用'
        },
      ],
    }, 
    onReachBottom: function() { 
      wx.showToast({
        title: '没有更多优惠券',
        icon: 'none',
      })
    },
    toIndex(){
      wx.switchTab({
        url: '../index/index',
      })
    },
  
  })