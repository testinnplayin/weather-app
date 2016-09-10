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
    $('.main-content').css({"background": choosePic(weather), "background-size": "cover"});
  }

  function choosePic(weather) {
    var pic = '';
    if (weather >= 200 && weather <= 232) {
      pic = "url('http://inapcache.boston.com/universal/site_graphics/blogs/bigpicture/stormy_07_23/s01_4321599.jpg') no-repeat center";
      return pic;
    } else if (weather >= 300 && weather <= 321) {
      pic = "url('http://www.discoverwalks.com/blog/wp-content/uploads/2016/06/rain-in-paris-big.jpg') no-repeat center";
      return pic;
    } else if (weather >= 500 && weather <= 531) {
      pic = "url('http://www.metoffice.gov.uk/media/image/d/n/light_rain.jpg') no-repeat center";
      return pic;
    } else if (weather >= 600 && weather <= 622) {
      pic = "url('https://usodep.blogs.govdelivery.com/files/2014/01/Winter-snow-flakes-winter-22231260-1149-768_large.jpg') no-repeat center";
      return pic;
    } else if (weather === 741) {
      pic = "url('http://dreamatico.com/data_images/fog/fog-2.jpg') no-repeat center";
      return pic;
    } else if (weather === 721) {
      pic = "url('http://www.dyna-nutrition.com/wp-content/uploads/2015/09/Haze-of-independence.jpg') no-repeat center";
      return pic;
    } else if (weather === 771) {
      pic = "url('https://icons.wxug.com/data/wximagenew/n/novembergale/1360-800.jpg') no-repeat center";
      return pic;
    } else if (weather === 781 || weather === 900) {
      pic = "url('http://modernsurvivalblog.com/wp-content/uploads/2013/04/tornado-myths.jpg') no-repeat center";
      return pic;
    } else if (weather === 800) {
      pic = "url('http://feelgrafix.com/data_images/out/15/899342-sunny-day-pictures.jpg') no-repeat center";
      return pic;
    } else if (weather >= 801 && weather <= 803) {
      pic = "url('http://www.stockpholio.net/index/view/image/8673702726_8.jpg') center no-repeat";
      return pic;
    } else if (weather === 804) {
      pic = "url('http://www.stockpholio.net/index/view/image/8673702726_8.jpg') center no-repeat";
      return pic;
    } else if (weather >= 901 && weather <= 906 || weather >= 957 && weather <= 962) {
      pic = "url('http://media.istockphoto.com/photos/3d-illustration-of-warning-sign-with-exclamation-mark-picture-id489038680?k=6&m=489038680&s=170667a&w=0&h=zJMLpn7RDt_l8LN2pwzP5LGeAcgG3Lf_BS5E5RgRotM=' no-repeat center)";
      return pic;
    } else {
      pic = "url('http://bernews.com/weather/wp-content/uploads/2013/08/weather-avi-generic-6-sun1.jpg') no-repeat center";
      return pic;
    }
  }


});
