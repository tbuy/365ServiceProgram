const app = getApp();
const request = require('../../request/request.js');
const config = require('../../config/config.js');
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
    //   {
    //   id: 1,
    //   iconClass: 'icon-order',
    //   title: '求职意向',
    //   router: '/pages/intention/intention'
    // }, 
      {
        id: 1,
        iconClass: 'icon-order',
        title: '加入我们',
        router: '/pages/join/join'
      }, 
    {
      id: 2,
      iconClass: 'icon-resume',
      title: '我的名片',
      router: '/pages/staffCard/staffCard'
    }, 
    {
      id: 3,
      iconClass: 'icon-about',
      title: '阿姨手册',
      router: ''
    }, {
      id: 4,
      iconClass: 'icon-customer',
      title: '帮助中心',
      router: ''
    }, {
      id: 5,
      iconClass: 'icon-opinion',
      title: '意见反馈',
      router: ''
    }],
    isLogin: false,
    userName: '',//手机号
    icon: ''
  },
  //获取用户信息
  bindGetUserInfo(e) {
    if (e.detail.encryptedData) {
      app.globalGetUserInfo(e)
      wx.navigateTo({
        url: '/pages/mobileLogin/mobileLogin',
      })
    } else {
      app.showInfo('您已拒绝授权，请重新点击并登录')
    }
  },
  //跳页
  goItem(e) {
    if (!this.data.isLogin) {
      if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
        app.showInfo('请先登录')
      } else if (e.currentTarget.dataset.id == 5) {
        wx.makePhoneCall({
          phoneNumber: config.phone
        })
      } else {
        app.showInfo('敬请期待')
      }
    } else {
      if (e.currentTarget.dataset.router) {
        if (e.currentTarget.dataset.id == 2) {
          let isOurStaff = this.chackStaffPhone()
          if (!isOurStaff) {
            wx.navigateTo({
              url: e.currentTarget.dataset.router,
            })
          } else {
            app.showInfo('请填写个人信息')
          }
        } else {
          wx.navigateTo({
            url: e.currentTarget.dataset.router,
          })
        }
        
      } else if (e.currentTarget.dataset.id == 5) {
        wx.makePhoneCall({
          phoneNumber: config.phone
        })
      }  else {
        app.showInfo('敬请期待')
      }
    }
  },
  //退出登录
  logout() {
    wx.clearStorageSync()
    app.showLoading()
    setTimeout(() => {
      app.hideLoading(0)
      wx.reLaunch({ url: '/pages/user/user' })
    }, 800)
  },
  //检查劳动者是否在保姆库
  chackStaffPhone(){
    request.request(apiPath.checkStaffrPhone, 'POST', 
    { phone: this.data.userName,
      id: 0, 
    }).then(data => {
      if(data.code =='0'){
        return true
      } 
    }).catch(error => {
      if(error.code == '1'){
        return false
      } else {
        app.showInfo('出错了...')
      }
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
    try {
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
    } catch (e) {

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



