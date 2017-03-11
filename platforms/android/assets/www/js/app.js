// App logic.
window.myApp = {};

document.addEventListener('init', function (event) {
    var page = event.target;

    // Each page calls its own initialization controller.
    if (myApp.controllers.hasOwnProperty(page.id)) {
        myApp.controllers[page.id](page);
    }

});


var firstMap = false;
var firstProfile = false;
document.addEventListener("show", function (event) {
    if (event.target.id == "reward" && !firstMap) {
        firstMap = true;
        var mymap = L.map('mapid').setView([47.3893396, 8.5184537], 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            id: 'mapbox.streets'
        }).addTo(mymap);

        L.marker([47.3893396, 8.5184537]).addTo(mymap);

        var polygon = L.circle([47.3893396, 8.5184537], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 500,
        }).addTo(mymap);

        polygon.setStyle({weight: 1});
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [22, 20],
                iconAnchor: [0, 0],
                popupAnchor: [0, 0]
            }
        });
        var shop = new LeafIcon({iconUrl: 'icons/shop.png'});

        L.marker([47.38822, 8.51722], {icon: shop}).addTo(mymap).bindPopup("Shop1");
        L.marker([47.38924, 8.51422], {icon: shop}).addTo(mymap).bindPopup("Shop2");
        L.marker([47.38722, 8.51824], {icon: shop}).addTo(mymap).bindPopup("Shop3");
        L.marker([47.39031, 8.52017], {icon: shop}).addTo(mymap).bindPopup("Shop4");

    } else if (event.target.id == "profile" && !firstProfile) {
        firstProfile = true;
        var w = 150,
            h = 150;

        var colorscale = d3.scale.category10();

//Legend titles
        var LegendOptions = ['Shopping preferences'];

//Data
        var d = [
            [
                {axis: "Casual Clothing", value: 0.59},
                {axis: "Sport Clothing", value: 0.56},
                {axis: "Business Clothing", value: 0.42},
                {axis: "Electronics", value: 0.34},
                {axis: "Groceries", value: 0.48},
                {axis: "Coffee, Bakery", value: 0.14}
            ]
        ];

//Options for the Radar chart, other than default
        var mycfg = {
            w: w,
            h: h,
            maxValue: 0.6,
            levels: 6,
            ExtraWidthX: 300
        }

//Call function to draw the Radar chart
//Will expect that data is in %'s
        RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

        var svg = d3.select('#body')
            .selectAll('svg')
            .append('svg')
            .attr("width", w + 300)
            .attr("height", h)

//Create the title for the legend
        var text = svg.append("text")
            .attr("class", "title")
            .attr('transform', 'translate(90,0)')
            .attr("x", w - 70)
            .attr("y", 10)
            .attr("font-size", "12px")
            .attr("fill", "#404040");

//Initiate Legend
        var legend = svg.append("g")
                .attr("class", "legend")
                .attr("height", 100)
                .attr("width", 200)
                .attr('transform', 'translate(90,20)')
            ;
//Create colour squares
        legend.selectAll('rect')
            .data(LegendOptions)
            .enter()
            .append("rect")
            .attr("x", w - 65)
            .attr("y", function (d, i) {
                return i * 20;
            })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
                return colorscale(i);
            })
        ;
//Create text next to squares
        legend.selectAll('text')
            .data(LegendOptions)
            .enter()
            .append("text")
            .attr("x", w - 52)
            .attr("y", function (d, i) {
                return i * 20 + 9;
            })
            .attr("font-size", "11px")
            .attr("fill", "#737373")
            .text(function (d) {
                return d;
            })
        ;
    } else if (event.target.id == "camera") {
        alert("camera");
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true // iOS
            }
        );
    }
}, false);