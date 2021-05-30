const $api = require('../../api/api').API;
const formatTime = require('../../utils/util').formatTime;
Page({
    data: {
        text: '',
        shopId: '',
        orderId: '',
        comment: {
            shopId: '',
            orderId: '',
            commentImg: '',
            commentInfo: '',
            accountName: '',
            commentTime: '',
            commentScore: '',
            shopReply: '',
            shopReplyTime: '',
        },

        files: []
    },
    onLoad(options) {
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this), 
            shopId: options.shopId,
            orderId: options.orderId 
        })
    },
    addComment() {
        let commentTime = formatTime("YYYY-mm-dd HH:MM:SS", new Date());
        var params = this.data.comment;
        if (!params.commentScore) {
            wx.showToast({
                title: '请评分',
                icon: 'error',
                duration: 1500
            })
        }
        params.shopId = this.data.shopId;
        params. orderId  = this.data.orderId;
        params.commentInfo = this.data.text;
        params.accountName = wx.getStorageSync('accountName');
        params.commentTime = commentTime; 
        var param = {
            orderId: this.data.orderId,
            orderState: '5',
        }
        $api.addComment(params)
            .then((res) => {
                if(res.data.code == 200){
                    $api.updateState(param)
                    .then((res) => {
                       if(res.data.code == 200){
                        wx.showToast({
                            title: '评分成功',
                            icon: 'success',
                            duration: 1500
                        })
                        wx.navigateBack({
                            delta: 1
                          })
                       }
                    })
                }
            })
    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    selectFile(files) {
        console.log('files', files)
        // 返回false可以阻止某次文件上传
    },
    uplaodFile(files) {
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {

        })
    },
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        console.log('upload success', e.detail)
    },
    radioChange(e) { 
        this.setData({
            comment: {
                commentScore: e.detail.value
            }
        })
    },
    setTips(e) {
        this.setData({
            text: e.detail.value
        })
    },
});