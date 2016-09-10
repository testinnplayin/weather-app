//This is the main scripts file for the weather app. Has code that affects the main page.
//Author: Rachelle Wood, 2016

$(document).ready(function() {
  //temperature will display in degrees C by default so C button will be active at load
  $('#degrees-c').addClass('active');

  $.getJSON('http://ip-api.com/json').done(function(json) { //get location from ip-api.com at load
    var city = json.city;
    var state = json.region;
    var lat = json.lat;
    var lon = json.lon;
    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon
      + '&APPID=bf0fe568c59a5a8fe4c5f34d400d53a1';

    $('#local').after("<p>Location: " + city + ", " + state + "</p>");

    getWeather(weatherURL); //retrieves weather from weather API
  }).fail(function(err) {
    $('#local').after("<p>Oops, something went wrong: " + err + "</p>");
  });

  function getWeather(weatherURL) {
    $.getJSON(weatherURL).done(function(data) {
        var tempC = Math.floor(data.main.temp - 273);
        var tempF = Math.floor(((data.main.temp - 273) * (9 / 5)) + 32);
        var cloud = data.weather[0].description;
        //display temperature in degrees C by default
        $('#local-t').after("<p>" + tempC + " &#8451</p>");
        $('#local-t').next().attr('id', 't');
        $('#t').after("<p>" + cloud + "</p>");

        showF(tempF);
        showC(tempC);

      }).fail(function(err) {
        $('#local-t').after("<p>" + err + "</p>");
      });
  }

  function showDeg(e) {
    e.preventDefault;
    $('button').not(this).removeClass('active');
    $(this).addClass('active');
  }

  function showC(tempC) {
    $('#degrees-c').on('click', function(e) {
      showDeg(e);
      $('#t').empty().html("<p>" + tempC + " &#8451<p>");
    });
  }

  function showF(tempF) {
    $('#degrees-f').on('click', function(e) {
      showDeg(e);
      $('#t').empty().html("<p>" + tempF + " &#8457</p>");
    });
  }


});
