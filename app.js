//app.js
import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);	// (1)
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);	// (2)
wx.T = T;	// (3)
var call = require("./utils/request.js")
App({
  onLaunch: function () {
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      this.setTime()
      wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.DengLu = true
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
                console.log(this.globalData.userInfo);
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
              fail:res=>{

              }
          })
        }else{
            this.globalData.DengLu = false
            console.log('信息无');
        }
      }
    })
      this.setLanguage()
  },
    // 刷新token
    refreshToken(){
        let refreshToken = ''
        try {
            var refreshTokenValue = wx.getStorageSync('refreshToken')
            if (refreshTokenValue) {
                refreshToken = refreshTokenValue
            }
        } catch (e) {
        }
        console.log(refreshToken)
        call.request('auth/refreshToken', {refreshToken: refreshToken},function (res) {
            try {
                wx.setStorageSync('token', res.data.token)
            } catch (e) {
            }
            try {
                wx.setStorageSync('refreshToken', res.data.refreshToken)
            } catch (e) {
            }
        })

    },
    setTime() {
        const _this = this
        function f() {
            setTimeout(function () {
                _this.refreshToken()
                f()
            }, 3000000)
        }
        f()
    },
    setLanguage() {
      console.log("sskjk")
        wx.T.setNavigationBarTitle();
    },
    // 打开调试
//       wx.setEnableDebug({
//           enableDebug: true
//       })
    /* wx3b9fc9ce1f502f94*/
  globalData: {
    Version:'V2.0.6',
    systemSecret:'',
    DengLu:true,
    userInfo: null,
    appId:'wx3b9fc9ce1f502f94',
    // appId:'',
  }
})