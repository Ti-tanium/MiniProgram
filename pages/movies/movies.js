// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHidden: false,
    searchHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(comingSoonUrl, "comingSoon");
    this.getMovieListData(top250url, "top250");

  },

  getMovieListData: function(url, movieKind) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        that.processDoubanData(res.data, movieKind);
      },
    })
  },

  onFocus: function(event) {
    this.setData({
      pageHidden: true,
      searchHidden: false
    });
  },

  onConfirm: function(event) {
    var text=event.detail.value;
    console.log(text);
    var searchUrl=app.globalData.doubanBase+"/v2/movie/search?q="+text;
    this.getMovieListData(searchUrl,"searchResult");
  },

  onClearTap: function() {
    this.setData({
      pageHidden: false,
      searchHidden: true
    });
  },

  processDoubanData: function(moviesDouban, movieKind) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData = {};
    var prompt="";
    if (movieKind == "inTheaters") {
      prompt = "正在热映";
    } else if (movieKind == "comingSoon") {
      prompt = "即将上映";
    } else if(movieKind=="top250"){
      prompt = "豆瓣前250";
    }
    readyData[movieKind] = {
      movies: movies,
      prompt: prompt
    };
    this.setData(readyData);
    wx.stopPullDownRefresh();
  },
  onMoreTap: function(event) {
    var prompt = event.currentTarget.dataset.catagory;
    wx.navigateTo({
      url: '/pages/movies/more_movies/more_movies?prompt=' + prompt,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movie_detail/movie_detail?id='+movieId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
    this.onLoad();
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