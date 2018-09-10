var call = require("../utils/request.js")
import event from '../utils/event'
const app = getApp()

Page({
    data: {
        language:'',
        signedInTimes: 0,
        checkedIn: false,
        Version:'',
        appId:'',
        code:'',
        encryptedData:'',
        iv:'',
        langIndex:'',
        lang:'',
        imageUrl:'http://media.leocheery.net/img/wechat/SignInBg.png'
    },
    LOGIN(){
        var that = this
        wx.login({
            success: res => {
                console.log('登录成功1', res)
                that.setData({
                    code: res.code
                })
                that.setData({
                    langIndex: wx.getStorageSync('langIndex')
                });
                if(that.data.langIndex == ''){
                    that.setData({
                        langIndex: 0
                    });
                }
                if(that.data.langIndex == 0){
                    that.setData({
                        lang: 'zh_CN'
                    });
                }else{
                    that.setData({
                        lang: 'en'
                    });
                }
                this.setLanguage();
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.getUserInfo({
                    lang: that.data.lang,
                    success: res => {
                        // console.log('获取用户信息成功', res)
                        that.setData({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        if (that.userInfoReadyCallback) {
                            that.userInfoReadyCallback(res)
                        }
                        // wx3b9fc9ce1f502f94
                        call.request('auth/miniAppAuth', {appId:app.globalData.appId, code:that.data.code, encryptedData:that.data.encryptedData, iv:that.data.iv},
                            function (res) {
                                try {
                                    console.log("token是"+res.data.token);
                                    wx.setStorageSync('token',res.data.token)
                                } catch (e) {
                                }
                                try {
                                    wx.setStorageSync('refreshToken', res.data.refreshToken)
                                } catch (e) {
                                }
                                if(res.status < 100){
                                    // wx.hideLoading()
                                    if( wx.getStorageSync(app.globalData.appId + '_systemSecret')){
                                        wx.switchTab({
                                            url: './logs/logs'
                                        })
                                    }else{
                                        wx.switchTab({
                                            url: './index/index'
                                        })
                                    }
                                }else{
                                    // wx.hideLoading()
                                    wx.showToast({
                                        title: res.msg,
                                        icon: 'none',
                                        duration: 2000,
                                        mask: true
                                    })
                                }
                            })
                    },
                    fail:res=>{
                        wx.hideLoading()
                    }
                })

            }
        })
    },
    login(){
        var that = this
        const updateManager = wx.getUpdateManager()
        wx.showLoading({
            title: that.data.language.beloggingin
        })
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
            if(res.hasUpdate == true){
                updateManager.onUpdateReady(function () {
                    wx.hideLoading()
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                                // that.LOGIN()
                            }else{
                                that.LOGIN()
                            }
                        }
                    })
                })
            }else{
                that.LOGIN()
            }
        })
    },
    setLanguage() {
        console.log("登录页面语言切换")
        this.setData({
            language: wx.T.getLanguage()
        });
    },
    onLoad: function (options) {
        this.setLanguage();	// (1)
        event.on("languageChanged", this, this.setLanguage); // (2)
        /*线上需要*/
        let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
        console.log(extConfig.appId)
        if(extConfig.appId) {
            app.globalData.appId = extConfig.appId
        }else{
            wx.showToast({
                title: '程序异常',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return
        }
        if(app.globalData.DengLu == true){
            this.login()
        }else{
            }


    },

    onShow(){
        let that = this
        that.setData({
            Version:app.globalData.Version
        })
    },
})