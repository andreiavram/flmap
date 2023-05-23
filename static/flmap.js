let mymap = L.map('fl_map').setView([46.06549996715349, 24.870670843267617], 8);

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
    // shadowUrl: 'static/fl_marker.png',

    iconSize: [25, 41],
    shadowSize: [0, 0],
    iconAnchor: [12, 40],
    shadowAnchor: [19, 60],
    popupAnchor: [0, -20]
});

function add_to_group(data, group) {
    data.forEach(function (e) {
        var m = L.marker([e.location.position[1], e.location.position[0]], {icon: gulgutaIcon}).addTo(group);
        var d = new Date(e.start_time);
        var popupContent = `<h1>${e.title}</h1><br>`;
        popupContent += `${e.description}<br><br>`;
        popupContent += `<strong>Locul: </strong>${e.location.name}<br>`;

        if (new Date(e.start_time) < new Date()) {
            m.setOpacity(.7);
            popupContent += `<strong>A avut loc în </strong>${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
        } else {
            popupContent += `<strong>Începe pe </strong>${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
            popupContent += `de la <strong>${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}</strong><br>`;
        }

        if (e.external_link) {
            popupContent += `<br><br><a href = '${e.external_link}' target="_blank">Mai multe detalii</a>`
        }

        if (e.photo) {
            popupContent += `<br><br><img class='popup_img' src='${e.photo}' /><br>`;
        }
        m.bindPopup(popupContent);
    });
}

var pulledMarkers = L.featureGroup();
pulledMarkers.addTo(mymap);



fetch("/api/events/").then(response => response.json()).then(data => add_to_group(data, pulledMarkers));
