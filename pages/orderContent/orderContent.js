const app = getApp();
const apiPath = require('../../config/apiPath.js');
const config = require('../../config/config.js')
const utils = 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    id: 1,
    isSharePageShow: false,
  },
  getOrder(id) {
    wx.showNavigationBarLoading()
    wx.showLoading()
    wx.request({
      url: apiPath.getOrder,
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
            order: _data
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
  showShare(){
    this.setData({
      isSharePageShow: true
    })
    
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.order.agent_manager_phone || config.phone
    })

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrder(this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})