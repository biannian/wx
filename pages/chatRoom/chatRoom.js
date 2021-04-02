  Page({

    data: {

    },
    onLoad: function (options) {
      this.chat();
    },
    chat() {
      let socketOpen = false
      let socketMsgQueue = []
      wx.connectSocket({
        url: 'ws://localhost:8087/websocket/buyer'
      })

      wx.onSocketOpen(function (res) {
        socketOpen = true
        for (let i = 0; i < socketMsgQueue.length; i++) {
          sendSocketMessage(socketMsgQueue[i])
        }
        socketMsgQueue = []
      })

      function sendSocketMessage(msg) {
        if (socketOpen) {
          wx.sendSocketMessage({
            data: msg
          })
        } else {
          socketMsgQueue.push(msg)
        }
      }
    },
  })