const app = getApp();
const apiPath = require('../../config/apiPath.js');
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    lastId: 0,
    isLast: true,
    pageNumber: 10
  },
  getOrderList(lastId){
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
            list: _data.data,
            lastId: _data.lastId,
            isLast: _data.isLast
          })
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  goItem(e){
    wx.navigateTo({
      url: "/pages/orderContent/orderContent?id=" + e.currentTarget.dataset.id,
    })
  },
  upper(e) {
    wx.startPullDownRefresh()
  },
  lower: function (e) {
    console.log('更多')
    try {
      if (!this.data.isLast) {
        this.getOrderList(this.data.lastId)
      }
    } catch (e) {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 

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

    try{
      this.getOrderList(0)
    }catch(e){

    }
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