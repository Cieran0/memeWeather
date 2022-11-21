var x;
var lat =0;
var long =0;
let temp = 0;
window.onload = function() {
    //getLocation();
}

function loadLocation() {
    getLocation();
}

function readLocation() {
    lat = document.getElementById("lat").value;
    long = document.getElementById("long").value;
}

function run() {
    document.getElementById("img").alt = "Loading image...";
    readLocation();
    let address = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ lat +"%2C" + long + "?unitGroup=uk&key=GXNC3Q45BZ22QAS9HW2UEFEBC&contentType=json"
    fetch(address)
        .then((response) => response.json())
        .then((data) => doThing(data));
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }
  
function doThing(data) {
    temp = data.currentConditions.temp;
    let address = "https://api.geoapify.com/v1/geocode/reverse?lat="+lat + "+&lon=" + long + "&apiKey=ef504b318a2047a289d9e8d0a50cbb4f";
    fetch(address)
    .then((response) => response.json())
    .then((data) => doSecondThing(data));
}

function doSecondThing(data) {
    console.log(data);
    data = data.features[0].properties;
    string = ((data.city != undefined)? data.city : data.county) + ", " + data.country;
    meme = "Bear-Grylls";
    if(temp < 10) meme = "Bear-Grylls"; 
    else if(temp < 20) meme = "Arrogant-Rich-Man";
    else meme = "This-Is-Fine"
    document.getElementById("img").src = "http://apimeme.com/meme?meme="+meme+"&top=When+the+weather+is&bottom=+"+temp+"+degrees in " + string;
}

function setPosition(position) {
    console.log(position);
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    document.getElementById("lat").value = lat;
    document.getElementById("long").value = long;
}