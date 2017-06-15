var common = require('../../utils/common.js');
var app = getApp();
Page({
  data: {
    listData: [],
    pageNum: 1,
    keyword: null
  },
  onLoad:function(options){
    this.setData({
      keyword: options.keyword
    });
    this.listRequest();
  },
  listRequest: function(){
    var that = this;
    //打开loading
    wx.showToast({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
    });
    //请求关键字列表
    common.requestPost(
      app.data.requestUrl + 'video/searchKeyWord',
      {
        pageNum: that.data.pageNum,
        pageSize: 10,
        userId: "1304",
        guestId: "D158-0F-45-727F52BD",
        searchKeyword: that.data.keyword
      },
      function(res){
        //关闭loading
        wx.hideToast();
        var data = that.data.listData;
        for(var i=0;i<res.data.list.length;i++){
          data.push(res.data.list[i]);
        }
        // success
        that.setData({
          "listData": data
        })
      },
      function(res){
        console.log(res);
      }
    )
  },
  scrollBottomCB: function(){
    var that = this;
    //加一页
    this.setData({
      pageNum: that.data.pageNum + 1
    });
    //滑动加载
    this.listRequest();
  }
})