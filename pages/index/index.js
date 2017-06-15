var common = require('../../utils/common.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    dailyList: null
  },
  onShareAppMessage: function () {
    return {
      title: '点视小程序',
      desc: '一个新鲜的短视频平台',
      path: '/index/index'
    }
  },
  onLoad: function () {
    var that = this;
    //刷新列表
    this.listRefresh();
  },
  listRefresh: function(cb){
    var that = this;
    //调用查询列表接口
    common.requestPost(
      app.data.requestUrl + 'dailyScene/queryDailyScene',
      {
        userId:"1304",
        guestId: "D158-0F-45-727F52BD"
      },
      function(res){
        that.setData({  
            'dailyList': res.data 
        });
        if(cb) cb(res);
      },
      function(res){
        console.log(res);
      }
    )
  },
  onPullDownRefresh: function() {
    wx.showToast({
        title: '正在更新',
        icon: 'loading',
        duration: 10000
    })
    // 页面相关事件处理函数--监听用户下拉动作
    this.listRefresh(function(res){
      wx.stopPullDownRefresh();
      wx.hideToast();
    })
  }
})
