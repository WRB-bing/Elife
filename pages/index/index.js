//index.js
//获取应用实例
const app = getApp();
let id;

Page({
  data: {
    imgUrls: [
      'http://211.159.166.29:1234/static/banner/yiyong.png',
      'http://211.159.166.29:1234/static/banner/tieshi.png',
      'http://211.159.166.29:1234/static/banner/jifen.png'
    ],
    indicatorDots: true, //是否显示轮播点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    circular: true //是否采用衔接滑动
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.request({
      url: 'http://211.159.166.29:1234/useapp',
      success: (res) => {
        console.log(res.data)
        this.setData({
          list: res.data
        })
      }
    })
  },

  // 页面跳转
  goToPage: function (event) {
    console.log(event)
    console.log(event.currentTarget.id)
    wx.setStorageSync('type_id', event.currentTarget.id)
    wx.navigateTo({
      //url:'/pages/elife/functionPage/functionPage?id='+event.currentTarget.id
      url: '/pages/elife/guide/guide'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})