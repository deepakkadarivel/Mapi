var map;
var marker;
var markers = [];
var myLatLng = {lat: 40.7713024, lng: -73.9632393};
var locations = [
    {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
    {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
    {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
    {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];
var image = './assets/pin.png';
var mapStyle = [{"featureType":"all","elementType":"labels","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-8"},{"color":"#2a2a2a"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":"0.01"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"color":"#151515"}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"color":"#151515"}]},{"featureType":"poi.attraction","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"poi.attraction","elementType":"labels.text.stroke","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b9cbe1"},{"visibility":"on"}]}];
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center : myLatLng,
        zoom: 12,
        styles: mapStyle
    });

    largeInfoWindow = new google.maps.InfoWindow();

    for (let i =0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: locations[i].location,
            title: locations[i].title,
            icon: image,
            id: i
        });
        markers.push(marker)

        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfoWindow);
        });
    }

    document.getElementById('show_list').addEventListener('click', showListings);
    document.getElementById('hide_list').addEventListener('click', hideListings);
}

function populateInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '<div>');
        infoWindow.open(map, marker)
        infoWindow.addListener('closeClick', function () {
            infoWindow.setMarker(null);
        })
    }
}

function showListings() {
    bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position)
    }
    map.fitBounds(bounds);
}

function hideListings() {
    for (let i = 0; i< markers.length; i++) {
        markers[i].setMap(null);
    }
}
