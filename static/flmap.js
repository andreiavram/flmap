let button = document.getElementById("addButton")

button.addEventListener("click", function (e) {
    console.log("I was clicked");
    window.location.href = "/addGulguta";
})

let mymap = L.map('fl_map').setView([46.06549996715349, 23.570670843267617], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieWV0aWJhbGF1cnUiLCJhIjoiY2tqMnl6cWZwNWJ0aDJycWo4ZG41YjNtciJ9.IkhU0PgtFeEYaslj78WO1A'
}).addTo(mymap);

var gulgutaIcon = L.icon({
    iconUrl: 'static/fl_marker.png',
    shadowUrl: 'static/fl_marker.png',

    iconSize: [25, 41],
    shadowSize: [0, 0],
    iconAnchor: [12, 40],
    shadowAnchor: [19, 60],
    popupAnchor: [0, -20]
});

var marker = L.marker([46.06549996715349, 23.570670843267617]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

var popup = L.popup();
var photoImg = '<img src = "https://yeti.albascout.ro/blog/wp-content/uploads/2020/10/DJI_0730-825x510.jpg" width="150px">';

function onMapClick(e) {
    popup.setLatLng(e.latlng)
        .setContent("<center>Photo</center>" + "<br />" + photoImg)
        .openOn(mymap);
}

marker.on('click', onMapClick);

function display_on_map(data, map) {
    data.forEach(function (e) {
        var m = L.marker([e.geo_long, e.geo_lat], {icon: gulgutaIcon}).addTo(map);
        m.bindPopup("Gulguța de la <strong>" + e.name + "</strong><br />" + "<img class='popup_img' src='" + e.photo + "' />");
    })
}

fetch("http://127.0.0.1:8000/api/gulgute/").then(response => response.json()).then(data => display_on_map(data, mymap));