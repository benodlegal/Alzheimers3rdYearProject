
//Data for the map
 var lat=0;
 var lng=0;
 var uluru; //Holds lat and lng as a latlng literal
 var map;
 var marker;

 var fenceLat=0;
 var fenceLng=0;
 var fenceRadius;
 var geoFence;
	
//Used to search database(I think)
 var patients;
 var clientName;
 
// Initialize Firebase
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
  var dbRefObject = firebase.database().ref("Patients/Patient1/Location");
  var dbRefObjectGeo = firebase.database().ref("Patients/Patient1/GeoFence");
  dbRefObjectGeo.on('value',onGeoChange,errData); //When the GeoFence changes go to getGeoMap
  dbRefObject.on('value',onChange,errData); //When the patient location changes go to onChange
  
 
 /*function startUp(){
	 initMap();
	 getGeoMap();
	 maths();
	 //dbRefObject.once('value',gotGeoMap,errData);
	 };*/
 
 
  function initMap() {
        //uluru = {lat, lng};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
		marker.setDraggable(true);
      };

	  
  function onGeoChange(){
	  dbRefObjectGeo.once('value', gotGeoMap,errData);
  }
  // creates and returns a GeoFence objects with data to create a geo fence
  function gotGeoMap(snapshot){
	  
	 geoData = snapshot.val;
	
	 geoData = snapshot.val();
	 fenceLat = geoData.lat;
	 fenceLng = geoData.lng;
	 fenceRadius = geoData.radius;
	
	fenceLat = parseFloat(fenceLat);
	fenceLng = parseFloat(fenceLng);
	geoFence = {lat:fenceLat, lng:fenceLng};
	
	 /* geoMapData = {
		 geoFence,
		 fenceLat,
		 fenceLng,
		 fenceRadius
	} */
	geoMap();
	
	  
  }
  
  //Creates a circle to represent the geoFence
  function geoMap(){
	//var x = {lat:51.8968917, lng:-8.486315699999977};
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
  function onChange(){
		dbRefObject.once('value', gotLocation, errData);
		//updateMap
	}
	
function gotLocation(snapshot){
	var locData = snapshot.val();
	
	lat = locData.lat;
	lng = locData.lng;
	
	lat = parseFloat(lat);
    lng = parseFloat(lng);
	
	uluru = {lat:lat,lng:lng};
	
	/*var locationOBJ = {
		lat,
		lng,
		uluru
	}*/
	
	updateMap();
	
};

  function updateMap(){
	  map.setCenter(uluru);
      marker.setPosition(uluru);
	  checkIfLocationValid();
  };
  
function checkIfLocationValid(){

	var pLat = uluru.lat;
	var pLng = uluru.lng;
	var gLat = geoFence.lat;
	var gLng = geoFence.lng;
	var x = new google.maps.LatLng({lat:pLat, lng:pLng});
	var y = new google.maps.LatLng({lat:gLat, lng:gLng});
	var distance = google.maps.geometry.spherical.computeDistanceBetween(x,y);
	console.log(distance);
	
	if(distance>fenceRadius){
		console.log("ayyLmao");
	}
}

function printPatientInfo(){
	var x = document.getElementById("info");
	x.innerHTML=clientName;
};

function errData(err){
    console.log("error");
};

	/*console.log(geoData);
	var masterRadius = geoData.fenceRadius;
	var masterDiameter = geoData.fenceRadius*2;
	var masterCenter = geoData.geoFence;
	var distance = Math.sqrt((Math.pow(lat-geoData.fenceLat, 2))+(Math.pow(lng-geoData.fenceLng, 2)));
	console.log(distance);*/

   // add stuff to databse
    /*var ref = firebase.database().ref();
	var s = ref.child("Ayy").set("lmao");*/ 
  
  // maps api key AIzaSyCaCRlJoJoo8eUMEH0lykgdSQfeRPN_yFg
  
  
  //Spaghetti below, Bon Appetit!
  
  //initMap();
    /*patients = data.val();
    keys = Object.keys(patients);
    k = keys[0];
	clientName = patients[k].Name;
	console.log(clientName);
    lat = patients[k].Location.lat;
    lng = patients[k].Location.lng;
	document.getElementById("head").innerHTML = clientName+"s' location";
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    //console.log(lat,lng);
    uluru = {lat,lng};
    updateMap();
	printPatientInfo();
	//initMap();*/