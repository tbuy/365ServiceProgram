const app = getApp();
const apiPath = require('../../config/apiPath.js');

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
    bannerImage: [],
    //轮播点
    indicatorDots: true,
    autoplay: true,
    //时间间隔
    interval: 3000,
    //滑动时长
    duration: 400,
    height: '',
    adPosition: null

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
    if (!this.data.isLast) {
      this.getOrderList(this.data.lastId)
    } else {
      app.showInfo('没有更多')
    }

  },
  getAdPosition() {
    wx.request({
      url: apiPath.getAdPosition,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      success: (res) => {
        if (res.data.code == 0) {
          let _data = res.data.data;
          this.setData({
            adPosition: _data,
            bannerImage: _data['S000007']['resource'],
          })
          wx.setStorageSync('adPosition', JSON.stringify(_data));
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  goAdPositionContent(e) {
    if (e.currentTarget.dataset.item) {
      app.goAdPositionContent(e.currentTarget.dataset.item)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: [],
      lastId: 0,
      isLast: false,
    })
    this.getOrderList(0)
    this.getAdPosition()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(44)
    app.showLoading()
    setTimeout(() => {
      wx.stopPullDownRefresh()
      console.log(55)
    }, 200)
    app.hideLoading(200)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(111)
  },

  onTabItemTap(item) {
    this.getOrderList(0)
  }
})