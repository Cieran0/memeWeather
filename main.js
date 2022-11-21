var x;
var let =0;
var long =0;
let temp = 0;
window.onload = function() {
    x = document.getElementById("demo");
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
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
    string = data.city + ", " + data.country;
    document.getElementById("img").src = "http://apimeme.com/meme?meme=Bear-Grylls&top=When+the+weather+is&bottom=+"+temp+"+degrees in " + string;
}

function showPosition(position) {
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    let address = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ lat +"%2C" + long + "?unitGroup=uk&key=GXNC3Q45BZ22QAS9HW2UEFEBC&contentType=json"
    fetch(address)
        .then((response) => response.json())
        .then((data) => doThing(data));

}