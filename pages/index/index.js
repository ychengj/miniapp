//index.js
//获取应用实例
import event from "../../utils/event";

var call = require("../../utils/request.js")
const app = getApp()

  Page({
    data: {
        headUrl:'',
        nickname:'',
        noneShow:false,
        ttl:[],
        showtime:[true],
        array:[],
        flag: true,
        deviceCode:'',
        systemSecret:'',
        name:'',
        first:0,
        second:0,
        third:0,
        fourth:0,
        fifth:0,
        sixth:0,
        seventh:0,
        eighth:0,
        ninth:0,
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        tishi:'',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        language:''
    },
    //进入详情页
    Godetails: function(event) {
      var id = event.currentTarget.id;
      var that = this;
      console.log(that.data.array[id]);
        try {
            app.globalData.systemSecret = that.data.array[id].systemSecretId
            wx.setStorageSync( app.globalData.appId + '_systemSecret',that.data.array[id].systemSecretId)
            wx.setStorageSync('systemSecretName',that.data.array[id].systemSecretName)
            wx.setStorageSync('devCode',that.data.array[id].deviceCode)
            wx.setStorageSync('systemSecretShareId',that.data.array[id].systemSecretShareId)
            wx.setStorageSync('levelInfo',that.data.array[id].levelInfo)
            wx.setStorageSync('hintCount',that.data.array[id].hintCount)
            wx.setStorageSync('effective',that.data.array[id].effective)
            wx.setStorageSync('startTime',that.data.array[id].startTime)
            wx.setStorageSync('endTime',that.data.array[id].endTime)
            wx.setStorageSync('version',that.data.array[id].version)
            wx.switchTab({
                url: '../logs/logs',
                success:function () {
                }
            })
        } catch (e) {
        }

    },
    /*扫一扫*/
    SaoYiSao(){
        wx.scanCode({
            success: (res) => {
                console.log(res.result)
                this.setData({ flag: false,deviceCode:res.result})
            }
        })
    },
    /*手动添加*/
    ShouDong(){
        this.setData({ flag: false })
    },
    /*获取*/
    name:function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    deviceCode:function (e) {
          this.setData({
              deviceCode: e.detail.value
          })
      },
    systemSecret:function (e) {
          this.setData({
              systemSecret: e.detail.value
          })
      },
    /*下拉树新*/
    onPullDownRefresh:function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载

        //模拟加载
        setTimeout(function()
        {
              // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },1000);
        const that = this
        call.GetData('api/v2.0.0/user',{detail:false},function (res) {
            that.setData({
                nickname:res.data.nickname,
                headUrl:res.data.headUrl
            })

            console.log('头像信息'+res);
        })
        call.getData('systemSecret',function (res) {
            let ARRAY = []
            for (var i = 0;i<res.data.length;i++){
                ARRAY.push(true);
            }
            // that.data.showtime = ARRAY
            that.setData({ showtime: ARRAY})
            that.setData({ array: res.data})
            console.log(that.data.showtime);
        })
     },
    /*确定*/
    QueDing(){
        const that = this;
        if(this.data.systemSecret.length == 8){
            call.postData('systemSecret',{deviceCode:this.data.deviceCode,name:this.data.name,systemSecret:this.data.systemSecret},function (res) {
                if(res.status > 100){
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }else{
                    wx.showToast({
                        title: '添加成功',
                        icon: 'succes',
                        duration: 1000,
                        mask:true,
                    })
                    that.setData({
                        flag: true,
                        deviceCode:'',
                        name:'',
                        systemSecret:''

                    })
                    call.getData('systemSecret',function (res) {
                        let ARRAY = []
                        console.log(res.data);
                        for (var i = 0;i<res.data.length;i++){
                            ARRAY.push(true);
                        }
                        // that.data.showtime = ARRAY
                        that.setData({ showtime: ARRAY})
                        that.setData({ array: res.data})
                        that.setData({noneShow:false})
                    })
                    that.setData({ flag: true })
                }
            })
        }else{
            wx.showToast({
                title: '请输入8位的系统秘钥!',
                icon: 'none',
                duration: 2000
            })
        }
    },
    /*取消*/
    QuXiao(){
        let that = this
        that.setData({
            flag: true,
            deviceCode:'',
            name:'',
            systemSecret:''
        })
    },
      /*设置语言*/
    setLanguage() {
       console.log("登录页面语言切换")
        this.setData({
            language: wx.T.getLanguage()
        });
     },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onLoad: function () {
        const that = this
        this.setLanguage();	// (1)
        event.on("languageChanged", this, this.setLanguage); // (2)
        call.GetData('api/v2.0.0/user',{detail:false},function (res) {
            try {
              that.setData({
                  headUrl:res.data.headUrl,
                  nickname:res.data.nickname
              })

            } catch (e) {
            }
            // console.log('头像信息'+res);
        })
    },
    onShow:function () {
        const that = this
        call.getData('systemSecret',function (res) {
            that.setData({ array: res.data})
            if(that.data.array == ''){
                that.setData({
                    noneShow:true
                })
            }else{
                that.setData({
                    noneShow:false
                })
            }
        })
    }

  })
