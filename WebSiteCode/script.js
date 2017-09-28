var myMap
var lat;
var lng;

function getLocation() {
    var config = {
            apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
            authDomain: "alzheimers-project.firebaseapp.com",
            databaseURL: "https://alzheimers-project.firebaseio.com",
            projectId: "alzheimers-project",
            storageBucket: "alzheimers-project.appspot.com",
            messagingSenderId: "968345670861"
        };
        firebase.initializeApp(config);
        var database = firebase.database();
 
}

function start() {
    myMap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(myMap);
    addMarker();
}

function addMarker() {

    var marker = L.marker([51.5, -0.09]).addTo(myMap);

    getLocation();

}
window.onload = start;