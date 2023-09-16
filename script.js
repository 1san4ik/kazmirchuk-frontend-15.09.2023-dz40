import { n } from './i.js';

document.addEventListener('DOMContentLoaded', function () {
  weatherReset();
});

function weatherReset() {
  let cityName = 'vinnytsia';
  let localCityName = localStorage.getItem('cityWeather');
  if (localCityName) {
    cityName = localCityName;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ua&${n}`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      document.querySelector('.place').textContent = data.name;

      document.querySelector('.tempSpan').innerHTML =
        Math.round(data.main.temp - 273) + '&deg;';

      document.querySelector('.weatherCondition').textContent =
        data.weather[0].description;

      document.querySelector(
        '.weatherIcon'
      ).innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;

      document.querySelector(
        '.pressure'
      ).innerHTML = `Атм. тиск: ${data.main.pressure} &#13169;`;

      document.querySelector(
        '.humidity'
      ).innerHTML = `Вологість: ${data.main.humidity} &#x25;`;

      document.querySelector('.speed').innerHTML = `Шв. вітру: ${Math.round(
        data.wind.speed
      )} &#13223;`;

      document.querySelector('.deg').innerHTML = `Напрямок: ${Math.round(
        data.wind.deg
      )} &#176;`;
    })
    .catch(function (error) {
      fetchError(error);
    });
}

let reset = document.querySelector('.material-symbols-outlined');
reset.addEventListener('click', weatherReset);

let inpCity = document.querySelector('.input');
inpCity.addEventListener('input', loadCity);

function loadCity() {
  let cityName = inpCity.value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&${n}`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      let city = data[0].name;
      localStorage.setItem('cityWeather', city);
      weatherReset();
    })
    .catch(function (error) {
      fetchError(error);
    });
}

function fetchError(error) {
  console.error('Помилка запиту:', error);
}

inpCity.addEventListener('blur', function () {
  inpCity.value = '';
});
