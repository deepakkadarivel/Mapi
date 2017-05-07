var map;
var marker;
var myLatLng = {lat: 12.969405, lng: 77.559909};
var infoWindow;
var content = 'Home';
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center : myLatLng,
        zoom: 15
    });

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Home'
    });

    infoWindow = new google.maps.InfoWindow({
        content: content
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}
