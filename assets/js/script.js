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
