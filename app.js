//app.js
var common = require('./utils/common.js');
//取全局变量变量
var variableGlobal = require('./utils/config.js');
App({
  onLaunch: function () {
    this.catchLoginCode();
  },
  onShow: function(){
    //检查登录态是否过期
    wx.checkSession({
      success: function(){
        //登录态未过期
      },
      fail: function(){
        //登录态过期
        wx.login()
      }
    })
  },
  onHide: function(){},
  catchLoginCode: function(){
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //运行时就取用户openId
          common.requestPost(
            that.data.wechatUrl + 'wechatSmallProgram/getOpenid',
            {code:res.code},
            function(res){
              console.log(res)
            },
            function(res){
              console.log(res);
            }
          );
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  data:{
    requestUrl: variableGlobal.prd,
    wechatUrl: variableGlobal.prdwechat
  }
})