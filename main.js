var card = document.getElementById("xyz");

var city = ["1275339", "1850144", "5128581", "1273294", "2643743", "703448", "524901"];

var myRequest = new XMLHttpRequest();
myRequest.open('GET', "http://api.openweathermap.org/data/2.5/group?id=" + city.join(',') + "&units=metric&APPID=220a14ce06da0b6e1ec72fc14d0e59e0");
myRequest.onload = function() {

	if (myRequest.status >= 200 && myRequest.status < 400) {
		var myData = JSON.parse(myRequest.responseText);
		renderHTML(myData);
	} else {
		console.log("We connected to the server, but it returned an error.");
	}

};

myRequest.send();

function renderHTML(data){
	var htmlString="";
	for(i=0; i<city.length;i++){
		var iconCode = data.list[i].weather[0].icon;
		var icon = "http://openweathermap.org/img/wn/" + iconCode + ".png";
		htmlString += 
		`<div class="card">
		<h3>${data.list[i].name}</h3>
		<img src="${icon}"/>
		<div>Country : ${data.list[i].sys.country}</div>
		<div>Temperature : ${data.list[i].main.temp} °C</div>
		<div>Humidity : ${data.list[i].main.humidity} % </div>
		<div>Wind Speed : ${data.list[i].wind.speed} m/s</div>
		</div>`;
	}
	card.insertAdjacentHTML('beforeend', htmlString);
}