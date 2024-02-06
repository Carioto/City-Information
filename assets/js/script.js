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
var tbody = document.querySelector("#bodyTable");

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
    var apiUV = "openuv-rupcfgrls3xp3tf-io"
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
          'authorization': 'apikey 3ZTBTe6yHfTYDORVYw9xh1:4Vi3MuMsBKyLjPWZnK8Ifn',
          'content-type': 'application/json'
      }})
      .then(function(response){
          return response.json();
      })
      .then(function(data){
        var regGasPrice = Math.round(data.result.gasoline*100)/100;
        var midGasPrice = Math.round(data.result.midGrade*100)/100;
        var preGasPrice = Math.round(data.result.premium*100)/100;
        cityNamed.textContent = cityClick;
          regGas.textContent = regGasPrice;
          midGas.textContent = midGasPrice;
          preGas.textContent = preGasPrice;
          var localgas = {
            city: cityClick,
            reg: regGasPrice,
            mid: midGasPrice,
            pre: preGasPrice
          };
         var gasRowJson=JSON.parse(localStorage.getItem('localgas')) || [];
         gasRowJson.push(localgas);
         if (gasRowJson.length > 8){
           gasRowJson.shift();
          };
          localStorage.setItem('localgas', JSON.stringify(gasRowJson));
          createTable();
        }
        )
      };
      
function createTable(){
  var gasRowJson=JSON.parse(localStorage.getItem('localgas')) || [];
  for (i=0; i<gasRowJson.length; i++){
    var trow = document.createElement("tr");
    $(trow).append("<td>" + gasRowJson[i].city + "</td><td>$" + gasRowJson[i].reg + 
    "</td><td>$" + gasRowJson[i].mid + "</td><td>$" + gasRowJson[i].pre + "</td></tr>");
    tbody.append(trow);
  }
}      

window.addEventListener("load", createTable());

activateModal.addEventListener("click", function() {
  if (!cityClick){
    pickCity.textContent="Please select a marker";
    return;
  }else{
    getGasData()}});

//Click on map starts function
mapClick.addEventListener('click', getCity);



