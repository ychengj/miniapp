//logs.js
import event from '../../utils/event'
var dateTimePicker = require('../../utils/dateTimePicker.js');
var call = require("../../utils/request.js")
var app = getApp()
Page({
    /*转发*/
    onShareAppMessage: function (res) {
        let that = this
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '守住密码,打死都不要告诉别人哦!',
            path: '/pages/fenxiang/fenxiang?password='+that.data.sharepassword+"&name="+that.data.sharename+"&startime="+that.data.sharestartime+"&endtime="+that.data.shareendtime+"&type="+that.data.sharetype+"&weekInfo="+that.data.shareweekInfo+"&requireTime="+that.data.sharerequireTime
        }
    },

    data: {
        sharerequireTime:'',
        shareweekInfo:'',
        sharename:'',
        sharetype:'',
        sharestartime:'',
        shareendtime:'',
        sharepassword:'',
        SHOWNOTADMIN:false,
        ShowBianJi:false,
        ShowGengxin:false,
        zuijinshiyong:true,
        Array:['每天','周末','工作日','周一','周二','周三','周四','周五','周六','周日'],
        Array1:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        Array2:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime:'',
        dateTimeArray1: null,
        dateTime1:'',
        systemSecret:'',
        Name:'',
        Password:'',
        devCode:'',
        systemSecretName:'',
        showDate:true,
        startTime:'',
        endTime:'',
        showStartTime:false,
        showEndTime:false,
        showType:false,
        showType1:false,
        showType2:false,
        duration:'',
        ticket:'',
        showimg:false,
        URL:'',
        array:[],
        urlimg:'',
        level:'',
        systemSecretId:'',
        aaa:true,
        levelInfo:'',
        hintCount:'',
        endttime:'',
        starttime:'',
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
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        navData:[{text: '单次'},{text: '短时'},{text: '限时'},{text: '循环'},{text: '永久'},{text: '清空'}],
        currentTab: 0,
        navScrollLeft: 0,
        startYear: 2018,
        endYear: 2028,
        errotime:true,
        singletime:true,
        littletime:true,
        xianshitime:true,
        qingkongtime:true,
        xunhuantime:true,
        laotime:true,
        ttl:'',
        singlettl:'',
        littletimettl:'',
        xianshitimettl:'',
        qingkongtimettl:'',
        xunhuantimettl:'',
        laotimettl:'',
        weekInfo:'',
        version:false,
        TIMESTART:'',
        TIMEEND:'',
        dynamicSecretHistoryId:'',
        language:'',
        shouldChangeTitle:''
    },

    setLanguage() {
        this.setData({
            language: wx.T.getLanguage()
        });
        this.data.shouldChangeTitle = true; // (2)
        if(this.data.language.address == 'address'){
            console.log(this.data.language.address);
            this.setData({
                navData:[{text: 'once'},{text: 'short'},{text: 'limit'},{text: 'round'},{text: 'forever'},{text: 'empty'}],
                Array:['everyday','weekend','workday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','week'],
            })
        }else{
            this.setData({
                navData:[{text: '清空'},{text: '短时'},{text: '限时'},{text: '循环'},{text: '永久'},{text: '清空'}],
                Array:['每天','周末','工作日','周一','周二','周三','周四','周五','周六','周日'],
            })
        }

    },
    onLoad:function(options){
        wx.setNavigationBarTitle({
            title: '当前页面'
        })
        this.setLanguage();	// (1)
        event.on("languageChanged", this, this.setLanguage); // (2)
        let that =this
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var lastTime = [];
        for(let i = 0 ; i < obj.dateTime.length-2;i++){
            lastTime.push(obj.dateTime[i])
        }
        var lastTimeArray = [];
        for(let i = 0 ; i < obj.dateTimeArray.length-2;i++){
            lastTimeArray.push(obj.dateTimeArray[i])
        }
        var lastTime1 = [];
        for(let i = 0 ; i < obj1.dateTime.length-2;i++){
            lastTime1.push(obj1.dateTime[i])
        }
        var lastTimeArray1 = [];
        for(let i = 0 ; i < obj1.dateTimeArray.length-2;i++){
            lastTimeArray1.push(obj1.dateTimeArray[i])
        }
        this.setData({
            dateTime: lastTime,
            dateTimeArray: lastTimeArray,
            dateTime1: lastTime1,
            dateTimeArray1: lastTimeArray1,
        });
    },
    onShow:function(){
        let that =this
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })
        wx.getStorage({
            key: app.globalData.appId + '_systemSecret',
            success: function (res) {
                that.setData({
                    systemSecret: res.data,
                    zuijinshiyong: true,
                })
                console.log("chenggong")
            },
            fail:function () {
                that.setData({
                    zuijinshiyong: false,
                })
                console.log("shibai")
            }
        })
        wx.getStorage({
            key: 'devCode',
            success: function (res) {
                that.setData({
                    devCode: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'level',
            success: function (res) {
                that.setData({
                    level: res.data,
                })
                if(res.data !=1){
                    that.setData({
                        SHOWNOTADMIN: true,
                    })
                }
            },

        })
        wx.getStorage({
            key: 'systemSecretName',
            success: function (res) {
                that.setData({
                    systemSecretName: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'systemSecretShareId',
            success: function (res) {
                that.setData({
                    systemSecretShareId: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'levelInfo',
            success: function (res) {
                that.setData({
                    levelInfo: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'hintCount',
            success: function (res) {
                that.setData({
                    hintCount: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'effective',
            success: function (res) {
                if(res.data == -1){
                    that.setData({
                        effective: '已失效',
                    })
                }
                if(res.data == 0){
                    that.setData({
                        effective: '未生效',
                    })
                }
                if(res.data == 1){
                    that.setData({
                        effective: '生效',
                    })
                }
            }
        })
        wx.getStorage({
            key: 'endTime',
            success: function (res) {
                that.setData({
                    endttime: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'startTime',
            success: function (res) {
                that.setData({
                    starttime: res.data,
                })
            }
        })
        wx.getStorage({
            key: 'version',
            success: function (res) {
                if(res.data){
                    that.setData({
                        version:true
                    })
                }else{
                    that.setData({
                        version:false
                    })
                }
            }
        })
        if(this.data.shouldChangeTitle) {
            wx.T.setNavigationBarTitle(); // (1)
            this.data.shouldChangeTitle = false;
        }
    },

    /*开始时间选择*/
    StartDateTime(e){
        var startTime = new Date(this.data.dateTimeArray[0][this.data.dateTime[0]]+'/'+this.data.dateTimeArray[1][this.data.dateTime[1]]+'/'+this.data.dateTimeArray[2][this.data.dateTime[2]]+' '+this.data.dateTimeArray[3][this.data.dateTime[3]]+':'+'00')
        this.setData({ dateTime: e.detail.value });
        this.setData({ startTime:startTime.getTime()});
        this.setData({ showStartTime:true});
        console.log(this.data.startTime);
        this.setData({ TIMESTART:this.data.dateTimeArray[1][this.data.dateTime[1]]+this.data.dateTimeArray[2][this.data.dateTime[2]]+this.data.dateTimeArray[3][this.data.dateTime[3]]});
        console.log(this.data.dateTime);
    },
    /*结束时间选择*/
    EndDateTime(e){
        var endTime = new Date(this.data.dateTimeArray1[0][this.data.dateTime1[0]]+'/'+this.data.dateTimeArray1[1][this.data.dateTime1[1]]+'/'+this.data.dateTimeArray1[2][this.data.dateTime1[2]]+' '+this.data.dateTimeArray1[3][this.data.dateTime1[3]]+':'+'00')
        this.setData({ dateTime1: e.detail.value });
        this.setData({ endTime:endTime.getTime()});
        this.setData({ showEndTime:true});
        this.setData({ TIMEEND:this.data.dateTimeArray1[1][this.data.dateTime1[1]]+this.data.dateTimeArray1[2][this.data.dateTime1[2]]+this.data.dateTimeArray1[3][this.data.dateTime1[3]]});
    },
    changeDateTimeColumn(e){
        var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },
    changeDateTimeColumn1(e) {
        var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
        });
    },
    /*选择循环周一至周日*/
    bindPickerChange: function(e) {
        let that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
            showType:true
        })
        if(that.data.index == 0){
            that.setData({
                weekInfo: 9
            })
        }
        if(that.data.index == 1){
            that.setData({
                weekInfo:7
            })
        }
        if(that.data.index == 2){
            that.setData({
                weekInfo: 8
            })
        }
        if(that.data.index == 3){
            that.setData({
                weekInfo: 1
            })
        }
        if(that.data.index == 4){
            that.setData({
                weekInfo: 2
            })
        }
        if(that.data.index == 5){
            that.setData({
                weekInfo: 3
            })
        }
        if(that.data.index == 6){
            that.setData({
                weekInfo: 4
            })
        }
        if(that.data.index == 7){
            that.setData({
                weekInfo: 5
            })
        }
        if(that.data.index == 8){
            that.setData({
                weekInfo: 6
            })
        }
        if(that.data.index == 9){
            that.setData({
                weekInfo: 0
            })
        }


    },
    /*选择循环开始时间*/
    bindPickerSTimeChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            STime: e.detail.value,
            showType1:true
        })

    },
    /*选择循环结束时间*/
    bindPickerETimeChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            ETime: e.detail.value,
            showType2:true
        })
        console.log(this.data.ETime);
    },
    /*删除管理员*/
    Deletetap: function(){
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定删除吗?',
            success: function(res) {
                if (res.confirm) {
                    call.DelData("systemSecret/"+that.data.systemSecret,{},function (res) {
                        if(res.status > 100){
                            wx.showToast({
                                title: '删除失败！请重试',
                                icon: 'none',
                                duration: 2000
                            })
                        }else{
                            wx.showToast({
                                title: '删除成功',
                                icon: 'succes',
                                duration: 1000,
                                mask:true
                            })
                            wx.removeStorage({
                                key:app.globalData.appId + '_systemSecret',
                                success: function(res) {
                                    wx.switchTab({
                                        url: '../index/index',
                                    })
                                }
                            })

                        }
                    })
                }
            }
        })
    },
    /*编辑*/
    bianjitap(){
        let that = this
        if(that.data.zuijinshiyong == false){
            wx.showToast({
                title:'暂无最近使用',
                icon: 'none',
                duration: 1500,
                mask:true,
            })
        }else{
            this.setData({
                ShowBianJi: true
            })
        }

    },
    /*历史记录页面*/
    LiShi(){
        wx.navigateTo({
            url: '../history/history'
        })
    },
    /*获取*/
    Name:function (e) {
        this.setData({
            Name: e.detail.value
        })
    },
    Password:function (e) {
        this.setData({
            Password: e.detail.value
        })
    },
    /*编辑取消按钮*/
    BianJiQuXiao(){
        let that = this
        that.setData({
            ShowBianJi: false
        })
    },
    /*编辑确认按钮*/
    BianJiQueDing(){
        let that = this
            if(that.data.Name){
                call.PutData("systemSecret/"+that.data.systemSecret,{name:that.data.Name},function (res) {
                    if(res.status > 100){
                        wx.showToast({
                            title:res.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }else{
                        wx.showToast({
                            title: '编辑秘钥名称成功',
                            icon: 'succes',
                            duration: 1000,
                            mask:true
                        })
                        wx.removeStorage({
                            key: 'systemSecretName',
                            success: function(res) {
                                console.log(res.data)
                            }
                        })
                        that.setData({
                            ShowBianJi: false,
                            Name:'',
                            Password:'',
                            systemSecretName:that.data.Name
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/systemSecretShare',function (res) {
                            that.setData({ array: res.data})
                        })
                    }
                })
            }


    },
    /*更新*/
    GengXing(){
        let that = this
        if(that.data.zuijinshiyong == false){
            wx.showToast({
                title:'暂无最近使用',
                icon: 'none',
                duration: 1500,
                mask:true,
            })
        }else{
            this.setData({
                ShowGengxin: true
            })
        }

    },
    /*更新确认*/
    GengXingQueDing(){
        let that = this
        let addKey = /^[0-9A-Fa-f]{8}$/
        if(that.data.Password ){
            if(addKey.test(that.data.Password)){
                call.PutData("systemSecret/"+that.data.systemSecret,{systemSecret:that.data.Password},function (res) {
                    if(res.status > 100){
                        wx.showToast({
                            title:res.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }else{
                        wx.showToast({
                            title:res.msg,
                            icon: 'succes',
                            duration: 1000,
                            mask:true
                        })
                        wx.removeStorage({
                            key: 'systemSecretName',
                            success: function(res) {
                            }
                        })
                        that.setData({
                            ShowGengxin: false,
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/systemSecretShare',function (res) {
                            that.setData({ array: res.data})
                        })
                    }
                })
            }else{
                wx.showToast({
                    title: '请输入8位的0到9或者A到F系统秘钥!',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    },
    /*更新取消*/
    GengXingQuXiao(){
        this.setData({
            ShowGengxin: false
        })
    },
    /*永久生成密码*/
    YongJiu(){
        var randomTimer,Time,that = this;
            call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:9}, function (res){
                if(res.status < 100){
                    randomTimer = setInterval(function () {
                        var first = Math.floor(Math.random() * 10);
                        var second = Math.floor(Math.random() * 10);
                        var third = Math.floor(Math.random() * 10);
                        var fourth = Math.floor(Math.random() * 10);
                        var fifth = Math.floor(Math.random() * 10);
                        var sixth = Math.floor(Math.random() * 10);
                        var seventh = Math.floor(Math.random() * 10);
                        var eighth = Math.floor(Math.random() * 10);
                        var ninth = Math.floor(Math.random() * 10);
                        that.setData({
                            first:first,
                            second:second,
                            third:third,
                            fourth:fourth,
                            fifth:fifth,
                            sixth:sixth,
                            seventh:seventh,
                            eighth:eighth,
                            ninth:ninth,
                        })
                    },100)
                    setTimeout(function () {
                        clearInterval(randomTimer);
                        let num = res.data.dynamicSecret;
                        that.data.first =  num.substring(0, 1);
                        that.data.second = num.substring(1, 2);
                        that.data.third = num.substring(2, 3);
                        that.data.fourth = num.substring(3, 4);
                        that.data.fifth = num.substring(4, 5);
                        that.data.sixth= num.substring(5, 6);
                        that.data.seventh= num.substring(6, 7);
                        that.data.eighth = num.substring(7, 8);
                        that.data.ninth =num.substring(8, 9);
                        console.log( that.data.first);
                        that.setData({
                            dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                            errotime:false,
                            ttl:res.data.ttl,
                            first: that.data.first,
                            second:that.data.second,
                            third:that.data.third,
                            fourth: that.data.fourth,
                            fifth:that.data.fifth,
                            sixth:that.data.sixth,
                            seventh: that.data.seventh,
                            eighth:that.data.eighth,
                            ninth: that.data.ninth,
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                            that.setData({
                                sharepassword:res.data.dynamicSecret,
                                sharestartime:res.data.startTime,
                                shareendtime:res.data.endTime,
                                sharetype:res.data.secretTypeName,
                                sharename:res.data.name,
                                sharerequireTime:res.data.requireTime,

                            })
                            var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                            console.log(password);
                            Time = setInterval(function (){
                                that.data.ttl--
                                that.setData({
                                    ttl: that.data.ttl
                                })
                                if(that.data.ttl < 1){
                                    clearInterval(Time)
                                    that.setData({
                                        errotime: true,
                                        ttl: that.data.ttl
                                    })
                                }
                            },1000)
                            wx.setClipboardData({
                                data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype,
                                success: function(res) {
                                    wx.getClipboardData({
                                        success: function(res) {
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
                        })
                        clearInterval(randomTimer);

                },1500)
                }else{
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 1000
                    })

                }
            })


    },
    /*单次生成密码*/
    DanCi(){
        var randomTimer,Time,that = this;
            call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:1}, function (res){
                if(res.status < 100){
                    randomTimer = setInterval(function () {
                        var first = Math.floor(Math.random() * 10);
                        var second = Math.floor(Math.random() * 10);
                        var third = Math.floor(Math.random() * 10);
                        var fourth = Math.floor(Math.random() * 10);
                        var fifth = Math.floor(Math.random() * 10);
                        var sixth = Math.floor(Math.random() * 10);
                        var seventh = Math.floor(Math.random() * 10);
                        var eighth = Math.floor(Math.random() * 10);
                        var ninth = Math.floor(Math.random() * 10);
                        that.setData({
                            first:first,
                            second:second,
                            third:third,
                            fourth:fourth,
                            fifth:fifth,
                            sixth:sixth,
                            seventh:seventh,
                            eighth:eighth,
                            ninth:ninth,
                        })
                    },100)
                    setTimeout(function () {
                        clearInterval(randomTimer);
                        let num = res.data.dynamicSecret;
                        that.data.first =  num.substring(0, 1);
                        that.data.second = num.substring(1, 2);
                        that.data.third = num.substring(2, 3);
                        that.data.fourth = num.substring(3, 4);
                        that.data.fifth = num.substring(4, 5);
                        that.data.sixth= num.substring(5, 6);
                        that.data.seventh= num.substring(6, 7);
                        that.data.eighth = num.substring(7, 8);
                        that.data.ninth =num.substring(8, 9);
                        console.log( that.data.first);
                        that.setData({
                            dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                            singletime:false,
                            singlettl:res.data.ttl,
                            first: that.data.first,
                            second:that.data.second,
                            third:that.data.third,
                            fourth: that.data.fourth,
                            fifth:that.data.fifth,
                            sixth:that.data.sixth,
                            seventh: that.data.seventh,
                            eighth:that.data.eighth,
                            ninth: that.data.ninth,
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                            that.setData({
                                sharepassword:res.data.dynamicSecret,
                                sharestartime:res.data.startTime,
                                shareendtime:res.data.endTime,
                                sharetype:res.data.secretTypeName,
                                sharename:res.data.name,
                                sharerequireTime:res.data.requireTime
                            })
                            var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                            wx.setClipboardData({
                                data:'开锁密码:'+password + '\n门锁名称:'+that.data.sharename+ '\n开锁类型:'+that.data.sharetype,
                                success: function(res) {
                                    wx.getClipboardData({
                                        success: function(res) {
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
                        })
                        clearInterval(randomTimer);
                        Time = setInterval(function (){
                            that.data.singlettl--
                            that.setData({
                                singlettl: that.data.singlettl
                            })
                            if(that.data.singlettl < 1){
                                clearInterval(Time)
                                that.setData({
                                    singletime: true,
                                    singlettl: that.data.ttl
                                })
                            }
                        },1000)
                        clearInterval(randomTimer);
                        },2000)
                }else{
                    wx.showToast({
                        title:res.msg,
                        icon: 'none',
                        duration: 1000,
                        mask:true,
                    })
                }
            })

    },
    /*短时生成密码*/
    DuanShi(){
        var randomTimer,Time,that = this;
            call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:2}, function (res){
                if(res.status < 100){
                    randomTimer = setInterval(function () {
                        var first = Math.floor(Math.random() * 10);
                        var second = Math.floor(Math.random() * 10);
                        var third = Math.floor(Math.random() * 10);
                        var fourth = Math.floor(Math.random() * 10);
                        var fifth = Math.floor(Math.random() * 10);
                        var sixth = Math.floor(Math.random() * 10);
                        var seventh = Math.floor(Math.random() * 10);
                        var eighth = Math.floor(Math.random() * 10);
                        var ninth = Math.floor(Math.random() * 10);
                        that.setData({
                            first:first,
                            second:second,
                            third:third,
                            fourth:fourth,
                            fifth:fifth,
                            sixth:sixth,
                            seventh:seventh,
                            eighth:eighth,
                            ninth:ninth,
                        })
                    },100)
                    setTimeout(function () {
                        clearInterval(randomTimer);
                        let num = res.data.dynamicSecret;
                        that.data.first =  num.substring(0, 1);
                        that.data.second = num.substring(1, 2);
                        that.data.third = num.substring(2, 3);
                        that.data.fourth = num.substring(3, 4);
                        that.data.fifth = num.substring(4, 5);
                        that.data.sixth= num.substring(5, 6);
                        that.data.seventh= num.substring(6, 7);
                        that.data.eighth = num.substring(7, 8);
                        that.data.ninth =num.substring(8, 9);
                        console.log( that.data.first);
                        that.setData({
                            dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                            littletime:false,
                            littletimettl:res.data.ttl,
                            first: that.data.first,
                            second:that.data.second,
                            third:that.data.third,
                            fourth: that.data.fourth,
                            fifth:that.data.fifth,
                            sixth:that.data.sixth,
                            seventh: that.data.seventh,
                            eighth:that.data.eighth,
                            ninth: that.data.ninth,
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                            that.setData({
                                sharepassword:res.data.dynamicSecret,
                                sharestartime:res.data.startTime,
                                shareendtime:res.data.endTime,
                                sharetype:res.data.secretTypeName,
                                sharename:res.data.name,
                                sharerequireTime:res.data.requireTime
                            })
                            var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                            wx.setClipboardData({
                                data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype,
                                success: function(res) {
                                    wx.getClipboardData({
                                        success: function(res) {
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
                        })
                        clearInterval(randomTimer);
                        Time = setInterval(function (){
                            that.data.littletimettl--
                            that.setData({
                                littletimettl: that.data.littletimettl
                            })
                            if(that.data.littletimettl < 1){
                                clearInterval(Time)
                                that.setData({
                                    littletime: true,
                                    littletimettl: that.data.ttl
                                })
                            }
                        },1000)
                        clearInterval(randomTimer);
                        },2000)
                }else{
                    wx.showToast({
                        title:res.msg,
                        icon: 'none',
                        duration: 1000,
                        mask:true,
                    })
                }
            })


    },
    /*限时生成密码*/
    XianShi(){
        var randomTimer,Time,that = this;
        var time = this.data.endTime - this.data.startTime
        let TIME = time/1000
        if(that.data.showStartTime == false || that.data.showEndTime == false){
            if(that.data.showStartTime == false && that.data.showEndTime != false){
                wx.showToast({
                    title:'请选择开始时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showEndTime == false && that.data.showStartTime != false){
                wx.showToast({
                    title:'请选择结束时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showStartTime == false && that.data.showEndTime == false){
                wx.showToast({
                    title:'请选择时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }

        }else{
            if(TIME > 31536000){
                if(that.data.TIMESTART == that.data.TIMEEND){
                    call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:7,  duration: time, startTime: that.data.startTime}, function (res){
                        if(res.status < 100){
                            randomTimer = setInterval(function () {
                                var first = Math.floor(Math.random() * 10);
                                var second = Math.floor(Math.random() * 10);
                                var third = Math.floor(Math.random() * 10);
                                var fourth = Math.floor(Math.random() * 10);
                                var fifth = Math.floor(Math.random() * 10);
                                var sixth = Math.floor(Math.random() * 10);
                                var seventh = Math.floor(Math.random() * 10);
                                var eighth = Math.floor(Math.random() * 10);
                                var ninth = Math.floor(Math.random() * 10);
                                that.setData({
                                    first:first,
                                    second:second,
                                    third:third,
                                    fourth:fourth,
                                    fifth:fifth,
                                    sixth:sixth,
                                    seventh:seventh,
                                    eighth:eighth,
                                    ninth:ninth,
                                })
                            },100)
                            setTimeout(function () {
                                clearInterval(randomTimer);
                                let num = res.data.dynamicSecret;
                                that.data.first =  num.substring(0, 1);
                                that.data.second = num.substring(1, 2);
                                that.data.third = num.substring(2, 3);
                                that.data.fourth = num.substring(3, 4);
                                that.data.fifth = num.substring(4, 5);
                                that.data.sixth= num.substring(5, 6);
                                that.data.seventh= num.substring(6, 7);
                                that.data.eighth = num.substring(7, 8);
                                that.data.ninth =num.substring(8, 9);
                                that.setData({
                                    dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                                    xianshitime:false,
                                    xianshitimettl:res.data.ttl,
                                    first: that.data.first,
                                    second:that.data.second,
                                    third:that.data.third,
                                    fourth: that.data.fourth,
                                    fifth:that.data.fifth,
                                    sixth:that.data.sixth,
                                    seventh: that.data.seventh,
                                    eighth:that.data.eighth,
                                    ninth: that.data.ninth,
                                })
                                call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                                    that.setData({
                                        sharepassword:res.data.dynamicSecret,
                                        sharestartime:res.data.startTime,
                                        shareendtime:res.data.endTime,
                                        sharetype:res.data.secretTypeName,
                                        sharename:res.data.name,
                                        sharerequireTime:res.data.requireTime
                                    })
                                    console.log(res.data.requireTime);
                                    var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                                    wx.setClipboardData({
                                        data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype+'\n生效时间:'+that.data.sharestartime+'\n失效时间:'+that.data.shareendtime,
                                        success: function(res) {
                                            wx.getClipboardData({
                                                success: function(res) {
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
                                })
                                clearInterval(randomTimer);
                                Time = setInterval(function (){
                                    that.data.xianshitimettl--
                                    that.setData({
                                        xianshitimettl: that.data.xianshitimettl
                                    })
                                    if(that.data.xianshitimettl < 1){
                                        clearInterval(Time)
                                        that.setData({
                                            xianshitime: true,
                                            xianshitimettl: that.data.ttl
                                        })
                                    }
                                },1000)
                            },2000)
                        }else{
                            wx.showToast({
                                title:res.msg,
                                icon: 'none',
                                duration: 1000,
                                mask:true,
                            })
                        }
                    })
                }else{
                    wx.showToast({
                        title:'有效期超过一年,生效时间和到期时间的月、日、时要相同',
                        icon: 'none',
                        duration: 5000,
                        mask:true,
                    })
                }
            }else{
                call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:7,  duration: time, startTime: that.data.startTime}, function (res){
                    if(res.status < 100){
                        randomTimer = setInterval(function () {
                            var first = Math.floor(Math.random() * 10);
                            var second = Math.floor(Math.random() * 10);
                            var third = Math.floor(Math.random() * 10);
                            var fourth = Math.floor(Math.random() * 10);
                            var fifth = Math.floor(Math.random() * 10);
                            var sixth = Math.floor(Math.random() * 10);
                            var seventh = Math.floor(Math.random() * 10);
                            var eighth = Math.floor(Math.random() * 10);
                            var ninth = Math.floor(Math.random() * 10);
                            that.setData({
                                first:first,
                                second:second,
                                third:third,
                                fourth:fourth,
                                fifth:fifth,
                                sixth:sixth,
                                seventh:seventh,
                                eighth:eighth,
                                ninth:ninth,
                            })
                        },100)
                        setTimeout(function () {
                            clearInterval(randomTimer);
                            let num = res.data.dynamicSecret;
                            that.data.first =  num.substring(0, 1);
                            that.data.second = num.substring(1, 2);
                            that.data.third = num.substring(2, 3);
                            that.data.fourth = num.substring(3, 4);
                            that.data.fifth = num.substring(4, 5);
                            that.data.sixth= num.substring(5, 6);
                            that.data.seventh= num.substring(6, 7);
                            that.data.eighth = num.substring(7, 8);
                            that.data.ninth =num.substring(8, 9);
                            console.log( that.data.first);
                            that.setData({
                                dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                                xianshitime:false,
                                xianshitimettl:res.data.ttl,
                                first: that.data.first,
                                second:that.data.second,
                                third:that.data.third,
                                fourth: that.data.fourth,
                                fifth:that.data.fifth,
                                sixth:that.data.sixth,
                                seventh: that.data.seventh,
                                eighth:that.data.eighth,
                                ninth: that.data.ninth,
                            })
                            call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                                that.setData({
                                    sharepassword:res.data.dynamicSecret,
                                    sharestartime:res.data.startTime,
                                    shareendtime:res.data.endTime,
                                    sharetype:res.data.secretTypeName,
                                    sharename:res.data.name,
                                    sharerequireTime:res.data.requireTime
                                })
                                var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                                wx.setClipboardData({
                                    data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype+'\n生效时间:'+that.data.sharestartime+'\n失效时间:'+that.data.shareendtime,
                                    success: function(res) {
                                        wx.getClipboardData({
                                            success: function(res) {
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
                            })
                            clearInterval(randomTimer);
                            Time = setInterval(function (){
                                that.data.xianshitimettl--
                                that.setData({
                                    xianshitimettl: that.data.xianshitimettl
                                })
                                if(that.data.xianshitimettl < 1){
                                    clearInterval(Time)
                                    that.setData({
                                        xianshitime: true,
                                        xianshitimettl: that.data.ttl
                                    })
                                }
                            },1000)
                        },2000)
                    }else{
                        wx.showToast({
                            title:res.msg,
                            icon: 'none',
                            duration: 1000,
                            mask:true,
                        })
                    }
                })
            }
        }

    },
    /*清空*/
    QingKong(){
        var randomTimer,Time,that = this;
        call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:0}, function (res){
            if(res.status < 100){
                randomTimer = setInterval(function () {
                        var first = Math.floor(Math.random() * 10);
                        var second = Math.floor(Math.random() * 10);
                        var third = Math.floor(Math.random() * 10);
                        var fourth = Math.floor(Math.random() * 10);
                        var fifth = Math.floor(Math.random() * 10);
                        var sixth = Math.floor(Math.random() * 10);
                        var seventh = Math.floor(Math.random() * 10);
                        var eighth = Math.floor(Math.random() * 10);
                        var ninth = Math.floor(Math.random() * 10);
                        that.setData({

                            first:first,
                            second:second,
                            third:third,
                            fourth:fourth,
                            fifth:fifth,
                            sixth:sixth,
                            seventh:seventh,
                            eighth:eighth,
                            ninth:ninth,
                        })
                    },100)
                setTimeout(function (){
                    clearInterval(randomTimer);
                    let num = res.data.dynamicSecret;
                    that.data.first =  num.substring(0, 1);
                    that.data.second = num.substring(1, 2);
                    that.data.third = num.substring(2, 3);
                    that.data.fourth = num.substring(3, 4);
                    that.data.fifth = num.substring(4, 5);
                    that.data.sixth= num.substring(5, 6);
                    that.data.seventh= num.substring(6, 7);
                    that.data.eighth = num.substring(7, 8);
                    that.data.ninth =num.substring(8, 9);
                    console.log( that.data.first);
                    that.setData({
                        dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                        qingkongtime:false,
                        qingkongtimettl:res.data.ttl,
                        first: that.data.first,
                        second:that.data.second,
                        third:that.data.third,
                        fourth: that.data.fourth,
                        fifth:that.data.fifth,
                        sixth:that.data.sixth,
                        seventh: that.data.seventh,
                        eighth:that.data.eighth,
                        ninth: that.data.ninth,
                    })
                    call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                        that.setData({
                            sharepassword:res.data.dynamicSecret,
                            sharestartime:res.data.startTime,
                            shareendtime:res.data.endTime,
                            sharetype:res.data.secretTypeName,
                            sharename:res.data.name,
                            sharerequireTime:res.data.requireTime
                        })
                        var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                        wx.setClipboardData({
                            data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype,
                            success: function(res) {
                                wx.getClipboardData({
                                    success: function(res) {
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
                    })
                    clearInterval(randomTimer);
                    Time = setInterval(function (){
                            that.data.qingkongtimettl--
                            that.setData({
                                qingkongtimettl: that.data.qingkongtimettl
                            })
                            if(that.data.qingkongtimettl < 1){
                                clearInterval(Time)
                                that.setData({
                                    qingkongtime: true,
                                    qingkongtimettl: that.data.ttl
                                })
                            }
                        },1000)
                },2000)
            }else{
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
        })
    },
    /*循环*/
    XunHuan(){
        var randomTimer,Time,that = this;
        if(that.data.showType == false || that.data.showType1 == false || that.data.showType2 == false  ){
            if(that.data.showType == false && that.data.showType1 == false && that.data.showType2 == false){
                wx.showToast({
                    title:'请选择循环方式和时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == false && that.data.showType1 == true && that.data.showType2 == true){
                wx.showToast({
                    title:'请选择循环方式',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == true && that.data.showType1 == false && that.data.showType2 == true){
                wx.showToast({
                    title:'请选择生效时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == true && that.data.showType1 == true && that.data.showType2 == false){
                wx.showToast({
                    title:'请选择失效时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == true && that.data.showType1 == false && that.data.showType2 == false){
                wx.showToast({
                    title:'请选择时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == false && that.data.showType1 == false && that.data.showType2 == true){
                wx.showToast({
                    title:'请选择循环方式和生效时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
            if(that.data.showType == false && that.data.showType1 == true && that.data.showType2 == false){
                wx.showToast({
                    title:'请选择循环方式和失效时间',
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
        }else{
            call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:8,weekInfo: that.data.weekInfo, loopStart: that.data.STime,loopEnd:that.data.ETime}, function (res){
                if(res.status < 100){
                    randomTimer = setInterval(function () {
                        var first = Math.floor(Math.random() * 10);
                        var second = Math.floor(Math.random() * 10);
                        var third = Math.floor(Math.random() * 10);
                        var fourth = Math.floor(Math.random() * 10);
                        var fifth = Math.floor(Math.random() * 10);
                        var sixth = Math.floor(Math.random() * 10);
                        var seventh = Math.floor(Math.random() * 10);
                        var eighth = Math.floor(Math.random() * 10);
                        var ninth = Math.floor(Math.random() * 10);
                        that.setData({
                            first:first,
                            second:second,
                            third:third,
                            fourth:fourth,
                            fifth:fifth,
                            sixth:sixth,
                            seventh:seventh,
                            eighth:eighth,
                            ninth:ninth,
                        })
                    },100)
                    setTimeout(function () {
                        clearInterval(randomTimer);
                        let num = res.data.dynamicSecret;
                        that.data.first =  num.substring(0, 1);
                        that.data.second = num.substring(1, 2);
                        that.data.third = num.substring(2, 3);
                        that.data.fourth = num.substring(3, 4);
                        that.data.fifth = num.substring(4, 5);
                        that.data.sixth= num.substring(5, 6);
                        that.data.seventh= num.substring(6, 7);
                        that.data.eighth = num.substring(7, 8);
                        that.data.ninth =num.substring(8, 9);
                        that.setData({
                            dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                            xunhuantime:false,
                            xunhuantimettl:res.data.ttl,
                            first: that.data.first,
                            second:that.data.second,
                            third:that.data.third,
                            fourth: that.data.fourth,
                            fifth:that.data.fifth,
                            sixth:that.data.sixth,
                            seventh: that.data.seventh,
                            eighth:that.data.eighth,
                            ninth: that.data.ninth,
                        })
                        call.getData('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                            that.setData({
                                sharepassword:res.data.dynamicSecret,
                                sharestartime:res.data.loopStart,
                                shareendtime:res.data.loopEnd,
                                sharetype:res.data.secretTypeName,
                                sharename:res.data.name,
                                shareweekInfo:res.data.weekInfoName,
                                sharerequireTime:res.data.requireTime
                            })
                            var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                            wx.setClipboardData({
                                data:'开锁密码:'+password +'\n门锁名称:'+that.data.sharename+'\n开锁类型:'+that.data.sharetype+'\n循环类型:'+that.data.shareweekInfo+'\n生效时间:'+that.data.sharestartime+'\n失效时间:'+that.data.shareendtime,
                                success: function(res) {
                                    wx.getClipboardData({
                                        success: function(res) {
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
                        })
                        clearInterval(randomTimer);
                        Time = setInterval(function (){
                            that.data.xunhuantimettl--
                            that.setData({
                                xunhuantimettl: that.data.xunhuantimettl
                            })
                            if(that.data.xunhuantimettl < 1){
                                clearInterval(Time)
                                that.setData({
                                    xunhuantime: true,
                                    xunhuantimettl: that.data.ttl
                                })
                            }
                        },1000)

                    },2000)
                }else{
                    clearInterval(randomTimer);
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 1000,
                        mask:true,
                    })
                }
            })
        }

    },

    /*V1.0.0生成密码*/
    GivePassword(){
        var randomTimer,Time,that = this;
        call.postData("systemSecret/"+that.data.systemSecret+"/requireDynamicSecret",{secretType:-1}, function (res){
            if(res.status < 100){
                randomTimer = setInterval(function () {
                    var first = Math.floor(Math.random() * 10);
                    var second = Math.floor(Math.random() * 10);
                    var third = Math.floor(Math.random() * 10);
                    var fourth = Math.floor(Math.random() * 10);
                    var fifth = Math.floor(Math.random() * 10);
                    var sixth = Math.floor(Math.random() * 10);
                    var seventh = Math.floor(Math.random() * 10);
                    var eighth = Math.floor(Math.random() * 10);
                    var ninth = Math.floor(Math.random() * 10);
                    that.setData({

                        first:first,
                        second:second,
                        third:third,
                        fourth:fourth,
                        fifth:fifth,
                        sixth:sixth,
                        seventh:seventh,
                        eighth:eighth,
                        ninth:ninth,
                    })
                },100)
                setTimeout(function (){
                    clearInterval(randomTimer);
                    let num = res.data.dynamicSecret;
                    that.data.first =  num.substring(0, 1);
                    that.data.second = num.substring(1, 2);
                    that.data.third = num.substring(2, 3);
                    that.data.fourth = num.substring(3, 4);
                    that.data.fifth = num.substring(4, 5);
                    that.data.sixth= num.substring(5, 6);
                    that.data.seventh= num.substring(6, 7);
                    that.data.eighth = num.substring(7, 8);
                    that.data.ninth =num.substring(8, 9);
                    console.log( that.data.first);
                    that.setData({
                        dynamicSecretHistoryId:res.data.dynamicSecretHistoryId,
                        laotime:false,
                        laotimettl:res.data.ttl,
                        first: that.data.first,
                        second:that.data.second,
                        third:that.data.third,
                        fourth: that.data.fourth,
                        fifth:that.data.fifth,
                        sixth:that.data.sixth,
                        seventh: that.data.seventh,
                        eighth:that.data.eighth,
                        ninth: that.data.ninth,
                    })
                    call.getData('/systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory/'+that.data.dynamicSecretHistoryId,function (res) {
                        that.setData({
                            sharepassword:res.data.dynamicSecret,
                            sharestartime:res.data.startTime,
                            shareendtime:res.data.endTime,
                            sharetype:res.data.secretTypeName,
                            sharename:res.data.name,
                            sharerequireTime:res.data.requireTime
                        })
                        console.log(that.data.sharepassword);
                    })
                    clearInterval(randomTimer);
                    var password = that.data.first.toString()+that.data.second.toString()+that.data.third.toString()+that.data.fourth.toString()+that.data.fifth.toString()+that.data.sixth.toString()+that.data.seventh.toString()+that.data.eighth.toString()+that.data.ninth.toString()
                    console.log(password);
                    wx.setClipboardData({
                        data:password,
                        success: function(res) {
                            wx.getClipboardData({
                                success: function(res) {
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
                    Time = setInterval(function (){
                        that.data.laotimettl--
                        that.setData({
                            laotimettl: that.data.laotimettl
                        })
                        if(that.data.laotimettl < 1){
                            clearInterval(Time)
                            that.setData({
                                laotime: true,
                                laotimettl: that.data.ttl
                            })
                        }
                    },1000)
                },2000)
            }else{
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000,
                    mask:true,
                })
            }
        })
    },

    /*侧滑*/
    switchNav(event){
        var cur = event.currentTarget.dataset.current;
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
        //tab选项居中
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event){
        var cur = event.detail.current;
        var source = event.detail.source;
        var singleNavWidth = this.data.windowWidth / 5;
        if(source != ''){
            this.setData({
                currentTab: cur,
                navScrollLeft: (cur - 2) * singleNavWidth
            });
        }

    }
})
