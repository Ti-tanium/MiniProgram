// pages/post/post-detail/post-detail.js
var postsData = require('../../../data/post-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    play: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传过来的id，这里的id就是url中的id
    var postId = options.id;
    this.data.postId = postId;
    var postData = postsData.postlist[postId];
    //数据绑定
    //this.data.postData=postData;
    this.setData({
      postData: postData
    });

    var posts_collect_state = wx.getStorageSync("collect_state");
    if (posts_collect_state) {
      var collected = posts_collect_state[postId];
      this.setData({
        collected: collected
      });
    }
    else {
      var posts_collect_state = {};
      posts_collect_state[postId] = false;
      wx.setStorageSync("collect_state", posts_collect_state)
    }
    
    //若音乐正在播放    
    if (app.globalData.g_play&&app.global.g_currentPostId==postId) {
      this.setData({
        play: true
      });
    }

    this.setMusicMonitor(postId);
  },

  setMusicMonitor: function (postId) {
    //由于在onBackgroundAudioPlay里面要用到this，而里面的this不是指代page对象，因此在此处赋值转换
    var that = this;
    //callback表示回调函数，该处用匿名函数实现。
    wx.onBackgroundAudioPlay(function () {
      //同步内置播放器与自定义播放器的按钮
      that.setData({
        play: true
      });      
      app.globalData.g_play = true;      
      app.globalData.g_currentPostId=postId;
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        play: false
      });
      app.globalData.g_play = false;    
      app.globalData.g_currentPostId=null;
    });

    wx.onBackgroundAudioStop(function () {
      that.setData({
        play: false
      });
      app.globalData.g_play = false;
      app.globalData.g_currentPostId = null;
    });
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

  },

  onBookmarkTap: function (event) {
    var postsCollected = wx.getStorageSync("collect_state");
    var postCollected = postsCollected[this.data.postId];
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    wx.setStorageSync("collect_state", postsCollected);
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000
    })

  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享给QQ好友",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex);
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '暂无分享功能（点击取消？' + res.cancel + ')',
        })
      }
    })
  },
  onPlayTap: function (event) {
    var play = this.data.play;
    play = !play;
    wx.pauseBackgroundAudio();
    this.setData({
      play:play
    });
  },
  onPauseTap: function (event) {
    var postId = this.data.postId;
    var play = this.data.play;
    play = !play;
    wx.playBackgroundAudio({
      dataUrl: postsData.postlist[postId].music.url,
      title: postsData.postlist[postId].music.title,
      coverImgUrl: postsData.postlist[postId].music.coverImg,
      singer: postsData.postlist[postId].music.singer
    });
    this.setData({
      play: play
    });
  },
})