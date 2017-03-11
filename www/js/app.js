// App logic.
window.myApp = {};

document.addEventListener('init', function (event) {
    var page = event.target;

    // Each page calls its own initialization controller.
    if (myApp.controllers.hasOwnProperty(page.id)) {
        myApp.controllers[page.id](page);
    }

    $("#secret").click(function () {
        var modal = $('#modal');
        modal.show();

        modal.click(function () {
            this.hide();
        });
    });

});

function successShare() {
    startWin(30);

    setTimeout(function () {
        $(" #modal2").show();
    }, 2500);


    $("#modal2").click(function () {
        this.hide();
    });
}


function draw_spider_chart() {
    if (firstProfile) {
        var w = window.innerWidth / 2,
            h = window.innerHeight / 4;


        var colorscale = d3.scale.category10();

        //Legend titles
        var LegendOptions = ['Shopping preferences'];

        //Data
        var d = [
            [
                {axis: "Casual Clothing", value: 0.25},
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
    }
}

var firstMap = false;
var firstProfile = false;
document.addEventListener("show", function (event) {
    if (event.target.id == "deals" && !firstMap) {
        firstMap = true;
        var mymap = L.map('mapid').setView([47.3721001, 8.5382902], 16);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            id: 'mapbox.streets'
        }).addTo(mymap);

        L.marker([47.3721001, 8.5382902]).addTo(mymap);

        var polygon = L.circle([47.3721001, 8.5382902], {
            color: '#73dc85',
            fillColor: '#73dc85',
            fillOpacity: 0.3,
            radius: 180,
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

        L.marker([47.3721001, 8.5382902], {icon: shop}).addTo(mymap).bindPopup("Prada");
        L.marker([47.3731418, 8.5395735], {icon: shop}).addTo(mymap).bindPopup("Lacoste");
        L.marker([47.3729072, 8.5384889], {icon: shop}).addTo(mymap).bindPopup("Micheal Kors");
        L.marker([47.3724014, 8.5388109], {icon: shop}).addTo(mymap).bindPopup("Vero Moda");

    } else if (event.target.id == "profile" && !firstProfile) {
        firstProfile = true;

        draw_spider_chart();

    } else if (event.target.id == "camera") {


        if (typeof cordova !== 'undefined') {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    startWin(70);
                    setTimeout(function () {
                        $("#outfit").show();
                    }, 1200);
                },
                function (error) {
                    startWin(70);
                    setTimeout(function () {
                        $("#outfit").show();
                    }, 1200);
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
    }
}, false);
