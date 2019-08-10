const app = getApp();
const apiPath = require('../../config/apiPath.js');

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    // 分页
    lastId: 0,
    isLast: true,
    pageNumber: 5,
    //轮播
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    ],
    //轮播点
    indicatorDots: true,
    autoplay: false,
    //时间间隔
    interval: 5000,
    //滑动时长
    duration: 400,
    height: '',

  },
  getOrderList(lastId) {
    wx.showNavigationBarLoading()
    wx.request({
      url: apiPath.getOrderList,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        lastId: lastId,
        pageNumber: this.data.pageNumber
      },
      success: (res) => {
        if (res.data.code == 0) {
          let _data = res.data.data;
          this.setData({
            list: this.data.list.concat(_data.data),
            lastId: _data.lastId,
            isLast: _data.isLast,
          })
          wx.hideNavigationBarLoading()
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  goItem(e) {
    wx.navigateTo({
      url: "/pages/orderContent/orderContent?id=" + e.currentTarget.dataset.id,
    })
  },
  upper(e) {
    wx.startPullDownRefresh()
  },
  lower() {
    if (!this.data.isLast){
      this.getOrderList(this.data.lastId)
    }else{
      app.showInfo('没有更多')
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
     this.getOrderList(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log(44)
    app.showLoading()
    setTimeout(()=>{
      wx.stopPullDownRefresh()
      console.log(55)
    },500)
    app.hideLoading(500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})