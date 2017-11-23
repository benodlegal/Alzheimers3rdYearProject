var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
firebase.initializeApp(config);

 var activeUser = firebase.auth().currentUser;
 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	activeUser = user;
	var email = activeUser.email;
	console.log(email);
	document.getElementById("email").innerHTML=email;
  } else {
    	document.getElementById("email").innerHTML="<blank>";
  }
});

document.getElementById("emailOptions").addEventListener("click", function(){
	var container = document.getElementById("displayOptions");
	container.innerHTML=""; //Clear the div
	var email = activeUser.email;
	
	var table = document.createElement("table");
	var tableRow = document.createElement("tr");
	var tableData1 = document.createElement("td");
	var tableData2 = document.createElement("td");
	var tableData3 = document.createElement("td");
	
	var textbox = document.createElement("input"); //create textbox to be inserted
	var heading = document.createElement("h3");
	var node = document.createTextNode("Email: "+email)
	var btn = document.createElement("button");
	
	tableData1.appendChild(node);
	tableData2.appendChild(textbox);
	tableData3.appendChild(btn);
	
	tableRow.appendChild(tableData1);
	tableRow.appendChild(tableData2);
	tableRow.appendChild(tableData3);
	table.appendChild(tableRow);
	
	container.appendChild(table);
	/*heading.appendChild(node);
	container.appendChild(heading);
	container.appendChild(textbox); //insert textbox*/
	
	//document.getElementById("text").innerHTML="email options";
});

document.getElementById("nameOptions").addEventListener("click", function(){
	document.getElementById("text").innerHTML="name options";
});

document.getElementById("passwordOptions").addEventListener("click", function(){
	document.getElementById("text").innerHTML="password options";
});