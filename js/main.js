$(document).ready(function(){

  var key = 'db55c1d42642ef65aff9ac8f322f3b44';
  var location = $('input[name=location]').val();

  $('#form').submit(function(e){

    // checks if forecast__five-day is on screen, if yes, hide it.
    reset();

    var location = $('input[name=location]').val();

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=' + key;

    $.getJSON(url, function(res){

      var temp = res.main.temp;
      var humidity = res.main.humidity;
      var wind = res.wind.speed;
      var desc = res.weather[0].description;
      var icon = res.weather[0].icon;

      var roundTemp = Math.round(temp);
      var d = new Date();
      var date = d.toDateString();

      var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

      //$('.locationName').text(location);

      $('h2').text(location + ' ' + roundTemp + ' C');
      $('.date').text(date);
      $('.description').text(desc);
      $('.icon').attr('src', iconUrl);
      $('.wind').text('Wind: ' + wind + ' km/h');
      $('.humidex').text('Humidity: ' + humidity + '%');

      //multiple cities

      toggle($('.forecast'));


    })

    e.preventDefault();

  });

  $('.btn__forecast').click(function(e){

    var location = $('input[name=location]').val();

    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + '&units=metric&appid=' + key;

    $.getJSON(url, function(res){

      //remove the first item in res.list. That item is the same day as has already been displayed.

      var arr = res.list.slice(1, res.list.length-1);

      $.each(arr, function(i, v){

        // only show the five day forecast
        //if (i > 0 && i < 6){

          var t = new Date(arr[i].dt * 1000);

          var week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
          var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          var day = week[t.getDay()];
          var dd = t.getDate();
          var mm = month[t.getUTCMonth()];

          var date = day + ', ' + mm + ' ' + dd;

          var temp = arr[i].temp.max;
          var roundTemp = Math.round(temp);

          var desc = arr[i].weather[0].description;

          var icon = arr[i].weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

          var card = ['<div class="card card__five-day"><p class="date__five-day">', date, '</p><img class="info__icon__one icon" src="', iconUrl, '"><h2 class="temp__five-day">', roundTemp, ' C</h2><p class="desc__five-day">', desc, '</p></div>'];

          $('.five-days').append(card.join(''));

      //}

      });

    });

    toggle($('.forecast__five-day'));

    $('.btn__forecast').prop('disabled', true);;

    e.preventDefault();
  });

})

function toggle(el){
  if ($(el).css('display') == 'none' ){
    $(el).css('display', 'block');
  }
}

function reset(){
  if ($('.forecast__five-day').css('display') == 'block'){
    $('.btn__forecast').prop('disabled', false);; //re-enables the get forecast button
    $('.forecast__five-day').css('display', 'none'); //hides the five day forecast dive
    $('.card__five-day').remove(); //clears the fire day forcast cards from the dom
  } else {
    return false;
  }
}
