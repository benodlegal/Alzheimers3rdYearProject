var location = {lat: -25.363, lng: 131.044};

function getLocation(){
    /*
    var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
  
firebase.initializeApp(config);

  // Get a reference to the database service
  const preObject = document.getElementById('object');
  
  const dbRefObject = firebase.database().ref().child('John');
  
  dbRefObject.on('value', snap => console.log(snap.val()));
*/
initMap();
  
}
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: location;
        });
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
}

window.onload = initMap;