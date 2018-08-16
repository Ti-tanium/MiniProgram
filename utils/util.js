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

function concatCastsName(casts){
  var res=[];
  for(var idx in casts){
    res.push(casts[idx].name);
  }
  return res.join("/");
}

//从casts中得到cast的img url 与 name
function getCastsInfo(casts){
  console.log(casts);
  var castsInfo=[];
  for(var idx in casts){
    var cast={
      img:casts[idx].avatars.large?casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsInfo.push(cast);
  }
  return castsInfo;
}

module.exports={
  convertToStarsArray:convertToStarsArray,
  getMovieListData: getMovieListData,
  concatCastsName: concatCastsName,
  getCastsInfo: getCastsInfo
}

