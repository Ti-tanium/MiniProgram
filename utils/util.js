function convertToStarsArray(stars){
  var num=stars.toString().substring(0,1);
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  return array;
}

function getMovieListData(url,callback) {  
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callback(res.data);
    },
  })
}

module.exports={
  convertToStarsArray:convertToStarsArray,
  getMovieListData: getMovieListData
}

