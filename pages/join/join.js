// pages/join/join.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '',
    phone: '',
    sex: 1,
    identify: '', //身份证号
    birthday: '', //生日
    education: '',
    educationArr: ['全部', '本科及以上', '专科', '高中', '初中', '小学'], //教育程度
    is_married: 1, //婚姻状况
    zodiac_sign: '',
    zodiac_signArr: ['全部', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'], //生肖
    height: '', //身高
    weight: '',
    address: '', //现住址
    urgent_phone: '', //紧急联系人
    address_in_law: '', //户籍地址
    remarks: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit() {},
    nameInput(e) {
      this.setData({
        name: e.detail.value
      })
    },
    phoneInput(e) {
      this.setData({
        phone: e.detail.value
      })
    },
    sexChange(e) {
      this.setData({
        sex: e.detail.value
      })
    },
    identifyInput(e) {
      this.setData({
        identify: e.detail.value
      })
    },
    birthdayChange(e) {
      this.setData({
        birthday: e.detail.value
      })
    },
    educationPickerChange(e) {
      this.setData({
        education: this.data.educationArr[e.detail.value]
      })
    },
    marryChange(e) {
      this.setData({
        is_married: e.detail.value
      })
    },
    signPickerChange(e) {
      this.setData({
        zodiac_sign: this.data.zodiac_signArr[e.detail.value]
      })
    },
    heightInput(e) {
      this.setData({
        height: e.detail.value
      })
    },
    weightInput(e) {
      this.setData({
        weight: e.detail.value
      })
    },
    addressInput(e) {
      this.setData({
        address: e.detail.value
      })
    },
    uphoneInput(e) {
      this.setData({
        urgent_phone: e.detail.value
      })
    },
    addressInInput(e) {
      this.setData({
        address_in_law: e.detail.value
      })
    },
    remarksInInput(e) {
      this.setData({
        remarks: e.detail.value
      })
    },

  }
})