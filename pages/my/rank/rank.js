// pages/my/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绘制圆形
    var ctx = wx.createCanvasContext("rank");
    var width = 150;
    var x = 180;
    var y = 110;

    //开始绘制
    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, Math.PI * 2, false);
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#00b3c4');
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.draw();

    wx.request({
      // url: 'https://www.fastmock.site/mock/7d0bd8c1b892a5ef55497771851acae2/leyi/taobao',
      url: 'http://211.159.166.29:1234/wxuser/pointList',
      header: {
        'authorization': wx.getStorageSync('token')
      },
      success: res => {
        console.log(wx.getStorageSync('token'))
        console.log(res.data)
        console.log(res.data.index)
        this.setData({
          arr: res.data.list,
          rank: res.data.index
        })
      }
    })

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