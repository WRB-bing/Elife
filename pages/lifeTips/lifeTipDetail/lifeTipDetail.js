// pages/lifeTips/lifeTipDetail/lifeTipDetail.js

// "pages/index/index",
//"pages/elife/guide/guide",
// "pages/elife/functionPage/functionPage",
// "pages/elife/detail/detail",
// "pages/elife/end/end"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: [],
    txt: [],
    audioState: false,
  },
  // 点赞
  getLike: function (options) {
    console.log(this.options)
    wx.request({
      url: 'http://211.159.166.29:1234/wxuser/addLike',
      method: 'POST',
      data: wx.getStorageSync('passageName'),
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success: res => {
        console.log('点赞成功')
        this.setData({
          ishidden: true,
        })
        wx.request({
          url:'http://211.159.166.29:1234/wxuser/userLike',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success:res=>{
            wx.removeStorageSync('zanlist')
            wx.setStorageSync('zanlist',res.data)
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
      },
      fail: res => {
        console.log('点赞失败')
      }
    })
  },

  // 取消点赞
  cancleLike: function (options) {
    console.log(this.options)
    wx.request({
      url: 'http://211.159.166.29:1234/wxuser/cancelLike',
      method: 'DELETE',
      data: this.options.id,
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success: res => {
        console.log('取消点赞')
         this.setData({
          ishidden: !this.data.ishidden
        })
        wx.request({
          url:'http://211.159.166.29:1234/wxuser/userLike',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success:res=>{
            wx.removeStorageSync('zanlist')
            wx.setStorageSync('zanlist',res.data)
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
      },
      fail: res => {
        console.log('取消失败')
      }
    })
  },

  // 收藏
  getCollect: function (options) {
    console.log(this.options)
    console.log(this.data.colhidden)
    wx.request({
      url: 'http://211.159.166.29:1234/wxuser/addCollect',
      method: 'POST',
      data: wx.getStorageSync('passageName'),
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success: res => {
        console.log('收藏成功')
        this.setData({
          colhidden: !this.data.colhidden
        })
        wx.request({
          url:'http://211.159.166.29:1234/wxuser/userCollection',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success:res=>{
            wx.removeStorageSync('collist')
            wx.setStorageSync('collist',res.data)
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
      },
      fail: res => {
        console.log('收藏失败')
      }
    })
  },
  // 取消收藏
  cancleCollect: function (options) {
    console.log(this.options)
    wx.request({
      url: 'http://211.159.166.29:1234/wxuser/cancelCollect',
      method: 'DELETE',
      data: this.options.id,
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success: res => {
        this.setData({
          colhidden: !this.data.colhidden
        })
        console.log('取消收藏')
        wx.request({
          url:'http://211.159.166.29:1234/wxuser/userCollection',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success:res=>{
            wx.removeStorageSync('collist')
            wx.setStorageSync('collist',res.data)
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
      },
      fail: res => {
        console.log('取消失败')
        wx.setStorageSync('colhidden',false)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // setTimeout(()=>{
      //   wx.request({
      //     url: 'http://211.159.166.29:1234/wxuser/userLike',
      //     header: {
      //       "authorization": wx.getStorageSync('token')
      //     },
      //     success: res => {
      //       console.log('获取成功')
      //       console.log(res.data)
      //       this.setData({
      //         zanlist:res.data,
      //       })
      //       wx.setStorageSync('ishidden',true)
    
      //     },
      //     fail: res => {
      //       console.log('获取失败')
      //     }
      //   })
      //   wx.request({
      //     url: 'http://211.159.166.29:1234/wxuser/userCollection',
      //     header: {
      //       "authorization": wx.getStorageSync('token')
      //     },
      //     success: res => {
      //       console.log('获取成功')
      //       this.setData({
      //         canglist:res.data,
      //       })
      //       // wx.setStorageSync('colhidden',true)
    
      //     },
      //     fail: res => {
      //       console.log('获取失败')
      //     }
      //   })
      // },300)
      // setTimeout(()=>{console.log(this.data.zanlist)
      //   let hidden=this.data.zanlist.some((item)=>item.id===wx.getStorageSync('article_id'))
      //   let lhidden=this.data.canglist.some((item)=>item.id===wx.getStorageSync('article_id'))
      //   this.setData({
      //     ishidden:hidden,
      //     colhidden:lhidden
      //   })
      //   console.log(this.data.ishidden)
      // },1000)

    // this.setData({
    //     ishidden: wx.getStorageSync('ishidden'),
    //     colhidden: wx.getStorageSync('colhidden'),
    // })
    let hi=wx.getStorageSync('zanlist')
    let li=wx.getStorageSync('collist')
      if(hi){
          this.setData({
            ishidden:hi.some((item)=>item.id===this.options.id),
          })
        }
      if(li){
        let lhidden=li.some((item)=>item.id===this.options.id)
        this.setData({
          colhidden:lhidden
        })
      }
    // 存文章id
    wx.setStorageSync('article_id', this.options.id)
    console.log(wx.getStorageSync('article_id'))
    // 请求相应的页面
    wx.request({
      url: 'http://211.159.166.29:1234/usepassage/' + this.options.id,
      success: res => {
        console.log(res.data)
        wx.setStorageSync('passageName', res.data[0].name)
        console.log(wx.getStorageSync('passageName'))
        this.setData({
          article: res.data,
        })
        // 请求文章内容   
        wx.request({
          url: 'http://211.159.166.29:1234/static/passage/content/' + this.options.id + '.txt',
          success: res => {
            this.setData({
              content: res.data
            })
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 创建音频上下文
    this.audioCtx = wx.createAudioContext('audio')
  },

  // 播放控制
  audioPlay: function () {
    let state = this.data.audioState;
    // 播放
    if (state === false) {
      console.log('播放')
      this.audioCtx.play()
      this.setData({
        audioState: true
      })
    }
    // 暂停
    else if (state === true) {
      console.log('暂停')
      this.audioCtx.pause()
      this.setData({
        audioState: false
      })
    }
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