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
 var dbRefObjectGeo = firebase.database().ref("Patients/Patient1/GeoFence");
 var btn = document.getElementById("update");
 
 btn.onclick = function updateGeoFence(){
	 console.log("hello");
	 var lat = document.getElementById('lat').value;
	 var lng = document.getElementById('lng').value;
	 
	 var latitude = parseFloat(lat);
	 var longitude = parseFloat(lng);
	 
	dbRefObjectGeo.update({lat:parseFloat(latitude), lng:parseFloat(longitude)}); 
	
 } 
	
 
