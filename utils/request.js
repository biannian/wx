const GET = 'GET';
const POST = 'POST';


const baseURL = 'http://localhost:8087';

function request(method, url, data) {
    return new Promise(function (resolve, reject) {
        let header = {
            'token': '123',
            'content-type': 'application/json',
        };
        wx.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                //请求成功 
                if (res.data.code == 200) {
                    resolve(res);
                } else {
                    switch (res.statusCode) {
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
                    }
                }
            },
            fail(err) {
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