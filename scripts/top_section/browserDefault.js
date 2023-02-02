//Import necessary functions from other javaScript files

import { TopSectionTemperature } from "./temperature.js";
import { DateTime } from "./dateTime.js";

//Create IIFE function for browser default onload
export let browserOnLoadValues = (async function (cityName) {
  console.log(cityName);
  let browserTimeObj = new TopSectionTemperature(cityName);
  let b = new DateTime(cityName);
  var cityChange = document.getElementById("city-name");
  document.getElementsByClassName("date-month")[0].innerHTML =  browserTimeObj.monthDisplay(cityName);
  var defaultHour = setInterval(b.timeDisplay.bind(b), 1);
  var defaultForecast = setInterval(
    browserTimeObj.currentTime.bind(browserTimeObj),
    1
  );
  browserTimeObj.weatherIconForecast();
  let tempDataDefault =await browserTimeObj.temperatureCelcius(cityName);
  document.getElementsByClassName("top-temp--value")[0].innerHTML =
    tempDataDefault[0];
  document.getElementsByClassName("top-temp--value")[1].innerHTML =
    tempDataDefault[1];
  document.getElementsByClassName("top-humidity--value")[0].innerHTML =
    browserTimeObj.temperatureHumidity();
  document.getElementsByClassName("top-humidity--value")[1].innerHTML =
    browserTimeObj.temperaturePrecipitation();
  cityChange.addEventListener("change", function () {
    clearInterval(defaultHour);
    clearInterval(defaultForecast);
  });
})("newyork");
