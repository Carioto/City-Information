var mapClick = document.querySelector("#map");
var airQEnd = "https://api.waqi.info/feed/"
var airQApi = "/?token=30986c5df2d22681e0e4e2f639c484959fea837c"
var aqiTarget = document.querySelector("#aqinum");
var pickCity = document.querySelector("#pickcity");
var openWEnd = "http://api.openweathermap.org/data/2.5/air_pollution?lat="
var openWApi = "19be75e028fe1ad48763744abc3054ec"
var coorEnd = "https://api.openweathermap.org/geo/1.0/direct?q="


function getCity(event) {
  var cityClick =  event.target.getAttribute('title');
  
  pickCity.textContent=cityClick;
  var airQInd = airQEnd + cityClick + airQApi;
  console.log(airQInd);
  fetch(airQInd)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var airQdata = data;
    var aqiEl = airQdata.data.aqi;
    aqiTarget.textContent=aqiEl;
  })
  
  var getCoor = coorEnd + cityClick + "&limit=1&appid=" + openWApi
   fetch(getCoor)
   .then(function(response){
      return response.json();
   })
   .then (function(data) {
    var dataQ = data;
    var lat = dataQ[0].lat;
    var lon = dataQ[0].lon;
    var apiUV = "openuv-rupcfgrls3xpbck-io"
    console.log(lat);
    console.log(lon);
    fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiUV
      },
  })
  .then(res => res.json())
  .then(data => console.log(data))
})
  

}






mapClick.addEventListener('click', getCity);



