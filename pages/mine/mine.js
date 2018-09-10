const app = getApp()
var call = require("../../utils/request.js")
import event from '../../utils/event'
Page({
    data: {
        userInfo: {},
        userInformation:[],
        registed:true,
        sex:'',
        location:'',
        languageName:'',
        mobile:'',
        flag:true,
        phoneNumber:'',
        authCode:'',
        YANZHENGTIME:'',
        yz:false,
        YANZHENGTIME:60,
        ShowPassword:true,
        Password:'',
        Time:{},
        Version:'',
        language:'',
        languages:['简体中文', 'English'],
        langIndex:0
    },
    /*获取*/

    phoneNumber:function (e) {
        this.setData({
            phoneNumber: e.detail.value
        })
    },
    authCode:function (e) {
        this.setData({
            authCode: e.detail.value
        })
    },
    Password:function (e) {
        this.setData({
            Password: e.detail.value
        })
    },

    onShow(){
      let that = this
      that.setData({
          Version:app.globalData.Version
      })
    },
    onLoad: function () {
        const that = this
        /*语言选择存储的值*/
        this.setData({
            langIndex: wx.getStorageSync('langIndex')
        });
        if(this.data.langIndex == ''){
            this.setData({
                langIndex: 0
            });
        }
        this.setLanguage();
        /*获取用户信息*/
        if(this.data.langIndex == 0){
            wx.getUserInfo({
                lang: 'zh_CN',
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }else{
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        // 在没有 open-type=getUserInfo 版本的兼容处理
        /*获取信息列表*/
        call.GetData('api/v2.0.0/user',{detail:true},function (res) {
            that.setData({
                userInformation: res.data,
                registed:res.data.registed,
                sex:res.data.sex,
                location:res.data.location,
                languageName:res.data.languageName,
                mobile:res.data.mobile,
            })
            console.log(that.data.userInformation);
        })

    },
    /*切换语言*/
    bindPickerChange: function(e) {
        let index = e.detail.value;
        let that = this
        this.setData({	// (1)
            langIndex: index
        });
        wx.T.setLocaleByIndex(index);
        this.setLanguage();
        event.emit('languageChanged');
        wx.setStorage({
            key: 'langIndex',
            data: this.data.langIndex
        })
        if(this.data.langIndex == 0){
            wx.getUserInfo({
                lang: 'zh_CN',
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }else{
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

    },
    setLanguage() {
        this.setData({
            language: wx.T.getLanguage()
        });
        wx.T.setNavigationBarTitle();
    },
    /*打开绑定手机号弹窗*/
    BangDingPhone(){
        this.setData({
            flag:false,
        })
    },
    /*取消绑定手机号按钮*/
    QuXiaobangding(){
        let that =this
        clearInterval( that.data.Time)
        this.setData({
            flag:true,
            phoneNumber:'',
            authCode:'',
            yz: false,
        })
    },
    /*确定绑定或者替绑手机号*/
    QueDingbangding(){
        let that = this
        if(that.data.mobile == ''){
            call.putData('api/v2.0.0/user',{mobile:that.data.phoneNumber,authCode:that.data.authCode},function (res) {
                if(res.result == true){
                    that.setData({
                        flag:true,
                        phoneNumber:'',
                        authCode:'',
                        yz: false,
                    })
                    wx.showToast({
                        title: '手机号绑定成功',
                        icon: 'none',
                        duration: 2000
                    })
                    /*获取信息列表*/
                    call.GetData('api/v2.0.0/user',{detail:true},function (res) {
                        that.setData({
                            userInformation: res.data,
                            registed:res.data.registed,
                            sex:res.data.sex,
                            location:res.data.location,
                            languageName:res.data.languageName,
                            mobile:res.data.mobile,
                        })
                        console.log(that.data.userInformation);
                    })
                }else{
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }else{
            call.putData('api/v2.0.0/user',{mobile:that.data.phoneNumber,authCode:that.data.authCode,bindMobile:2},function (res) {
                if(res.result == true){
                    that.setData({
                        flag:true,
                        phoneNumber:'',
                        authCode:'',
                        yz: false,
                    })
                    wx.showToast({
                        title: '手机号绑定成功',
                        icon: 'none',
                        duration: 2000
                    })
                    /*获取信息列表*/
                    call.GetData('api/v2.0.0/user',{detail:true},function (res) {
                        that.setData({
                            userInformation: res.data,
                            registed:res.data.registed,
                            sex:res.data.sex,
                            location:res.data.location,
                            languageName:res.data.languageName,
                            mobile:res.data.mobile,
                        })
                        console.log(that.data.userInformation);
                    })
                }else{
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }



    },
    /*获取验证码*/
    huoquyanzhengma(){
        let that = this ,Time
        that.setData({
            YANZHENGTIME:60
        })
        call.PostData('/auth/requestAuthCode',{appId:app.globalData.appId,mobile:that.data.phoneNumber},function (res) {
            if(res.result == false){
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            }else{
                that.setData({
                    yz:true,
                    YANZHENGTIME:60
                })
                that.data.Time = setInterval(function () {
                    that.data.YANZHENGTIME--
                    that.setData({
                        YANZHENGTIME:that.data.YANZHENGTIME
                    })
                    if(that.data.YANZHENGTIME < 1){
                        clearInterval( that.data.Time)
                        that.setData({
                            yz: false,
                        })
                    }
                },1000)
            }

        })
    },
    /*退出登录*/
    Exit(){
        app.globalData.DengLu = false
        console.log(app.globalData.DengLu);
        wx.redirectTo({
            url: '../login'
        })
    }
})