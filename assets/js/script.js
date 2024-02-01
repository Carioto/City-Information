var mapClick = document.querySelector("#map");
var airQEnd = "https://api.waqi.info/feed/"
var airQApi = "/?token=30986c5df2d22681e0e4e2f639c484959fea837c"
function getCity(event) {
  var cityClick =  event.target.getAttribute('title');
  
  console.log(cityClick);
  var airQInd = airQEnd + cityClick + airQApi;
  console.log(airQInd);
  fetch(airQInd)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var airQdata = data;
    console.log(airQdata);
    var aqiEl = airQdata.data.aqi;
    console.log (aqiEl);
  }
  )
}






mapClick.addEventListener('click', getCity);



