/*Import JSON file*/

// import { TimeDispConstructor } from "../top_section/dateTime.js";
/* Declare global variables*/
import { cityDataObject } from "../top_section/dateTime.js";
let cityLength = document.getElementById("city-names").options.length;

let cityNameArray = [];
let currentArray = [];
let currentTemperatureValues = [];
let cityWeatherTypes = [];
let itr = 0;

/**  *Creates a array containing city names
 * Iterates throughout the length of the cities
 * Fetch the cities name from userinput
 * Convert to lowercase and push it to the cityNameArray*/
for (let i = 0; i < cityLength; i++) {
  let displayName = document.getElementById("city-names").options.item(i).value;
  displayName = displayName.toLowerCase();
  displayName = displayName.split(" ").join("");
  cityNameArray.push(displayName);
}

/*Sort the array in alphabetical order based on the cityNames*/
for (let k = 0; k < cityWeatherTypes.length; k++) {
  if (k == 0) {
    itr = 1;
  } else {
    itr = 2;
  }
  for (let i = 0; i < cityWeatherTypes[k].length; i++) {
    for (let j = i + 1; j < cityWeatherTypes[k].length; j++) {
      if (cityWeatherTypes[k][i][itr] < cityWeatherTypes[k][j][itr]) {
        let temp = cityWeatherTypes[k][i];
        cityWeatherTypes[k][i] = cityWeatherTypes[k][j];
        cityWeatherTypes[k][j] = temp;
      }
    }
  }
}

// Creates a class to filtercities
export class FilterCity {
  /** Creates a function to filter cities required values from the json file
 * @param {String} used for filtering the data from the JSON file
 * Fetch the temperature in Celcius, Humidity and Precipitation values for the corresponding city selected
 * @return {Array} an array containing the cityNames, corresponding temperature, humidity, preciptation value
 and display name for displaying in flexbox
  */
  filterCity(cityName) {
    let flexDisplayCityName = cityDataObject[cityName].cityName;
    let currentTemperature = cityDataObject[cityName].temperature.split("°C");
    currentTemperature = parseInt(currentTemperature[0], 10);
    let currentHumdity = cityDataObject[cityName].humidity.split("%");
    currentHumdity = parseInt(currentHumdity[0], 10);
    let currentPrecipitation = cityDataObject[cityName].precipitation.split("%");
    currentPrecipitation = parseInt(currentPrecipitation[0], 10);
    return [
      cityName,
      currentTemperature,
      currentHumdity,
      currentPrecipitation,
      flexDisplayCityName,
    ];
  }

  /**
   * Creates a function to check cities which are rainy
   * @param {value} an string array
   * Checks for cityNames with temperature value less than 20 degree celcicius and humdity less than 50%
   * @return {Array} array containing cities with its cityName,temperaure,humdity and displayName that satisfies the rainy condition
   */
  checkRainy(value) {
    return value[1] < 20 && value[2] >= 50;
  }

  /**
   * Creates a function to check cities which are sunny
   * @param {value} an string array
   * Checks for cityNames with temperature value greater than 29 degree celcicius and humdity less than 50%
   * @return {Array} array containing cities with its cityName,temperaure,humdity and displayName that satisfies the sunny condition
   */

  checkSunny(value) {
    return value[1] > 29 && value[2] < 50 && value[3] >= 50;
  }

  /**
   * Creates a function to check cities which are cold
   * @param {value} an string array
   * Checks for cityNames with temperature value less than or equal to 29 degree celcicius and humdity less than 50%
   * @return {Array} array containing cities with its cityName,temperaure,humdity and displayName that satisfies the cloudy condition
   */

  checkCold = function (value) {
    return value[1] >= 20 && value[1] <= 29 && value[2] > 50 && value[3] < 50;
  };
}

// Creates a object for FilterCity
let middleFilterObj = new FilterCity();

/*Call the filterCity function and push the values in currentTempertureValues array*/
for (let i = 0; i < cityNameArray.length; i++) {
  currentTemperatureValues.push(middleFilterObj.filterCity(cityNameArray[i]));
}

/**
 * Creates individual variables for each type of cities
 * Using filter function filter and store necessary cities in respective variables
 */
export var rainyCities = currentTemperatureValues.filter(
  middleFilterObj.checkRainy
);
export var sunnyCities = currentTemperatureValues.filter(
  middleFilterObj.checkSunny
);
export var coldCities = currentTemperatureValues.filter(
  middleFilterObj.checkCold
);
// console.log(rainyCities);

/**
 *
 * @param {number} a Humditiy value of city i
 * @param {number} b Humidity value of city i+1
 * @returns Sorted array based on humidity value
 */
let sortRainy = function (a, b) {
  if (a[2] === b[2]) {
    return 0;
  } else {
    return a[2] > b[2] ? -1 : 1;
  }
};

/**
 *
 * @param {number} a Precipitation value of city i
 * @param {number} b Precipitation value of city i+1
 * @returns Array of cities sorted based on the precipitation value
 */
let sortSunny = function (a, b) {
  if (a[3] === b[3]) {
    return 0;
  } else {
    return a[3] > b[3] ? -1 : 1;
  }
};

rainyCities.sort(sortRainy);
sunnyCities.sort(sortSunny);

cityWeatherTypes = [
  middleFilterObj.sunnyCities,
  middleFilterObj.coldCities,
  middleFilterObj.rainyCities,
];


