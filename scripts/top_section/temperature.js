//Import JSON file as data

// import { TopSectionPrototype } from './weatherForcecast.js';
import { SixHourWeatherForeCast } from "./weatherForcecast.js";
import { fetchTimeZones } from "../../weather-data/weatherAPI.js";
import { DateTime } from "./dateTime.js";

var userSelect = document.getElementById("city-name");

let arr =[];

export class TopSectionTemperature extends SixHourWeatherForeCast {
  //Constructor function with argument as city name
  constructor(city) {
    super(city);
    
    // this.HumidityValue = data[city].humidity;
    // // console.log(this.HumidityValue);
    // this.PrecipitationValue = data[city].precipitation;
    this.cityApi = userSelect.value;
    this.cityTempArray = [];
    // console.log(this.PrecipitationValue);
  }


  /**
   * @param {string} cityName user selected city
   * @returns Array temperature of selected city in Celcius and Farenhiet
   */
   async temperatureCelcius(cityName) {

    // console.log(cityName);
    let tempObj = new DateTime(this.city);
    let cityDataArray = await tempObj.fetchCityArray();
    
    for (let i=0;i<cityDataArray.length;i++){
      if (cityDataArray[i].cityName == this.cityApi){
        this.cityTempArray.push([
          cityDataArray[i].temperature,
          cityDataArray[i].humidity,
          cityDataArray[i].precipitation
        ]);
      }
    };
    // console.log(cityTempArray[0]);
    let TempObj = new SixHourWeatherForeCast(cityName);
    // let tempCel = TempObj.cityCurrentTemperature;
    let tempCel = this.cityTempArray[0][0];
    
    tempCel = tempCel.replace("°", " ");
    let tempFaren = parseInt(tempCel, 10);
    tempFaren = tempFaren * (9 / 5) + 32;
    tempFaren = parseInt(tempFaren, 10);
    return [tempCel, tempFaren + " F"];

  }

  /**Creates a function to get humidity value of city
   * @returns Number humidity value
   */
   temperatureHumidity() {
    var humidity = this.cityTempArray[0][1];
    return humidity;
  }

  /** Creates a function to get precipitation value of selected city
   * @returns Number Precipitation value of the city
   */
  temperaturePrecipitation() {
    var precipitation = this.cityTempArray[0][2];
    return precipitation;
  }
}


let a = new TopSectionTemperature("nome");


