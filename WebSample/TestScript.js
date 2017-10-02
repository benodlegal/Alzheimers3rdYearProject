
 // Initialize Firebase
 
 var lat=0;
 var lng=0;
 var uluru;
 var map;
 var marker;
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
  var dbRefObject = firebase.database().ref("Clients");
  dbRefObject.on('value',gotData,errData);
  //dbRefObject.on('value', snap => console.log(snap.val()));
 
  function initMap() {
        uluru = {lat, lng};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      };
  
  
  function updateMap(){
	  map.setCenter(uluru);
      marker.setPosition(uluru);
  };
  

  function getLocation(){
    firebase.database().ref("Clients").once('value', gotData, errData);
  };
    

function gotData(data){
    var clients = data.val();
    var keys = Object.keys(clients);
    var k = keys[0];
    lat = clients[k].Location.lat;
    lng = clients[k].Location.lng;
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    console.log(lat,lng);
    uluru = {lat,lng};
    updateMap();
	//initMap();
};

function errData(err){
    console.log("error");
};
   // add stuff to databse
    /*var ref = firebase.database().ref();
	var s = ref.child("Ayy").set("lmao");*/ 
  
  // maps api key AIzaSyCaCRlJoJoo8eUMEH0lykgdSQfeRPN_yFg