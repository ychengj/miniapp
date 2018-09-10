var call = require("../../utils/request.js")
var app = getApp()
Page({
    data:{
        showIndexbutton:false,
        requireTime:'',
        password:'',
        name:'',
        type:'',
        startime:'',
        endtime:'',
        showtime:false,
        showxunhuan:false,
        weekInfo:'',
        requireTime:'',
        systemSecret:'',
        dynamicSecretHistoryId:'',
        massage:''
    },
    onLoad:function(res){
        let that = this
        console.log(res);
        if(JSON.stringify(res) != '{}'){
            console.log(0);
            if(res.type == '单次'){
                that.setData({
                    massage: '备注 : 密码只能使用一次,使用后失效',
                })
            }
            if(res.type == '短时'){
                that.setData({
                    massage: '备注 : 密码在生成后五分钟之内有效',
                })
            }
            if(res.type == '限时'){
                that.setData({
                    massage: '备注 : 密码在生效后24小时之内至少使用一次，否则将失效',
                })
            }
            if(res.type == '循环'){
                that.setData({
                    massage: '备注 : 密码在生成后立即生效',
                })
            }
            if(res.type == '永久'){
                that.setData({
                    massage: '备注 : 密码在生成后24小时之内至少使用一次，否则将失效',
                })
            }
            if(res.type == '清空'){
                that.setData({
                    massage: '备注 :   密码在生成后24小时之内使用有效，使之前所有密码都失效',
                })
            }
            if(res.startime == 'null' || res.endtime == 'null'){
                that.setData({
                    requireTime:res.requireTime,
                    password:res.password,
                    type:res.type,
                    name:res.name,
                })
            }else{
                if(res.type == '循环'){
                    that.setData({
                        requireTime:res.requireTime,
                        password:res.password,
                        type:res.type,
                        startime:res.startime,
                        endtime:res.endtime,
                        name:res.name,
                        showtime:true,
                        showxunhuan:true,
                        weekInfo:res.weekInfo
                    })
                }else{
                    that.setData({
                        requireTime:res.requireTime,
                        password:res.password,
                        type:res.type,
                        startime:res.startime,
                        endtime:res.endtime,
                        name:res.name,
                        showtime:true
                    })
                }
            }
        }else{
            that.setData({
                showIndexbutton:true
            })
            wx.getStorage({
                key: 'dynamicSecret',
                success: function (res) {
                    that.setData({
                        password: res.data,
                    })
                },
            })
            wx.getStorage({
                key: 'requireTime',
                success: function (res) {
                    that.setData({
                        requireTime: res.data,
                    })
                }
            })
            wx.getStorage({
                key: 'name',
                success: function (res) {
                    that.setData({
                        name: res.data,
                    })
                },

            })
            wx.getStorage({
                key: 'secretTypeName',
                success: function (res) {
                    console.log(res.data);
                    if(res.data == '单次'){
                        that.setData({
                            massage: '备注 : 密码只能使用一次,使用后失效',
                        })
                    }
                    if(res.data == '短时'){
                        that.setData({
                            massage: '备注 : 密码在生成后五分钟之内有效',
                        })
                    }
                    if(res.data == '限时'){
                        that.setData({
                            massage: '备注 : 密码在生效后24小时之内至少使用一次，否则将失效',
                        })
                    }
                    if(res.data == '循环'){
                        that.setData({
                            massage: '备注 : 密码在生成后立即生效',
                        })
                    }
                    if(res.data == '永久'){
                        that.setData({
                            massage: '备注 : 密码在生成后24小时之内至少使用一次，否则将失效',
                        })
                    }
                    if(res.data == '清空'){
                        that.setData({
                            massage: '备注 :   密码在生成后24小时之内使用有效，使之前所有密码都失效',
                        })
                    }

                    that.setData({
                        type: res.data,
                    })
                }
            })
            wx.getStorage({
                key: 'startTime',
                success: function (res) {
                    that.setData({
                        startime: res.data,
                    })
                    if(that.data.startime != null){
                        that.setData({
                            showtime: true,
                        })
                    }
                }
            })
            wx.getStorage({
                key: 'endTime',
                success: function (res) {
                    that.setData({
                        endtime: res.data,
                    })
                }
            })
            wx.getStorage({
                key: app.globalData.appId + '_systemSecret',
                success: function (res) {
                    that.setData({
                        systemSecret: res.data,
                    })
                },
            })
            wx.getStorage({
                key: 'dynamicSecretHistoryId',
                success: function (res) {
                    that.setData({
                        dynamicSecretHistoryId: res.data,
                    })
                },
            })
        }



    },
    /*分享*/
    onShareAppMessage: function (res) {
        let that = this
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '守住密码,打死都不要告诉别人哦!',
            path: '/pages/fenxiang/fenxiang?password='+that.data.password+"&name="+that.data.name+"&startime="+that.data.startime+"&endtime="+that.data.endtime+"&type="+that.data.type+"&weekInfo="+that.data.weekInfo+"&requireTime="+that.data.requireTime
        }
    },
    /*复制*/
    FuZhi(){
        let that = this
        if(that.data.type == "循环" ){
            wx.setClipboardData({
                data:'开锁密码:'+that.data.password +'\n门锁名称:'+that.data.name+'\n开锁类型:'+that.data.type+'\n生成时间:'+that.data.requireTime+'\n循环类型:'+that.data.weekInfo+'\n生效时间:'+that.data.startime+'\n失效时间:'+that.data.endtime,
                success: function(res) {
                    wx.getClipboardData({
                        success: function() {
                            wx.showToast({
                                title: '复制成功',
                                icon: 'succes',
                                duration: 1000,
                                mask:true,
                            })
                        }
                    })
                }
            })
        }else{
            if(that.data.startime == null || that.data.endtime == null){
                wx.setClipboardData({
                    data:'开锁密码:'+that.data.password +'\n门锁名称:'+that.data.name+'\n生成时间:'+that.data.requireTime+'\n开锁类型:'+that.data.type,
                    success: function(res) {
                        wx.getClipboardData({
                            success: function() {
                                wx.showToast({
                                    title: '复制成功',
                                    icon: 'succes',
                                    duration: 1000,
                                    mask:true,
                                })
                            }
                        })
                    }
                })
            }else{
                wx.setClipboardData({
                    data:'开锁密码:'+that.data.password +'\n门锁名称:'+that.data.name+'\n开锁类型:'+that.data.type+'\n生成时间:'+that.data.requireTime+'\n生效时间:'+that.data.startime+'\n失效时间:'+that.data.endtime,
                    success: function(res) {
                        wx.getClipboardData({
                            success: function() {
                                wx.showToast({
                                    title: '复制成功',
                                    icon: 'succes',
                                    duration: 1000,
                                    mask:true,
                                })
                            }
                        })
                    }
                })
            }
        }

    },
    /*删除*/
    ShanChu(){
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定删除吗?',
            success: function(res) {
                if (res.confirm) {
                    call.DelData("systemSecret/"+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,{},function (res) {
                        if(res.status > 100){
                            wx.showToast({
                                title: '删除失败！请重试',
                                icon: 'none',
                                duration: 2000
                            })
                        }else{
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 1000,
                                mask:true
                            })
                            var pages = getCurrentPages();
                            var prevPage = pages[pages.length - 2];  //上一个页面
                            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                            prevPage.setData({ showSc: true})
                            wx.navigateBack()

                        }
                    })
                }
            }
        })
    },
    /*回到首页*/
    GoBackToIndex(){
        wx.navigateTo({
            url: '../login'
        })
    },
})