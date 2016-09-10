//This is the main scripts file for the weather app. Has code that affects the main page.
//Author: Rachelle Wood, 2016

$(document).ready(function() {

  $.getJSON('http://ip-api.com/json', function(json) {
    var city = json.city;
    var state = json.region;
    var lat = json.lat;
    var lon = json.lon;
    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon
      + '&APPID=bf0fe568c59a5a8fe4c5f34d400d53a1';
    $('#local').after("<p>Location: " + city + ", " + state + "</p>");
    $.getJSON(weatherURL).done(function(data) {
        var tempC = Math.floor(data.main.temp - 278);
        $('#local-t').after("<p>" + tempC + "</p>");
      }).fail(function(err) {
        $('#local-t').after("<p>" + err + "</p>");
      });
  });

});
