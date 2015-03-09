/*
insert search bar to add functionality:
 <input id="address" type="textbox" value="Berkeley, CA">
 <input type="button" value="Mark Location" onclick="codeAddress()">
 */


function codeAddress() {
    var address = document.querySelector('#address').value;
    var keyword = 'universities';
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            console.log(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: "/images/icons/mini-marker-green.png"
            });

            //return marker;
            var jsonObject = {
                name: 'school',
                keyword: 'universities',
                latLng: results[0].geometry.location
            };
            console.log(jsonObject);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/map/mapinput');
            xhr.setRequestHeader('accept', 'application/json');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var obj = JSON.parse(xhr.responseText);
                    console.log(obj);
                }
            });
            xhr.send(JSON.stringify(jsonObject));

        } else {
            alert('Geocode broke: ' + status);
        }
    });
}


/*
Display Query Results HTML:

 <div id="result-panel">
 <h1>Search Results</h1>
 <div id="results"></div>
 </div>
 */
