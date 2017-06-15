module.exports = {
    //request post通用方法
    requestPost: function(url,param,success,fail){
        wx.request({
            url: url,
            data: param,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function(res){
                // success
                if(res.data.code==10000){
                    if(success) success(res.data);
                }else{
                    if(fail) fail(res.data);
                }
            },
            fail: function() {
                // fail
                console.log(url,'请求失败');
            }
        })
    }
};