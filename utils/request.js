const GET = 'GET';
const POST = 'POST';

// const baseURL = 'http://236y6m4513.zicp.vip';
// const baseURL = 'http://172.20.10.4:8087';
// const baseURL = 'http://121.5.222.148:8087';
const baseURL = 'http://localhost:8087';
// const baseURL = 'http://chat.biannian.top:8087';

function request(method, url, data) {
    return new Promise(function (resolve, reject) {
        wx.showLoading({
            title: '加载中',
        })
        let header = {
            'token': wx.getStorageSync('token') ? wx.getStorageSync('token') : "",
            'content-type': 'application/json',
        };
        wx.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功 
                wx.hideLoading();
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    switch (res.statusCode) {
                        case 213:
                            wx.setStorage({
                                key: 'token',
                                data: res.header.newToken
                            })
                            resolve(res);
                            break;
                        case 400:
                            wx.showToast({
                                title: '错误请求',
                                icon: 'none',
                                duration: 1500
                            })
                            break;
                        case 401:
                            wx.showModal({
                                title: '提示',
                                content: '您还尚未登录，请登录后操作',
                                success(res) {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: '/pages/Login/Login'
                                        })
                                    } else if (res.cancel) {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }
                                }
                            })
                            break;
                        case 402:
                            wx.showModal({
                                title: '提示',
                                content: '登录过期，请重新登陆',
                                success(res) {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: '/pages/Login/Login'
                                        })
                                    } else if (res.cancel) {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }
                                }
                            })
                            break;
                        case 404:
                            wx.showToast({
                                title: '404 NotFound',
                                icon: "error"
                            })
                            break;
                        case 500:
                            wx.showToast({
                                title: '服务器出错',
                                icon: "error"
                            })
                            break; 
                    }
                }
            },
            fail(err) {
                wx.hideLoading();
                wx.showToast({
                    title: '请求数据失败',
                    icon: 'none',
                    duration: 1500
                })
                //请求失败
                reject(err)
            }
        })
    })
}
module.exports = {
    request: request
}