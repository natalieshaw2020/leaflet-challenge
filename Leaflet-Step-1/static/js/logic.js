var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Maps
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoidHNsaW5kbmVyIiwiYSI6ImNqaWNhdTFzdzFuam4za21sc3ZiMmN5bDEifQ.5Il8Y1QtwyMFWCa1JkDY_Q");

var grayscale = L. tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoidHNsaW5kbmVyIiwiYSI6ImNqaWNhdTFzdzFuam4za21sc3ZiMmN5bDEifQ.5Il8Y1QtwyMFWCa1JkDY_Q");

var outdoors = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoidHNsaW5kbmVyIiwiYSI6ImNqaWNhdTFzdzFuam4za21sc3ZiMmN5bDEifQ.5Il8Y1QtwyMFWCa1JkDY_Q");


var earthquakes = new L.layerGroup();


var map = L.map("map", {
    center: [
      39.5, -98.35
    ],
    zoom: 5,
    layers: [grayscale, earthquakes]
});



var overlayMaps = {
    "Earthquakes": earthquakes
};
var baseMaps = {
    "Sattellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors  
};
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);