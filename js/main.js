$(document).ready(function(){

  var key = 'db55c1d42642ef65aff9ac8f322f3b44';
  var input = $('input[name=location]');

  $('#form').submit(function(e){

    // checks if forecast__five-day is on screen, and if yes, does some things.
    reset();

    var city = input.val();

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + key; //open weather map api

    $.getJSON(url, function(res){

      var temp = res.main.temp;
      var roundTemp = Math.round(temp); //Converts temp into round number for easier reading

      var humidity = res.main.humidity;
      var wind = res.wind.speed;
      var desc = res.weather[0].description;

      var icon = res.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"; //uses icon code to generate img src from openweather. Kinda crummy icons but oh well.

      var d = new Date();
      var date = d.toDateString();

      $('h2').text(city + ' ' + roundTemp + ' C');
      $('.date').text(date);
      $('.description').text(desc);
      $('.icon').attr('src', iconUrl);
      $('.wind').text('Wind: ' + wind + ' km/h');
      $('.humidex').text('Humidity: ' + humidity + '%');

      toggle($('.forecast')); // changes display none to display block

    })

    e.preventDefault();

  });

  $('.btn__forecast').click(function(e){

    var city = input.val();

    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&appid=' + key;

    $.getJSON(url, function(res){

      var arr = res.list.slice(1, res.list.length-1);   //res.list is a full seven day forecast. With .Slice() we remove the first and the last item in the array to get our proper five-day forecast

      $.each(arr, function(i, v){

          var t = new Date(arr[i].dt * 1000); //arr[i].dt is a Unix TimeStamp,

          var week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
          var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //arrays to iterate over to generate strings for proper dates. could also use moment.js

          var day = week[t.getDay()];
          var dd = t.getDate();
          var mm = month[t.getUTCMonth()];

          var date = day + ', ' + mm + ' ' + dd;

          var temp = arr[i].temp.max;
          var roundTemp = Math.round(temp); //Converts temp into round number for easier reading

          var desc = arr[i].weather[0].description;

          var icon = arr[i].weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

          var card = ['<div class="card card__five-day"><p class="date__five-day">', date, '</p><img class="info__icon__one icon" src="', iconUrl, '"><h2 class="temp__five-day">', roundTemp, ' C</h2><p class="desc__five-day">', desc, '</p></div>'];

          $('.five-days').append(card.join('')); // joins card Array into string and pushes to the DOM within the .five-days div. .join('') gets around .Append()'s desire to automatically close html tags.

      });

    });

    toggle($('.forecast__five-day')); // changes display none to display block

    $('.btn__forecast').prop('disabled', true); //disables button, keeps user from generating more than one five day forecasts.

    e.preventDefault();
  });

})

function toggle(el){
  if ($(el).css('display') == 'none' ){
    $(el).css('display', 'block').addClass('animated bounceIn');
  }
}

function reset(){
  if ($('.forecast__five-day').css('display') == 'block'){
    $('.btn__forecast').prop('disabled', false);; //re-enables the get forecast button
    $('.forecast__five-day').css('display', 'none'); //hides the five day forecast div
    $('.card__five-day').remove(); //clears the five day forcast cards from the DOM
  } else {
    return false;
  }
}
