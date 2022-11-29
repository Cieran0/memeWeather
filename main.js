var x;
var lat =0;
var long =0;
let temp = 0;
window.onload = function() {
    setAll("");
}

function setAll(string) {
    document.getElementById("long").value = string;
    document.getElementById("lat").value = string;
    document.getElementById("loc").value = string;
}

function readLocation() {
    lat = document.getElementById("lat").value;
    long = document.getElementById("long").value;
}

function setCoords(data) {
    data = data.features[0].properties;
    document.getElementById("lat").value = data.lat;
    document.getElementById("long").value = data.lon;
}   

function getCoordsFromLocation() {
    let loc = document.getElementById("loc").value;
    if(loc.length < 1) {
        alert("Location is empty");
        return;
    }
    document.getElementById("lat").value = "Loading...";
    document.getElementById("long").value = "Loading...";
    let address = "https://api.geoapify.com/v1/geocode/search?text="+loc.replace(",","+2c+").replace(" ","%20")+"&apiKey=ef504b318a2047a289d9e8d0a50cbb4f";
    fetch(address).then((response) => response.json()).then((data) => setCoords(data));
}

function run() {
    document.getElementById("img").src = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";
    readLocation();
    if(lat.length < 1 || long.length < 1) {
        alert("Coordinates are empty");
        return;
    }
    document.getElementById("img").alt = "Loading image...";
    
    let address = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ lat +"%2C" + long + "?unitGroup=uk&key=GXNC3Q45BZ22QAS9HW2UEFEBC&contentType=json"
    fetch(address)
        .then((response) => response.json())
        .then((data) => loadMeme(data));
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert("Error: cannot get location!");
    }
}
  
function loadMeme(data) {
    temp = data.currentConditions.temp;
    meme = "Bear-Grylls";
    if(temp < 10) meme = "Bear-Grylls"; 
    else if(temp < 20) meme = "Arrogant-Rich-Man";
    else meme = "This-Is-Fine"
    document.getElementById("img").src = "http://apimeme.com/meme?meme="+meme+"&top=When+the+weather+is&bottom=+"+temp+"+degrees in " + document.getElementById("loc").value;
}

function setLocation(data) {
    data = data.features[0].properties;
    string = ((data.city != undefined)? data.city : data.county) + ", " + data.country;
    document.getElementById("loc").value = string;
    return null;
}

function LoadLocation() {
    setAll("Loading...");
    getLocation();
}

function setPosition(position) {
    console.log(position);
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    document.getElementById("lat").value = lat;
    document.getElementById("long").value = long;
    let address = "https://api.geoapify.com/v1/geocode/reverse?lat="+lat + "+&lon=" + long + "&apiKey=ef504b318a2047a289d9e8d0a50cbb4f";
    fetch(address).then((response) => response.json()).then((data) => setLocation(data));
}