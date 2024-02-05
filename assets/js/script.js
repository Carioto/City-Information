var mapClick = document.querySelector("#map");
var airQEnd = "https://api.waqi.info/feed/"
var airQApi = "/?token=30986c5df2d22681e0e4e2f639c484959fea837c"
var aqiTarget = document.querySelector("#aqinum");
var pickCity = document.querySelector("#pickcity");
var openWEnd = "http://api.openweathermap.org/data/2.5/air_pollution?lat="
var openWApi = "19be75e028fe1ad48763744abc3054ec"
var coorEnd = "https://api.openweathermap.org/geo/1.0/direct?q="
var uvIndexEl = document.querySelector("#uvIndex");
var regGas = document.querySelector("#reggas");
var midGas = document.querySelector("#midgas");
var preGas = document.querySelector("#pregas");
var gasEndPoint = "https://api.collectapi.com/gasPrice/fromCoordinates?lng="
var cityNamed = document.querySelector("#citynamed");
var activateModal = document.querySelector(".uk-button");
var lat = 0;
var lon= 0;
var cityClick;
var localData;
var locaqi;

function getCity(event) {

  cityClick =  event.target.getAttribute('title');
    if (!cityClick){
      pickCity.textContent="Please select a marker";
      return;
    }else{
      pickCity.textContent=cityClick;
      var airQInd = airQEnd + cityClick + airQApi;
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
     lat = dataQ[0].lat;
     lon = dataQ[0].lon;
    var apiUV = "openuv-rupcfgrls3xrllu-io"
    fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': apiUV
      },
  })
  .then (function(response){
    return response.json();
  })
  .then (function(data){
    var maxUv=data.result.uv_max;
    uvIndexEl.textContent=maxUv;
  })
})}
var localCity=(cityClick);
 var PJson=JSON.parse(localStorage.getItem('localCity')) || [];
     PJson.push(localCity);
     if (PJson.length > 10){
      PJson.shift();
     };
 localStorage.setItem('localCity', JSON.stringify(PJson));
}


function getGasData() {
  cityNamed.textContent = "One moment please...";
  gasDataUrl= gasEndPoint + lon + "&lat=" + lat;
  fetch(gasDataUrl, {
      headers: {
          'authorization': 'apikey 5ckicsZ4HYYUCe73BbPN3e:6dYxg270wFh5He9d4LUUFl',
          'content-type': 'application/json'
      }})
      .then(function(response){
          return response.json();
      })
      .then(function(data){
        var regGasPrice = data.result.gasoline;
        var midGasPrice = data.result.midGrade;
        var preGasPrice = data.result.premium;
        cityNamed.textContent = cityClick;
          regGas.textContent = regGasPrice;
          midGas.textContent = midGasPrice;
          preGas.textContent = preGasPrice;
      }
      )
  };
  
  activateModal.addEventListener("click", getGasData);

//Click on map starts function
mapClick.addEventListener('click', getCity);



