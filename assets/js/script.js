



window.onload = () => {
  
    GetCurrentLocation();
    icon();
};
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthname = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
const day = weekday[d.getDay()];
const month = monthname[d.getMonth()];
const date = d.getDate();

const year = d.getFullYear();
const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//const month = weekday[d.getDay()];
//This will return the users current Location including city state and zip
function GetCurrentLocation() {
    const Curlocation = document.getElementById('CurrentLocation');
    const CurTime = document.getElementById('CurrentTime');
    const Curday = document.getElementById('current-date');
   
    $.ajax({
        url: "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708",
        jsonpCallback: "callback",
        dataType: "json",
        success: function (location) {
           
            Curlocation.innerHTML = location.city + ", " + location.state + " " + location.postal + " as of " + time;
            CurTime.innerHTML =  time;
            Curday.innerHTML = day + " " + month + " " + date + ", " + year;

        }
    });

}

function icon() {
    var etst = 'sun'
/*    let image = document.getElementsByClassName('iconimage')*/

    
    if (etst == "sun") {
        document.getElementById('current-icon'); 
        document.getElementById('current-icon').classList.add("fa-solid", "fa-sun", "fa-spin");
        document.getElementById('iconimage').classList.add("Sun");
      
    }
}






const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='6603b91c2e08bedf34942d6e0b95b6a1';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}


import cityData from "../../data/worldcities.js";

document.getElementById("searchbtn").addEventListener("click", search);

function search() {
  // grab city from user
  let input = document.getElementById("location");
  // get coords
  let loc = getCoordinatesOfCity(input.value);
  // show the map of entered city
  displayMap(loc);
}

function getCoordinatesOfCity(city) {
  //grab the coordinates of city from the city list object
  let loc = {
    lat: parseFloat(cityData[`${city}`][0].lat),
    long: parseFloat(cityData[`${city}`][0].lng),
  };
  return loc;
}
function displayMap(loc) {
  var map = L.map("map").setView([loc.lat, loc.long], 11);
  L.tileLayer(
    "https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=c54a9f81admshf1332fadb0471bep178f83jsn1f3d387e6db3",
    {
      attribution:
        'Tiles &copy: <a href="https://www.maptilesapi.com/">MapTiles API</a>, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }
  ).addTo(map);
}
// getWeatherMap();

