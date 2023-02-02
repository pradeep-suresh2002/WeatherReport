//Import neccessary functions from other JavaScript files
import { DateTime } from "./dateTime.js";
import { getPostValue,fetchTimeZones } from "../../weather-data/weatherAPI.js";
var userSelect = document.getElementById("city-name");
console.log(userSelect.value);
//Creates a class for SixHourWeathrForeCast and it extends DateTime class
export class SixHourWeatherForeCast extends DateTime {
  // Creates constructor function
  constructor(city) {
    super(city);
    this.cityApi = userSelect.value;
    this.cityPresentTime = this.timeDisplay()[0];
    this.cityCurrentMeridiem = this.timeDisplay()[1];
    this.cityCurrentTemperature = "";
    // console.log(this.cityCurrentTemperature);
    this.foreCastSixHourTemp = this.temperatureData(city);
    
    
    // console.log(this.foreCastSixHourTemp);
  }

  // Creates a function to get foreCast time and meridiem
  currentTime() {
    let presentTime = this.cityPresentTime;
    let currentMeridiem = this.cityCurrentMeridiem;
    let timeArray = [];
    let meredianArray = [];
    let timeForecast = parseInt(presentTime, 10);
    if (timeForecast === 12 && currentMeridiem == "PM") {
      for (let i = 1; i < 6; i++) {
        timeArray.push(i);
        meredianArray.push("PM");
      }
    }
    if (timeForecast === 12 && currentMeridiem == "AM") {
      for (let i = 1; i < 6; i++) {
        timeArray.push(i);
        meredianArray.push("AM");
      }
    }
    if (timeForecast !== 12) {
      for (let i = 1; i < 6; i++) {
        let timeForecast = parseInt(presentTime, 10);
        if (Math.sign(timeForecast + i - 12) === 0 && currentMeridiem == "PM") {
          timeArray.push(12);
          meredianArray.push("AM");
        }
        if (Math.sign(timeForecast + i - 12) === 0 && currentMeridiem == "AM") {
          timeArray.push(12);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === -1 &&
          currentMeridiem === "AM"
        ) {
          timeArray.push(timeForecast + i);
          meredianArray.push("AM");
        } else if (
          Math.sign(timeForecast + i - 12) === -1 &&
          currentMeridiem === "PM"
        ) {
          timeArray.push(timeForecast + i);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === 1 &&
          currentMeridiem == "AM"
        ) {
          timeArray.push(timeForecast + i - 12);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === 1 &&
          currentMeridiem == "PM"
        ) {
          timeArray.push(timeForecast + i - 12);
          meredianArray.push("AM");
        }
      }
    }
    for (let i=0;i<timeArray.length+1;i++){
      if (i==0){
          document.getElementsByClassName("time-item")[i].innerHTML ="NOW";
      }
      else{
      document.getElementsByClassName("time-item")[i].innerHTML = timeArray[i-1]+meredianArray[i-1];
      }
  }
  }

  /** Creates a function to get temperature data of selected city
   * @returns Array of Temperature
   */
  async temperatureData() {
    let obj1 = new DateTime(this.city);
    let cityDataArray = await obj1.fetchCityArray();
    for (let i=0;i<cityDataArray.length;i++){
      if (cityDataArray[i].cityName == this.cityApi){
        this.cityCurrentTemperature = cityDataArray[i].temperature;
      }
    };
    
    let cityName = this.city;
    let currentTemp = this.cityCurrentTemperature;
    let tempArray = [];
    tempArray = await getPostValue(this.cityApi);
    return [currentTemp, tempArray];
  }

  /**
   * Creates a function to forecast temperature of selected city
   * @returns array for ForeCast temperature
   */
  async forecastTemperature() {
    
    
    let forecastArray = [];
    let cityName = this.city;
    let sixHourTempData = await this.foreCastSixHourTemp;
    console.log(sixHourTempData);
    let currentTemp = sixHourTempData[0].split("°");
    currentTemp = currentTemp[0];
    forecastArray.push(currentTemp);
    let secondHourTemp = sixHourTempData[1][0].split("°");
    secondHourTemp = secondHourTemp[0];
    forecastArray.push(secondHourTemp);
    let thirdHourTemp = sixHourTempData[1][1].split("°");
    thirdHourTemp = thirdHourTemp[0];
    forecastArray.push(thirdHourTemp);
    let fourthHourTemp = sixHourTempData[1][2].split("°");
    fourthHourTemp = fourthHourTemp[0];
    forecastArray.push(fourthHourTemp);
    let fifthHourTemp = sixHourTempData[1][3].split("°");
    fifthHourTemp = fifthHourTemp[0];
    forecastArray.push(fifthHourTemp);
    let sixthHourTemp = sixHourTempData[1][4].split("°");
    sixthHourTemp = sixthHourTemp[0];
    forecastArray.push(sixthHourTemp);
    for (let i = 0; i < forecastArray.length; i++) {
      document.getElementsByClassName("precipitation-item")[i].innerHTML =
        forecastArray[i];
    }
    return forecastArray;
  }

  // Creates a function to display foreCast temperature icon
  async weatherIconForecast() {
    let tempArray = [];
    let foreCastTempArray = [];

    tempArray =  await this.forecastTemperature();
    for (let i = 0; i < tempArray.length; i++) {
      foreCastTempArray[i] = parseInt(tempArray[i], 10);
    }
    let source = "";
    for (let i = 0; i < foreCastTempArray.length; i++) {
      if (foreCastTempArray[i] < 18) {
        source = "/Assets/hmtlCss/weatherIcons/rainyIcon.svg";
      }
      if (foreCastTempArray[i] >= 18 && foreCastTempArray[i] < 23) {
        source = "/Assets/hmtlCss/weatherIcons/windyIcon.svg";
      }
      if (foreCastTempArray[i] >= 23 && foreCastTempArray[i] < 30) {
        source = "/Assets/hmtlCss/weatherIcons/cloudyIcon.svg";
      }
      if (foreCastTempArray[i] > 29) {
        source = "/Assets/hmtlCss/weatherIcons/sunnyIcon.svg";
      }

      document.getElementsByClassName("weather-icons")[i].src = source;
    }
  }
}
