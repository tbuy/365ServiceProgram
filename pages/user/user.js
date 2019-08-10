const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [ {
      id: 1,
      title: '求职意向',
      router: ''
    }, {
      id: 2,
      title: '我的抢单',
      router: ''
    }, {
      id: 3,
      title: '服务协议',
      router: ''
    }, {
      id: 4,
      title: '帮助中心',
      router: ''
      }, {
        id: 5,
        title: '建议反馈',
        router: ''
      }],
    isLogin: false,
    userName: '',
    icon:''
  },
  //获取用户信息
  bindGetUserInfo(e) {
    if (e.detail.encryptedData) {
      app.globalGetUserInfo(e)
      wx.navigateTo({
        url: '/pages/mobileLogin/mobileLogin',
      })
    }else{
      app.showInfo('您已拒绝授权，请重新点击并登录')
    }
  },
  //跳页
  goItem(e) {
    if (!this.data.isLogin){
      if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2){
        app.showInfo('请先登录',)
      } else {
        app.showInfo('敬请期待')
      }
    }else{
      if (e.currentTarget.dataset.router) {
        wx.navigateTo({
          url: e.currentTarget.dataset.router,
        })
      } else {
        app.showInfo('敬请期待')
      }
    }



  },
  //退出登录
  logout() {
    wx.navigateTo({
      url: '/pages/logout/logout',
    })
  },
  //编辑资料
  edit() {
    wx.navigateTo({
      url: '',
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
    try{
      app.checkLogin();
      if (wx.getStorageSync('isLogin')) {
        this.setData({
          isLogin: wx.getStorageSync('isLogin')
        })
        let _userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        this.setData({
          userName: _userInfo.name || _userInfo.phone,
          icon: _userInfo.icon
        })
        console.log(_userInfo)

      };
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