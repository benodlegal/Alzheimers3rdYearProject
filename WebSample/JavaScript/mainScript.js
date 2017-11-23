
//1. Declaring Gloabal Variables 
//Data for the map
 var lat=0;
 var lng=0;
 var uluru; //Holds lat and lng as a latlng literal
 var map;
 var marker;

 //Data for the Geofence
 var fenceLat=0;
 var fenceLng=0;
 var fenceRadius;
 var geoFence;
	
//Data for the patient
 var patients;
 var clientName;
 
 //Counters used to print past locations to screen
 var counter = -1;
 var MAX_COUNTER = 4;
 
//2. Initialize the Firebase 

//Firebase config data
  var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
  firebase.initializeApp(config); // The initialization

  //3. Get references to the database services
  const preObject = document.getElementById('object');
  var dbRefPatient = firebase.database().ref("Patients/Patient1") // reference for the patient
  var dbRefObject = firebase.database().ref("Patients/Patient1/Location"); // reference for the patient location
  var dbRefPastLocation = firebase.database().ref("Patients/Patient1/PastLocations"); // reference for the patient past locations
  var dbRefObjectGeo = firebase.database().ref("Patients/Patient1/GeoFence"); // reference for the GeoFence
  
  dbRefObjectGeo.on('value',gotGeoMap,errData); //When the GeoFence changes go to getGeoMap
  dbRefObject.on('value',gotLocation,errData); //When the patient location changes go to onChange
  dbRefPatient.on('value',displayPatientInfo,errData);
  dbRefPastLocation.once('value',loopLocations,errData);
  
 // Getting the signed in user
 var activeUser; // This is where the user will be stored
 firebase.auth().onAuthStateChanged(function(user) { //when a users state changes, this function is called
	 
	//If the user can be found
	if (user) {
		activeUser = user; 
		var email = activeUser.email; //Getting the users email 
		document.getElementById("displayWelcome").innerHTML="Hello, "+email+"."; //Displays a welcome message to the user, with their email
	} 
	//If the user cant be found, activeUser is set to null
	else {
		activeUser = null;  
	}
});
  
  //When the user wants to change the geo fence, this function is called
  document.getElementById("updateFence").onclick = function(){
	  location.assign("newGeoFence.html");
  };
  
  //When the user wants to log out, this function is called
  document.getElementById("logOut").onclick = function(){
	  firebase.auth().signOut(); //logs out user
	  window.location.replace("SignIn.html"); //go back to signIn screen
  }
  
  //This function initializes the map
  function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15, 
          center: uluru //set center of the map
        });
        marker = new google.maps.Marker({
          position: uluru, //position of the marker
          map: map
        });
		
      };

  function displayPatientInfo(snapshot){ //gets Patient data 
	var patientInfo = snapshot.val(); //get value of snapshot
	var patientName = patientInfo.Name; //get patient name
	document.getElementById("name").innerHTML=patientName; //display patient name
	var st = document.getElementById("status"); //get status element in html document
	var patientStatus = checkIfLocationValid(); //call this method to check if the patient is inside te geo fence
	//if the he/she is in the geofence 
	  if(patientStatus == true){
		  document.getElementById("status").innerHTML="Safe"; //print to the screen that he/she is safe
		  st.style.color="green";
		}
	  else{
		  st.innerHTML="Lost"; //print to the screen that he/she is safe
		  st.style.color="red";
		}
  }
  
  function checkIfLocationValid(){

	var pLat = uluru.lat; //get lat of patient
	var pLng = uluru.lng; //get lng of patient
	var gLat = geoFence.lat; //get lat of geofence
	var gLng = geoFence.lng; //get lng of geofence
	var x = new google.maps.LatLng({lat:pLat, lng:pLng}); //x coordinate (patient)
	var y = new google.maps.LatLng({lat:gLat, lng:gLng}); //y coordinate(geofence)
	var distance = google.maps.geometry.spherical.computeDistanceBetween(x,y); //distance between x and y
	
	//if distance greater than fence radius, the patient is outside the geofence
	if(distance>fenceRadius){
		return false;
	}
	else 
		return true;
}
  
  /*function onGeoChange(){
	  dbRefObjectGeo.once('value', gotGeoMap,errData);
  }*/
  
  // creates and returns a GeoFence objects with data to create a geo fence
  function gotGeoMap(snapshot){
	geoData = snapshot.val(); //get geomap data from snapshot
	fenceLat = geoData.lat; //get lat of fence
	fenceLng = geoData.lng; //get lng of fence
	fenceRadius = geoData.radius; //get radius of fence
	
	//turn fence lat/lng to floats
	fenceLat = parseFloat(fenceLat); 
	fenceLng = parseFloat(fenceLng);
	
	//pass a latlng oject into the geofence variable 
	geoFence = {lat:fenceLat, lng:fenceLng};
	geoMap(); //go to geomap function
  }
  
  //Creates a circle to represent the geoFence
  function geoMap(){
	var cityCircle = new google.maps.Circle({
      strokeColor: '#99c0ff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#99c0ff',
      fillOpacity: 0.35,
      map: map,
      center: geoFence,
      radius: fenceRadius
    });
	
  };
    
