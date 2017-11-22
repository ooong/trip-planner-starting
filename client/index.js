const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuYWFpbWFuMjM4IiwiYSI6ImNqYTl1cDlldTBseDkycW82bm13a3FxYWsifQ.o2CE-csMPO6TgB9kWSRd6A';

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

fetch("/api") //how does the index.js file know to listen on port 3000?
.then(function (result) {
  result.json()
.then(function (data) {
  console.log(data)
  const option = document.createElement("option");
  option.className = "hotel-option";
  option.append(data[0][0].name);
  document.getElementById("hotels-choices").append(option);


})
.catch(console.error)
})



