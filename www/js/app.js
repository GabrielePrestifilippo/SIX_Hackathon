// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

});

document.addEventListener("show", function (event) {
  if (event.target.id == "reward") {
    var mymap = L.map('mapid').setView([47.3893396,8.5184537], 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      id: 'mapbox.streets'
    }).addTo(mymap);

    L.marker([47.3893396,8.5184537]).addTo(mymap);

    var polygon=L.circle([47.3893396,8.5184537], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: 500,
    }).addTo(mymap);

    polygon.setStyle({weight: 1});
    var LeafIcon = L.Icon.extend({
      options: {
        iconSize:     [22, 20],
        iconAnchor:   [0, 0],
        popupAnchor:  [0, 0]
      }
    });
    var shop = new LeafIcon({iconUrl: 'icons/shop.png'});

    L.marker([47.38822,8.51722], {icon: shop}).addTo(mymap).bindPopup("Shop1");
    L.marker([47.38924,8.51422], {icon: shop}).addTo(mymap).bindPopup("Shop2");
    L.marker([47.38722,8.51824], {icon: shop}).addTo(mymap).bindPopup("Shop3");
    L.marker([47.39031,8.52017], {icon: shop}).addTo(mymap).bindPopup("Shop4");
  }
}, false);