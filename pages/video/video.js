var common = require('../../utils/common.js');
var app = getApp();
// pages/video/video.js
Page({
  data:{
    videoInfo: null
  },
  onLoad:function(options){
    var that = this;
    //链接中的videoId参数
    var id = options.videoId;
    //打开loading
    wx.showToast({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
    });
    //请求视频详情接口取视频详细
    common.requestPost(
      app.data.requestUrl + 'video/getVideoDetails',
      {
        videoId: id
      },
      function(res){
        //关闭loading
        wx.hideToast();
        that.setData({
          "videoInfo": res.data
        })
      },
      function(res){
        console.log(res);
      }
    )
  }
})