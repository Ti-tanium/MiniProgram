// pages/movies/movie_detail/movie_detail.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.getMovieListData(url, this.processDoubanData);
  },

  processDoubanData: function(res) {
    if (res != null) {
      var director = {
        avatar: "",
        name: ""
      }

      if (res.directors[0] != null) {
        if (res.directors[0].avatar != null) {
          director.avatar = res.directors[0].avatar;
        }
        director.name = res.directors[0].name;
      }

      var movie = {
        title: res.title,
        originalTitle: res.original_title,
        image: res.images.large,
        average:res.rating.average,
        stars: util.convertToStarsArray(res.rating.stars),
        country: res.countries[0],
        wishCount: res.wish_count,
        commentCount:res.comments_count,
        year: res.year,
        genres: res.genres.join("、"),
        castsName: util.concatCastsName(res.casts),
        castsInfo: util.getCastsInfo(res.casts),
        summary: res.summary==""?"暂无简介":res.summary,
        directorName:director.name
      }
      console.log(movie);
      this.setData({
        movie: movie
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})