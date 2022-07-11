


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





