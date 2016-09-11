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
        var weather = data.weather[0].id;
        //display temperature in degrees C by default
        $('#local-t').after("<p>" + tempC + " &#8451</p>");
        $('#local-t').next().attr('id', 't');
        $('#t').after("<p>" + cloud + "</p>");

        showF(tempF);
        showC(tempC);
        showPic(weather);
      }).fail(function(err) {
        $('#local-t').after("<p>" + err + "</p>");
      });
  }

  //Display functions

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

  function showPic(weather) {
    var photo = "url(" + getPic(weather) + ") no-repeat center";
    $('.main-content').css({"background": photo, "background-size": "cover"});
  }

//Dictionary function for assigning photos to specific weather id's (found on OpenWeatherMap's own site)

  function getPic (weather) {
    var stormy = 'http://inapcache.boston.com/universal/site_graphics/blogs/bigpicture/stormy_07_23/s01_4321599.jpg';
    var drizzly = 'http://www.discoverwalks.com/blog/wp-content/uploads/2016/06/rain-in-paris-big.jpg';
    var rainy = 'http://www.metoffice.gov.uk/media/image/d/n/light_rain.jpg';
    var snowy = 'https://usodep.blogs.govdelivery.com/files/2014/01/Winter-snow-flakes-winter-22231260-1149-768_large.jpg';
    var foggy = 'http://dreamatico.com/data_images/fog/fog-2.jpg';
    var hazy = 'http://www.dyna-nutrition.com/wp-content/uploads/2015/09/Haze-of-independence.jpg';
    var squally = 'https://icons.wxug.com/data/wximagenew/n/novembergale/1360-800.jpg';
    var tornadoy = 'http://modernsurvivalblog.com/wp-content/uploads/2013/04/tornado-myths.jpg';
    var sunny = 'http://feelgrafix.com/data_images/out/15/899342-sunny-day-pictures.jpg';
    var pCloudy = 'http://www.stockpholio.net/index/view/image/8673702726_8.jpg';
    var cloudy = 'http://img.wallpaperfolder.com/f/48A3E37380A7/cloudy-day-high-resolution-9aqp.jpg';
    var danger = 'http://media.istockphoto.com/photos/3d-illustration-of-warning-sign-with-exclamation-mark-picture-id489038680?k=6&m=489038680&s=170667a&w=0&h=zJMLpn7RDt_l8LN2pwzP5LGeAcgG3Lf_BS5E5RgRotM=';
    var generic = 'http://bernews.com/weather/wp-content/uploads/2013/08/weather-avi-generic-6-sun1.jpg';

    var dict = {200: stormy, 201: stormy, 202: stormy, 210: stormy, 211: stormy, 212: stormy, 221: stormy, 230: stormy, 231: stormy,
                232: stormy, 300: drizzly, 301: drizzly, 302: drizzly, 310: drizzly, 311: drizzly, 312: drizzly, 313: drizzly,
                314: drizzly, 321: drizzly, 500: rainy, 501: rainy, 502: rainy, 503: rainy, 504: rainy, 511: rainy, 520: rainy,
                521: rainy, 522: rainy, 531: rainy, 600: snowy, 601: snowy, 602: snowy, 611: snowy, 612: snowy, 615: snowy, 616: snowy,
                620: snowy, 621: snowy, 622: snowy, 741: foggy, 721: hazy, 771: squally,
                781: tornadoy, 900: tornadoy, 800: sunny, 801: pCloudy, 802: pCloudy, 803: pCloudy, 804: cloudy,
                900: danger, 901: danger, 902: danger, 903: danger, 904: danger, 905: danger, 906: danger, 957: danger, 958: danger,
                959: danger, 960: danger, 961: danger, 962: danger, 1000: generic
              };
              
      if (dict.hasOwnProperty(weather)) {
        return dict[weather];
      } else {
        return dict[1000];
      }
  }

});
