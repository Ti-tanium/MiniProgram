// pages/post/post.js
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
    var post_content1={
      author_img:"/images/headimg.jpg",
      date:"Sep 8 2018",
      content_img:"/images/swiper1.jpg",
      content:"洞庭湖区位于长江中游荆江南岸，跨湘、鄂两省。包括荆江河段以南，湘、资、沅、澧四水控制站以下的广大平原、湖泊水网区。洞庭湖南近湘阴县、益阳市，北抵华容县、安乡县、南县，东滨岳阳市、汨罗市，西至澧县。在北纬27°39′~29°51′；东经111°19′~113°34′之间。",
      collect_img:"/images/Favorites.png",
      collect_count:96,
      view_img:"/images/View.png",
      view_count:65
    }
    this.setData(post_content1);
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