var myMap = L.map("map", {
  center: [39.5, -98.35],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: "pk.eyJ1IjoiY2hpYW15YzA5ODciLCJhIjoiY2swdzUxb3I2MGRiMzNpbnliN293OXBteiJ9.at8rk5Trv5oNH1dD2E9EAw"
}).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// magnitude radius
d3.json(queryUrl, function(data) {
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.25
  };
}
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude*4;
}
// magnitude color
  function getColor(magnitude) {
  switch (true) {
  case magnitude > 5:
    return "red";
  case magnitude > 4:
    return "darkorange";
  case magnitude > 3:
    return "#fdb72a";
  case magnitude > 2:
    return "#f7db11";
  case magnitude > 1:
    return "#dcf400";
  default:
    return "#a3f600";
  }
}

  // layer
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<b>Magnitude:</b> " + feature.properties.mag + "<br><b>Location:</b> " + feature.properties.place + "<br><b>Earthquake:</b> " + "<a href=" + feature.properties.url + ">Learn more</a>");
    }
  }).addTo(myMap);

  // legend
  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#a3f600",
      "#dcf400",
      "#f7db11",
      "#fdb72a",
      "darkorange",
      "red"
    ];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };
  legend.addTo(myMap);
});