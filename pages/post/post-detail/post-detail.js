// pages/post/post-detail/post-detail.js
var postsData=require('../../../data/post-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传过来的id，这里的id就是url中的id
    var postId=options.id;
    this.data.postId=postId;
    var postData=postsData.postlist[postId];
    //数据绑定
    //this.data.postData=postData;
    this.setData({
      postData:postData
    });

    var posts_collect_state=wx.getStorageSync("collect_state");
    if(posts_collect_state){
      var collected = posts_collect_state[postId];
      this.setData({
        collected:collected
      });
    }
    else{
      var posts_collect_state={};
      posts_collect_state[postId]=false;
      wx.setStorageSync("collect_state", posts_collect_state)
    }
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

  onBookmarkTap:function(event){
    var postsCollected=wx.getStorageSync("collect_state");
    var postCollected=postsCollected[this.data.postId];
    postsCollected[this.data.postId]=!postCollected;
    wx.setStorageSync("collect_state",postsCollected);
    this.setData({
      collected:!postCollected
    })
  }
})