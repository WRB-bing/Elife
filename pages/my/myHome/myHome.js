// pages/my/myHome/myHome.js

const app = getApp()
//navigator open-type="navigate" url="/pages/my/myzan/myzan"
//url="/pages/my/myshoucang/myshoucang"
// url="/pages/my/rank/rank"
// url="/pages/my/opinion/opinion"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:wx.getStorageSync('userInfo'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user:wx.getStorageSync('user')
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: `http://211.159.166.29:1234/wxuser/saveUserName`,
        data:e.detail.userInfo.nickName,
        method:'POST',
        header:{
          "authorization":wx.getStorageSync('token')
        },
        success:res=>{
          wx.setStorageSync('user','success')
          wx.setStorageSync('userInfo',e.detail.userInfo)
          console.log('上传成功')
        },
        fail:res=>{
          console.log('上传失败')
        }
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  login:function(e){
    console.log(e)
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: e.currentTarget.id,
      })
    }else{
      wx.showModal({
        title: '登录',
        showCancel:false,
        content: '请先去我的页面登录',
        success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/my/myHome/myHome',
          })
        }
        }
        })
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
    wx.request({
      url: 'http://211.159.166.29:1234/wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data)
        this.setData({
          score:res.data
        })
      },
      fail:res=>{
        console.log('上传失败')
      }
    })
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