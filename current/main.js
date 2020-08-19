var btn = document.getElementById("sub");

btn.addEventListener("click", function(){
	showPosition();
})

function showPosition() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lati = position.coords.latitude;
			var longi = position.coords.longitude;
			var myRequest = new XMLHttpRequest();
			myRequest.open('GET', "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&units=metric&APPID=220a14ce06da0b6e1ec72fc14d0e59e0");
			myRequest.onload = function() {

				if (myRequest.status >= 200 && myRequest.status < 400) {
					var myData = JSON.parse(myRequest.responseText);
					renderHTML(myData);
				} else {
					console.log("We connected to the server, but it returned an error.");
				}
			};
			myRequest.send();
		});
	} else {
		alert("Sorry, your browser does not support HTML5 geolocation.");
	}
}

function renderHTML(data){
	var htmlString="";
	var iconCode = data.weather[0].icon;
	var icon = "http://openweathermap.org/img/wn/" + iconCode + ".png";
	htmlString = 
	`<div class="card">
	<h3>${data.name}</h3>
	<img src="${icon}"/>
	<div>Country : ${data.sys.country}</div>
	<div>Temperature : ${data.main.temp} °C</div>
	<div>Humidity : ${data.main.humidity} % </div>
	<div>Wind Speed : ${data.wind.speed} m/s</div>
	</div>`;

	document.getElementById("xyz").innerHTML = htmlString;
}
