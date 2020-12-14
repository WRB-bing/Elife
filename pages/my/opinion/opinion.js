// pages/my/opinion/opinion.js
Page({
  onSubmit: function (f) {
    console.log(11111111)
    wx.request({
      // url:'http://211.159.166.29:1234/wxuser/changepoints',
      url: 'http://211.159.166.29:1234/wxuser/userSuggestion',
      data: f.detail.value['context'],
      method: 'POST',
      header: {
        'authorization': wx.getStorageSync('token')
      },
      success: res => {
        console.log('submit success')
        // 弹框
        wx.showToast({
          title: '提交成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 2000 // 提示窗停留时间，默认1500ms
        })
        // 跳转
        wx.switchTab({
          url: '/pages/my/myHome/myHome',         
        })
      },
      fail: res => {
        console.log('submit fail');
      },
    })
    // 弹窗

  },

  /**
   * 页面的初始数据
   */
  data: {

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