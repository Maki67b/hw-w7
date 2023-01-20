//navigator.geolocation.getCurrentPosition(showPosition);
searchCity("tehran");
let cTemp = null;
function convertDate(x) {
    let date = new Date(x);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let day = convertDay(date);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    return "last updated: "+ day + "  " + hour + ":" + minute;
}



let form = document.querySelector("form");
form.addEventListener("submit", search);

function convertDay(d)
{
    let day = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
return day[d.getDay()];
}


function search(event) {
  event.preventDefault();
  let input = document.querySelector("#form-input");
  let city = input.value;
  searchCity(city);

}
function searchCity(city) {
    
    let apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
    axios.get(apiUrl).then(find);
}
function find(response) {
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let h2 = document.querySelector("h2");
    h2.innerHTML = response.data.name;
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
    axios.get(apiUrl).then(getTempq);
    forecast(response.data.coord);
    
}
function getTempq(response) {
   
    let temp = document.querySelector("#now");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let status = document.querySelector("#descript");
    let pic = response.data.current.weather[0].icon;
    let datetime = document.querySelector("#update");
    cTemp = response.data.current.temp;
    temp.innerHTML = Math.round(cTemp) ;
    status.innerHTML=response.data.current.weather[0].description;
    humidity.innerHTML = "Humidity: " + response.data.current.humidity + "  %";
    wind.innerHTML = "Wind: " + Math.round(response.data.current.wind_speed) + "  km/h";
    document.getElementById("status-pic").src = "http://openweathermap.org/img/wn/" + pic + "@2x.png";
    datetime.innerHTML = convertDate(response.data.current.dt * 1000);
    
}



function forecast(coord) {
    let lat = coord.lat;
    let lon = coord.lon;
    let apiUr =
  "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
    axios.get(apiUr).then(showf);
}

function showf(response) {
     document
        .querySelectorAll(".col-2")
        .forEach(function (element, index) {
            let day = new Date(response.data.daily[index].dt*1000);
            let x = new Date(day);
            element.querySelector("#day").innerHTML = convertDay(x);
            let pic = response.data.daily[index].weather[0].icon;
            element.querySelector("#pic").src = "http://openweathermap.org/img/wn/" + pic + "@2x.png";
            let temp = Math.round(response.data.daily[index].temp.min) + "&ordm;<strong> " + Math.round(response.data.daily[index].temp.max) + "&ordm;</strong>";
            element.querySelector(".temp1").innerHTML = temp;


        });
}
