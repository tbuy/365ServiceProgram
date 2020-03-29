// components/makeImage/makeImage.js
Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    },
    imageItem:{
      type: Object,
      value: {},
    }
  },
  data: {
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false
  },
  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath)
    },
    handleClose() {
      this.setData({
        visible: false
      })
    },
    drawPic() {
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData')
        return
      }
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '750rpx',
          height: '1334rpx',
          background: 'https://qiniu-image.qtshe.com/20190506share-bg.png',
          views: [
            // {
            //   type: 'image',
            //   url: 'https://qiniu-image.qtshe.com/1560248372315_467.jpg',
            //   css: {
            //     top: '32rpx',
            //     left: '30rpx',
            //     right: '32rpx',
            //     width: '688rpx',
            //     height: '420rpx',
            //     borderRadius: '16rpx'
            //   },
            // },
            { 
              type: 'text',
              text: '工种：'+this.properties.imageItem.work_type,
              css: {
                top: '110rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: '工资：' + this.properties.imageItem.wage,
              css: {
                top: '170rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: '工作时间：' + this.properties.imageItem.service_duration,
              css: {
                top: '240rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: '服务地址：' ,
              css: {
                top: '310rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: this.properties.imageItem.service_address,
              css: {
                top: '380rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: '订单详情：',
              css: {
                top: '450rpx',
                fontSize: '44rpx',
                lineHeight: '60rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            {
              type: 'text',
              text: this.properties.imageItem.order_details,
              css: {
                top: '590rpx',
                fontSize: '44rpx',
                lineHeight: '50rpx',
                left: '100rpx',
                // align: 'center',
                color: '#3c3c3c'
              }
            },
            // {
            //   type: 'image',
            //   url: wx.getStorageSync('avatarUrl') || 'https://qiniu-image.qtshe.com/default-avatar20170707.png',
            //   css: {
            //     top: '404rpx',
            //     left: '328rpx',
            //     width: '96rpx',
            //     height: '96rpx',
            //     borderWidth: '6rpx',
            //     borderColor: '#FFF',
            //     borderRadius: '96rpx'
            //   }
            // },
            // {
            //   type: 'text',
            //   text: wx.getStorageSync('nickName') || '青团子',
            //   css: {
            //     top: '532rpx',
            //     fontSize: '28rpx',
            //     left: '375rpx',
            //     align: 'center',
            //     color: '#3c3c3c'
            //   }
            // },
            // {
            //   type: 'text',
            //   text: `邀请您参与助力活动`,
            //   css: {
            //     top: '576rpx',
            //     left: '375rpx',
            //     align: 'center',
            //     fontSize: '28rpx',
            //     color: '#3c3c3c'
            //   }
            // },
            // {
            //   type: 'text',
            //   text: `宇宙最萌蓝牙耳机测评员`,
            //   css: {
            //     top: '644rpx',
            //     left: '375rpx',
            //     align: 'center',
            //     fontWeight: 'bold',
            //     fontSize: '44rpx',
            //     color: '#3c3c3c'
            //   }
            // },
            {
              type: 'image',
              // url: 'https://qiniu-image.qtshe.com/20190605index.jpg',
              url:'/images/miniprogramsunCode.jpg',
              css: {
                top: '834rpx',
                left: '470rpx',
                width: '200rpx',
                height: '200rpx'
              }
            }
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData')
    },
    preventDefault() { },
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                wx.showModal({
                  title: '提示',
                  content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  }
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
    }
  }
})
