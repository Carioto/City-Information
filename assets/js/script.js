var mapClick = document.querySelector("#map");


function getCity(event) {
  var cityClick =  event.target.getAttribute('title');
  
  console.log(cityClick);
}






mapClick.addEventListener('click', getCity);



