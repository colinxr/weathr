document.addEventListener('DOMContentLoaded', function(){

  let key = 'db55c1d42642ef65aff9ac8f322f3b44',
     form = document.getElementById('form'),
    input = document.getElementById('formLocation'),
 forecast = document.querySelector('.forecast'),
  fiveDay = document.querySelector('.forecast__five-day'),
      btn = document.querySelector('.btn__forecast');

  form.addEventListener('submit', submitForm, false);

  btn.addEventListener('click', getForecast, false);

  function submitForm(e){

    e.preventDefault();

    reset();

    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&units=metric&appid=' + key; //open weather map api

    //XMLHttpRequest
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status === 200){

          let result = JSON.parse(xhr.responseText);

          let temp = result.main.temp;
          let roundTemp = Math.round(temp); //Converts temp into round number for easier reading

          let humidity = result.main.humidity;
          let wind = result.wind.speed;
          let desc = result.weather[0].description;

          let icon = result.weather[0].icon;
          let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"; //uses icon code to generate img src from openweather. Kinda crummy icons but oh well.

          let d = new Date();
          let date = d.toDateString();

          document.querySelector('.title').textContent = input.value + ' ' + roundTemp + ' C';
          document.querySelector('.date').textContent = date;
          document.querySelector('.description').textContent = desc;
          document.querySelector('.icon').setAttribute('src', iconUrl);
          document.querySelector('.wind').textContent = 'Wind: ' + wind + ' km/h';
          document.querySelector('.humidex').textContent = 'Humidity: ' + humidity + '%';

          toggle(forecast);

        } else {
          console.log('an error occured');
        }
      }
    }

    xhr.open('GET', url);

    xhr.send(null);

  };

  function getForecast(e){

     e.preventDefault();

     let url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + input.value + '&units=metric&appid=' + key;

     //XMLHttpRequest
     let xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function(){
       if (xhr.readyState === 4){
         if (xhr.status === 200){

           let result = JSON.parse(xhr.responseText); // what does this do

           let arr = result.list.slice(1, result.list.length - 1); //result.list is a full seven day forecast. With .Slice() we remove the first and the last item in the array to get our proper five-day forecast

           arr.forEach(function (day, i){ // for each day in arr, get information and write it to dom

             let t = new Date(arr[i].dt * 1000); //arr[i].dt is a Unix TimeStamp,

             let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
             let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; //arrays to iterate over to generate strings for proper dates. could also use moment.js

             let d = week[t.getDay()];
             let dd = t.getDate();
             let mm = month[t.getUTCMonth()];

             let date = d + ', ' + mm + ' ' + dd;

             let temp = arr[i].temp.max;
             let roundTemp = Math.round(temp); //Converts temp into round number for easier reading

             let desc = arr[i].weather[0].description;

             let icon = arr[i].weather[0].icon;
             let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

             let card = document.createElement('div');
             card.setAttribute('class', 'card card__five-day');

             document.querySelector('.five-days').appendChild(card);

             let cardHtml = '<p class="date__five-day">' + date + '</p><img class="info__icon__one icon" src="' + iconUrl + '"><h2 class="temp__five-day">' + roundTemp + 'C</h2><p class="desc__five-day">' + desc + '</p>'

             card.innerHTML = cardHtml;

           });

         } else {
           console.log('Bummer, man! Something went wrong 😓');
         }
       }
     }

     xhr.open('GET', url);

     xhr.send(null);

     toggle(fiveDay);

     btn.removeEventListener('click', getForecast);

  };

  function toggle(el){ // if element is hidden, make it display block

    if (el.style.display == 'none' ){
      el.style.display = 'block';
      el.classList.add('animated', 'bounceIn'); //add in animate.css classes
    }

  }

  function reset(){

    if (forecast.classList.contains('animated')){// if .forecase block has already been on screen, hide it and remove animate.css class names
      forecast.style.display = 'none';
      forecast.classList.remove('animated', 'bounceIn');
    }

    if (fiveDay.style.display != 'none'){ // if five day forecast is on screen, hide it, remove animations, delete child cards and make sure the event handler is added to the get forecast button.
      btn.addEventListener('click', getForecast, false);
      fiveDay.style.display = 'none';
      fiveDay.classList.remove('animated', 'bounceIn');

      document.querySelector('.five-days').innerHTML = ''; // deletes child cards form

    } else {
      return false;
    }
  }

}, false);
