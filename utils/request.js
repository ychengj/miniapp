var app = getApp();
var host = 'https://devchat.leocheery.net/open-platform/';/*不是业务接口*/
var arrdress = 'https://devchat.leocheery.net/open-platform/api/v2.0.0/';/*业务逻辑接口*/

// var host = 'https://appcon.leocheery.net/open-platform/';/*不是业务接口*/
// var arrdress = 'https://appcon.leocheery.net/open-platform/api/v2.0.0/';/*业务逻辑接口*/
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail) {
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: host + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        data: postData,
        method: 'POST',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function postData(url, postData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: arrdress + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: postData,
        method: 'POST',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function PostData(url, postData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: host + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: postData,
        method: 'POST',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function putData(url, postData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: host + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: postData,
        method: 'PUT',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function PutData(url, postData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: arrdress + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: postData,
        method: 'PUT',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function DelData(url, postData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: arrdress + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: postData,
        method: 'DELETE',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        url: arrdress + url,
        header: {
            "content-type": "application/json;charset=UTF-8",
            'Token-JWT': 'jwt' + token
        },
        method: 'GET',
        success: function (res) {
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function gethttp(url,getData,doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        url: arrdress + url,
        header: {
            "content-type": "application/json;charset=UTF-8",
            'Token-JWT': 'jwt' + token
        },
        data: getData,
        method: 'GET',
        success: function (res) {
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}
function GetData(url,getData, doSuccess, doFail) {
    let token = ''
    try {
        var value = wx.getStorageSync('token')
        if (value) {
            token = value
            console.log(token);
        }
    } catch (e) {
    }
    wx.request({
        //项目的真正接口，通过字符串拼接方式实现
        url: host + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Token-JWT': 'jwt' + token
        },
        data: getData,
        method: 'GET',
        success: function (res) {
            //参数值为res.data,直接将返回的数据传入
            doSuccess(res.data);
        },
        fail: function () {
            doFail();
        },
    })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.request = request;
module.exports.getData = getData;
module.exports.PostData = PostData;
module.exports.postData = postData;
module.exports.GetData = GetData;
module.exports.putData = putData;
module.exports.PutData = PutData;
module.exports.DelData = DelData;
module.exports.gethttp = gethttp;