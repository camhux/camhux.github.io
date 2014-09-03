var dropdown = document.getElementById("dropdown");
var adderButton = document.getElementById("clientadd");
var inputfield = document.getElementById("input");
var outputfield = document.getElementById("output");
var inputextras = inputfield.querySelector("[data-seq='2']")
var outputextras = outputfield.querySelector("[data-seq='2']")
var inputtweets = document.getElementsByClassName("tweet");
var outputtweets = document.getElementsByClassName("tweetout");
var transferButton = document.getElementById("transfer");
var clearButton = document.getElementById("clear");
var confirmButton = document.getElementById("confirm");

/*
function ClientField(clId) {
   this.bodyContent = document.getElementById("template").cloneNode(true);
   this.id = clId;
   this.bodyContent.id = clId;
   this.bodyContent.querySelector(".title").textContent = "Client " + String(clId); */
//}

   inputfield.addEventListener("input", function(event) {
		event.target.nextSibling.textContent = event.target.value.length;
		(event.target.value.length > 140) ? event.target.style.color = "red" : event.target.style.color = "";
	});

   document.getElementById("dropdown").addEventListener("change", function(event) {
   		if (event.target.value == 5) {
   			inputextras.setAttribute("hidden", null);
   			outputextras.setAttribute("hidden", null);
   		} else {
   			inputextras.removeAttribute("hidden");
   			outputextras.removeAttribute("hidden");
   		}
   		event.stopPropagation();
   });

transferButton.addEventListener("click", function(event) {
	transferer();
});

clearButton.addEventListener("click", function(event) {
	if (confirmButton.hasAttribute("hidden"))
		confirmButton.removeAttribute("hidden");
	else confirmButton.setAttribute("hidden", null)
});

confirmButton.addEventListener("click", function(event) {
	clear();
	confirmButton.setAttribute("hidden", null);
});



function transferer() {
	var i, infield, span;
	for (i = 1; i <= 10; i++) {
		infield = document.querySelector(".inputarea [data-tweet='" + i + "']");
		span = document.querySelector("p.tweetout [data-tweet='" + i + "']");
		span.textContent = infield.value;
	}
}

function clear() {
	var i, infield, span;
	for (i = 1; i <= 10; i++) {
		infield = document.querySelector(".inputarea [data-tweet='" + i + "']");
		span = document.querySelector("p.tweetout [data-tweet='" + i + "']");
		infield.value = null;
		span.textContent = "";
		document.getElementsByClassName("counter")[i - 1].textContent = 0;
	}
}

function addClient() {
	var newElt = new ClientField(clientcount);
	newElt.bodyContent.removeAttribute("hidden");
	document.body.insertBefore(newElt.bodyContent, document.querySelector("#transfer"));
	clientcount++;
}
