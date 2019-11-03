const app = getApp();
const apiPath = require('../../config/apiPath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    id: 1
  },
  getVideo(id) {
    wx.showNavigationBarLoading()
    wx.request({
      url: apiPath.getVideo,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'accessToken': wx.getStorageSync('accessToken')
      },
      data: {
        id: id
      },
      success: (res) => {
        if (res.data.code == 0) {
          let _data = res.data.data;
          this.setData({
            video: _data
          })
          wx.hideNavigationBarLoading()
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  waitingFun(){
    console.log(11)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getVideo(this.data.id)
  },



})