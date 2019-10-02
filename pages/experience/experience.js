let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [
      {
        value: '保姆',
        id: 1,
        isSelect: false
      }, {
        value: '月嫂',
        id: 2,
        isSelect: false
      }, {
        value: '育儿嫂',
        id: 3,
        isSelect: false
      },
      {
        value: '保洁',
        id: 4,
        isSelect: false
      }, {
        value: '护工',
        id: 5,
        isSelect: false
      }, {
        value: '做生意',
        id: 6,
        isSelect: false
      }, {
        value: '销售',
        id: 7,
        isSelect: false
      }, {
        value: '其他',
        id: 8,
        isSelect: false
      },
    ],
  },
  selected(e) {
    let _timeList = this.data.timeList;
    _timeList.forEach(item => {
      if (e.currentTarget.dataset.id == item.id) {
        item.isSelect = !item.isSelect
      }
    })
    this.setData({
      timeList: _timeList
    })

  },
  selectedContent(e) {
    let _contentList = this.data.contentList;
    _contentList.forEach(item => {
      if (e.currentTarget.dataset.id == item.id) {
        item.isSelect = !item.isSelect
      }
    })
    this.setData({
      contentList: _contentList
    })

  },
  save() {
    app.showInfo('保存成功')
    wx.reLaunch({
      url: "/pages/user/user"
    })
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