// Called when there's a change in the patients location
  /*function onChange(){
		dbRefObject.once('value', gotLocation, errData);
	}*/
	
function gotLocation(snapshot){ //called when the location of patient changes 
	var data = snapshot.val(); // get data from sanpshot
	locationParse(data); //parse the data from snapshot
	updateMap(); //update the map
};

function locationParse(locData){
	lat = locData.lat; //get patient lat
	lng = locData.lng; //get patient lng

	//turn lat/lng to floats
	lat = parseFloat(lat);
    lng = parseFloat(lng);
	
	//create a latlng object
	uluru = {lat:lat,lng:lng};
}

  function updateMap(){
	  pastLocationsUpdate(); //add previous location to list of past locations 
	  map.setCenter(uluru); //set center of the map
      marker.setPosition(uluru); //set position of marker
	  checkIfLocationValid(); //check if the patient is in the geofence
	  getAddress(); //get address of location in english 
	  //writeToPath(); //
  };
  


/*function writeToPath(){
	var p = document.getElementById("path");
	p.innerHTML = marker.getPosition();
}*/

var JSONrequest = new XMLHttpRequest(); 
function getAddress(){
	var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyCaCRlJoJoo8eUMEH0lykgdSQfeRPN_yFg";
	JSONrequest.open("GET",url,true) //make json request
	JSONrequest.send(); //send request
}

JSONrequest.onreadystatechange = function() { //when JSONrequest changes this fuction is called
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText); //parse JSON data 
        parseAddress(data);//this function is called to parse the data
    }
}

function parseAddress(data){
	var locationAddress = data.results[0].formatted_address; //get address from data
	document.getElementById("location").innerHTML=locationAddress; //print address to the screen
}

function loopLocations(snapshot){
	var data = snapshot.val();
	document.getElementById("L0").innerHTML=data.L0.lat+" "+data.L0.lng;
	document.getElementById("L1").innerHTML=data.L1.lat+" "+data.L1.lng;
	document.getElementById("L2").innerHTML=data.L2.lat+" "+data.L2.lng;
	document.getElementById("L3").innerHTML=data.L3.lat+" "+data.L3.lng;
	document.getElementById("L4").innerHTML=data.L4.lat+" "+data.L4.lng;
}

function pastLocationsUpdate(){ //this function handles past locations 
	if(counter == 0){ //if counter is at 0, print to Location 1
		firebase.database().ref("Patients/Patient1/PastLocations/L0").update({lat:lat ,lng:lng});
		document.getElementById("L0").innerHTML=lat+" "+lng;
	}
	else if(counter == 1){ //if counter is at 1, print to Location 2
		firebase.database().ref("Patients/Patient1/PastLocations/L1").update({lat:lat ,lng:lng});
		document.getElementById("L1").innerHTML=lat+" "+lng;
	}
	else if(counter == 2){ //if counter is at 2, print to Location 3
		firebase.database().ref("Patients/Patient1/PastLocations/L2").update({lat:lat ,lng:lng});
		document.getElementById("L2").innerHTML=lat+" "+lng;
	}
	else if(counter == 3){ //if counter is at 3, print to Location 4
		firebase.database().ref("Patients/Patient1/PastLocations/L3").update({lat:lat ,lng:lng});
		document.getElementById("L3").innerHTML=lat+" "+lng;
	}
	else if(counter == 4){ //if counter is at 4, print to Location 5
		firebase.database().ref("Patients/Patient1/PastLocations/L4").update({lat:lat ,lng:lng});
		document.getElementById("L4").innerHTML=lat+" "+lng;
	}
		
	//reset if counter is equal or greater than the MAX_COUNTER
	if(counter<MAX_COUNTER)
		counter++;
	else
		counter = 0;
	
	console.log("counter: "+counter);
}

function errData(err){
    console.log("error");
}