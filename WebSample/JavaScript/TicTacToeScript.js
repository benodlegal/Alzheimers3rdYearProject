var A1;
var A2;
var A3;
var B1;
var B2;
var B3;
var C1;
var C2;
var C3;

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

var gameRef = firebase.database().ref("Patients/Patient1/Game/A1");
//var A1ref = gameRef.child()
gameRef.on('value',gotPatientTurn,errData);

function gotPatientTurn(snapshot){
	var data = snapshot.val;
}

function errData(err){
	console.log("sces")
}
   
var A1click = document.getElementById("A1");
A1click.onclick = function(){
	console.log("A1");
	A1click.innerHTML="X"
	gameRef.update("X");
}

var A2click = document.getElementById("A2");
A2click.onclick = function(){
	console.log("A2");
	A2click.innerHTML="X"
	gameRef.update({A2:"X"});
}

var A3click = document.getElementById("A3");
A3click.onclick = function(){
	console.log("A3");
	A3click.innerHTML="X"
	gameRef.update({A3:"X"});
}

var B1click = document.getElementById("B1");
B1click.onclick = function(){
	console.log("B1");
	B1click.innerHTML="X"
	gameRef.update({B1:"X"});
}

var B2click = document.getElementById("B2");
B2click.onclick = function(){
	console.log("B2");
	B2click.innerHTML="X"
	gameRef.update({B2:"X"});
}

var B3click = document.getElementById("B3");
B3click.onclick = function(){
	console.log("B3");
	B3click.innerHTML="X"
	gameRef.update({B3:"X"});
}

var C1click = document.getElementById("C1");
C1click.onclick = function(){
	console.log("C1");
	C1click.innerHTML="X"
	gameRef.update({C1:"X"});
}

var C2click = document.getElementById("C2");
C2click.onclick = function(){
	console.log("C2");
	C2click.innerHTML="X"
	gameRef.update({C2:"X"});
}

var C3click = document.getElementById("C3");
C3click.onclick = function(){
	console.log("C3");
	C3click.innerHTML="X"
	gameRef.update({C3:"X"});
}


