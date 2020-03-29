const app = getApp();
const apiPath = require('../../config/apiPath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    id: 1,
    lasttime:0
  },
  getVideo(id) {
    wx.showNavigationBarLoading()
    wx.showLoading()
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
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      },
      complete: () => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  shareInfo() {
    // const shareMenu = {
    //   withShareTicket: true,
    //   // 方法操作
    //   complete: (message) => {
    //     console.log('完成操作...', message);
    //   },
    //   fail: (error) => {
    //     console.log(error);
    //     wx.showToast({
    //       title: '分享失败',
    //       icon: 'fail',
    //       duration: 2000
    //     })
    //   },
    //   success: (message) => {
    //     console.log(message);
    //     wx.showModal({
    //       title: '分享成功',
    //       content: '分享成功,点击确定返回首页',
    //       success(res) {
    //         console.log(res)
    //       }
    //     });
    //   }
    // }
    // wx.showShareMenu(shareMenu);
    this.onShareAppMessage();
  },
  // 页面分享
  onShareAppMessage: function () {
    return {
      title: '视频分享',
      desc: '母婴护理课-第十七节婴幼儿疾病护理（下）',
      path: this.data.video.picture_url
    }
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
  onUnload(){
    console.log(this.data.lasttime)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getVideo(this.data.id)
  },
  recordFun(e){
    this.setData({
      lasttime: e.detail.currentTime
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }

})