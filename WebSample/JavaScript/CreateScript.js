var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
firebase.initializeApp(config);

const createBtn = document.getElementById("create");

//When log in button is clicked
createBtn.addEventListener('click', e=>{
	var email = document.getElementById("email").value;
	var password = document.getElementById("pass").value;
	
	var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
	promise.catch(e=>{console.log("error")});
	promise.then(e=>{window.location.replace("SignIn.html")});
	
});
