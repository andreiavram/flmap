let mymap = L.map('formMap').setView([46.06549996715349, 23.570670843267617], 14);

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

let markerExists = false;

function updateMarkerPos(e) {
    document.getElementById("geo_long").value = e.latlng.lng;
    document.getElementById("geo_lat").value = e.latlng.lat;
    document.getElementById("mapPoint").value = e.latlng.lat + ", " + e.latlng.lng;

}

function onMapClick(e) {
    console.log(markerExists);
    if (!markerExists) {
        let marker = new L.Marker(e.latlng, {draggable: true, icon: gulgutaIcon});
        marker.addTo(mymap);
        marker.on("drag", updateMarkerPos);
        document.getElementById("geo_long").value = e.latlng.lng;
        document.getElementById("geo_lat").value = e.latlng.lat;
        document.getElementById("mapPoint").value = e.latlng.lat + ", " + e.latlng.lng;
    }

    markerExists = true;
}

mymap.on('click', onMapClick);

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document.getElementById("file_base64").value = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

let fileUpload = document.getElementById("photo");
fileUpload.addEventListener("change", function (e) {
    console.log("uploaded file changed");
    getBase64(document.getElementById("photo").files[0]);
});

// Example POST method implementation:
async function postData(url = '', data = {}, csrf_token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token

            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let btn = document.getElementById("submitGulguta")
btn.addEventListener("click", function (e) {
    e.preventDefault();
    let btn = document.getElementById(e.target.id);
    // btn.setAttribute("disabled", true);

    let data = {
        name: document.getElementById("name").value,
        geo_long: document.getElementById("geo_long").value,
        geo_lat: document.getElementById("geo_lat").value,
        message: document.getElementById("message").value,
        photo: document.getElementById("file_base64").value,
    }

    postData('/api/gulgute/', data, getCookie("csrftoken"))
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });


    // window.location.href = "/";

})
