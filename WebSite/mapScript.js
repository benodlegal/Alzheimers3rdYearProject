var uluru;
var x=0;
var y=0;
var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
  firebase.initializeApp(config);

	var dbRefObject = firebase.database().ref("Patients");
	dbRefObject.on('value',onChange,errData);
  
function initMap() {
        console.log(uluru);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
		//marker.setDraggable(true);
      };
	  
function onChange(snapshot){
	var locData = snapshot.val();
	
	lat = locData.Patient1.Location.lat;
	lng = locData.Patient1.Location.lng;
	
	lat = parseFloat(lat);
    lng = parseFloat(lng);
	
	uluru = {lat:x, lng:y};
	console.log(uluru);
}

function errData(){
	
}