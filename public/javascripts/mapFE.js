document.addEventListener('DOMContentLoaded', function () {

    var centerUCB = new google.maps.LatLng(37.8700,-122.2590);
    map_initialize();
    function map_initialize() {
        var mapOptions = {
            center: centerUCB, // map center
            zoom: 14, //zoom level, 0 = earth view to higher value
            panControl: true, //enable pan Control
            zoomControl: true, //enable zoom control
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL //zoom control size
            },
            scaleControl: true, // enable scale control
            mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        google.maps.event.addListener(map, 'rightclick', function (event) {
            console.log(event.latLng);

            var marker = new google.maps.Marker({
                position: event.latLng, //map Coordinates where user right clicked
                map: map,
                draggable: true, //set marker draggable
                animation: google.maps.Animation.DROP, //bounce animation
                title: "Hello World!",
                icon: "/images/icons/mini-marker-green.png" //custom pin icon
            });

            console.log(marker);
            contentString = '<div class="marker-info-win">'+
            '<div class="marker-inner-win"><span class="info-content">'+
            '<h1 class="marker-heading">'+MapTitle+'</h1>'+
            MapDesc+
            '</span><button name="remove-marker" class="remove-marker" title="Remove Marker">Remove Marker</button>'+
            '</div></div>';
        });

    }
});