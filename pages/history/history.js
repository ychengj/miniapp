var call = require("../../utils/request.js")
var app = getApp()
import event from "../../utils/event";
Page({
    data:{
        array:[],
        noneShow:false,
        pageNumber:0,
        systemSecret:'',
        ID:-1,
        INDEX:-2,
        showSc:false,
        language:'',
    },
    onLoad:function () {
        let that = this
        this.setLanguage();	// (1)
        event.on("languageChanged", this, this.setLanguage); // (2)
        wx.getStorage({
            key: app.globalData.appId + '_systemSecret',
            success: function (res) {
                that.setData({
                    systemSecret:res.data
                })
               call.gethttp('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory',{pageNumber:that.data.pageNumber},function (option) {
                   that.setData({
                       array:option.data
                   })
                   console.log(that.data.array);
                   if(that.data.array.length == 0){
                       that.setData({
                           noneShow:true
                       })
                   }else{
                       that.setData({
                           noneShow:false
                       })
                   }
                   
               })
            },
        })
    },
    onShow:function () {
        let that = this
        if(that.data.showSc == true){
            that.setData({
                ID:that.data.INDEX
            })
        }
    },
    /*设置语言*/
    setLanguage() {
        console.log("登录页面语言切换")
        this.setData({
            language: wx.T.getLanguage()
        });
    },
    /*上拉加载更多*/
    onReachBottom: function () {
        var that = this;
        // 显示加载图标
        that.data.pageNumber++
        call.gethttp('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory',{pageNumber:that.data.pageNumber},function (option) {
            for (let i = 0 ; i < option.data.length ; i++){
                that.data.array.push(option.data[i])
            }
            console.log(that.data.array);
            that.setData({
                array:that.data.array
            })
            if(option.data.length == 0){
                wx.showToast({
                    title:'暂无更多记录',
                    icon: 'none',
                    duration: 1000
                })
            }

        })
    },
    /*下拉树新*/
    onPullDownRefresh:function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        setTimeout(function() {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },500);

    },
    /*进入分享页面*/
    GoFenXiang(event){
        var id = event.currentTarget.id;
        var that = this;
        that.data.INDEX = id
        try {
            wx.setStorageSync('dynamicSecretHistoryId',that.data.array[id].dynamicSecretHistoryId)
            wx.setStorageSync('dynamicSecret',that.data.array[id].dynamicSecret)
            wx.setStorageSync('name',that.data.array[id].name)
            wx.setStorageSync('secretTypeName',that.data.array[id].secretTypeName)
            wx.setStorageSync('requireTime',that.data.array[id].requireTime)
            wx.setStorageSync('startTime',that.data.array[id].startTime)
            wx.setStorageSync('endTime',that.data.array[id].endTime)
            wx.navigateTo({
                url: '../fenxiang/fenxiang'
            })
        } catch (e) {
        }

    },
    /*清空*/
    QingKong(){
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定清空所有记录吗?',
            success: function(res) {
                if (res.confirm) {
                    call.DelData("systemSecret/"+that.data.systemSecret+'/dynamicSecretHistory/',{},function (res) {
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
                            call.gethttp('systemSecret/'+that.data.systemSecret+'/dynamicSecretHistory',{pageNumber:that.data.pageNumber},function (option) {
                                that.setData({
                                    array:option.data
                                })
                            })
                            that.setData({
                                noneShow:true
                            })
                        }
                    })
                }
            }
        })
    },


    })