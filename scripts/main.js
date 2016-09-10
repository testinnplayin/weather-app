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
        var tempF = Math.floor(((data.main.temp - 278) * (9 / 5)) + 32);

        $('#degrees-c').addClass('active');
        $('#local-t').after("<p>" + tempC + " &#8451</p>"); //make this into a function
        $('#local-t').next().attr('id', 't');

        $('#degrees-f').on('click', function(e) {
          e.preventDefault; //refactor into a function
          $('#degrees-c').removeClass('active'); //refactoring do $(button).not(this).removeClass('active');
          $(this).addClass('active');
          $('#t').empty().html("<p>" + tempF + " &#8457</p>");
        });

        $('#degrees-c').on('click', function(e) {
          e.preventDefault;
          $('#degrees-f').removeClass('active');
          $(this).addClass('active');
          $('#t').empty().html("<p>" + tempC + " &#8451<p>");
        });

      }).fail(function(err) {
        $('#local-t').after("<p>" + err + "</p>");
      });
  });

});
