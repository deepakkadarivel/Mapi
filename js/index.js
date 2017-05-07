var map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center : {lat: -34.387, lng: 150.644},
        zoom: 8
    });
}
