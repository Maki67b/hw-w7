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
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
    axios.get(apiUrl).then(getTempq);
    
}
function getTempq(response) {
    ff.classList.remove("active");
    cc.classList.add("active");
    let temp = document.querySelector("#now");
    let low = document.querySelector("#low");
    let high = document.querySelector("#high");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let status = document.querySelector("#descript");
    let h2 = document.querySelector("h2");
    let pic = response.data.weather[0].icon;
    let datetime = document.querySelector("#update");
    h2.innerHTML = response.data.name;
    cTemp = response.data.main.temp;
    temp.innerHTML = Math.round(cTemp) ;
    status.innerHTML=response.data.weather[0].description;
    low.innerHTML = "L: " + Math.round(response.data.main.temp_min) + "&ordm;";
    high.innerHTML = "H: " + Math.round(response.data.main.temp_max) + "&ordm;";
    humidity.innerHTML = "Humidity: " + response.data.main.humidity + "  %";
    wind.innerHTML = "Wind: " + response.data.wind.speed+ "  km/h";
    document.getElementById("status-pic").src = "http://openweathermap.org/img/wn/" + pic + "@2x.png";
    datetime.innerHTML = convertDate(response.data.dt * 1000);
    
}






let ff = document.querySelector("#fahrenheit");
ff.addEventListener("click", toFahrenheit);
function toFahrenheit(event) {
    event.preventDefault();
    let tempC = document.querySelector("#now");
    tempC.innerHTML = Math.round((cTemp * 9) / 5 + 32);
    cc.classList.remove("active");
    ff.classList.add("active");
    
    
}

let cc = document.querySelector("#celsius");
cc.addEventListener("click", toCelsius);
function toCelsius(event) {
    event.preventDefault();
    let temp = document.querySelector("#now");
    ff.classList.remove("active");
    cc.classList.add("active");
    temp.innerHTML =Math.round( cTemp);
}