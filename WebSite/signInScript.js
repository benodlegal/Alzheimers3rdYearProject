
var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
firebase.initializeApp(config);

const logInBtn = document.getElementById("login");

//When log in button is clicked
logInBtn.addEventListener('click', e=>{
	var email = document.getElementById("email").value;
	var password = document.getElementById("pass").value;
	
	var promise = firebase.auth().signInWithEmailAndPassword(email, password);
	promise.catch(e=>{console.log("fuck")});
	promise.then(e=>{location.replace("main.html")});
});














/*function createUser(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("pass").value;
	
	var promise = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert(errorMessage);
		// ...
});
	location.replace("start.html");
};/*

/*function logIn(){
	
	var email = document.getElementById("email").value;
	var password = document.getElementById("pass").value;
	
	var promise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert(errorMessage);
		// ...
});*/

	//location.replace("main.html");
