//Importing neccessary files
import { fetchTimeZones } from "../../weather-data/weatherAPI.js";
import { TopSectionTemperature } from "./temperature.js";
import { DateTime,cityDataObject } from "./dateTime.js";
import { SixHourWeatherForeCast } from "./weatherForcecast.js";
import { browserOnLoadValues } from "./browserDefault.js";
import { getPostValue } from "../../weather-data/weatherAPI.js";

//Adding city names to the array
let cityLength = document.getElementById("city-names").options.length;
let jsonKeys = [];

/** Creates function to fetch Jsonkeys from API data
 * @return {Object} Object containing city names 
 */
export function jsonKeysFetch() {
  jsonKeys = Object.keys(cityDataObject);
  return Object.keys(cityDataObject);
}
jsonKeysFetch();

// Changing  object to array
export let formValue = [];
for (let i = 0; i < jsonKeys.length; i++) {
  formValue[i] = cityDataObject[jsonKeys[i]].cityName;
}


/**
 * @param {string} a formValue[i] 
 * @param {string} b formValue[i+1]
 * @return {string} sorted string 
 */
let sortForm = function (a,b){
  if (a[0]== b[0]){
    return 0;
  }
  else{
    return a[0] < b[0] ?-1:1
  }
}
formValue.sort(sortForm);
var str = "";
for (var i = 0; i < formValue.length; ++i) {
  str += '<option value="' + formValue[i] + '" />';
}
let formOption = document.getElementById("city-names");
formOption.innerHTML = str;
let cityNameArray = formValue;


//Selecting input file to get the user selected option
 var refresh = document.getElementById("city-name");


//Async function for top section
var topSection = async function () {
  
  var s = "";
  if (cityNameArray.includes(refresh.value)) {
    //Coverting the options value into json format
    var displayName = refresh.value.toLowerCase();

    displayName = displayName.split(" ").join("");
    //Declaring city icon for user options
    let iconPath = "/Assets/hmtlCss/cityIcons/" + displayName + ".svg";
    var cityicon = document.getElementsByClassName("city-icon--top")[0];
    cityicon.src = iconPath;
    var topMainObj = new TopSectionTemperature(displayName);

    console.log(displayName);

    //Display selected city date
    console.log( topMainObj.monthDisplay(displayName))
    document.getElementsByClassName("date-month")[0].innerHTML =  topMainObj.monthDisplay(displayName);

    var d = new Date();
    topMainObj.weatherIconForecast();
    //Display temperature,humidity, precipiation values.
    let temperatureData = await topMainObj.temperatureCelcius(displayName);
    console.log(temperatureData)
    document.getElementsByClassName("top-temp--value")[0].innerHTML =
      temperatureData[0];
    document.getElementsByClassName("top-temp--value")[1].innerHTML =
      temperatureData[1];
    document.getElementsByClassName("top-humidity--value")[0].innerHTML =
      topMainObj.temperatureHumidity();
    document.getElementsByClassName("top-humidity--value")[1].innerHTML =
      topMainObj.temperaturePrecipitation();
    document.getElementById("error-message").innerHTML = "";
    //Display six hour weather forecast.
    var forecastDisp = setInterval(topMainObj.currentTime.bind(topMainObj), 100);
    //Display time
    var hoursDisp = setInterval( topMainObj.timeDisplay.bind(topMainObj), 100); // document.getElementsByClassName("top-temp--value")[0].innerHTML = "NOW";

    //Clear interval to stop refresh on change of option
    refresh.addEventListener("change", function () {
      clearInterval(hoursDisp);
      clearInterval(forecastDisp);
    });
  } else {
    //Display for incorrect value entered by user.
    let iconPath = "/Assets/hmtlCss/genralImages/warning.svg";
    let cityicon = document.getElementsByClassName("city-icon--top")[0];
    cityicon.src = iconPath;
    document.getElementsByClassName("top-temp--value")[0].innerHTML = "NIL";
    document.getElementsByClassName("top-temp--value")[1].innerHTML = "NIL";
    document.getElementsByClassName("top-humidity--value")[0].innerHTML = "NIL";
    document.getElementsByClassName("top-humidity--value")[1].innerHTML = "NIL";
    document.getElementsByClassName("date-month")[0].innerHTML = "";

    document.getElementsByClassName("time")[0].innerHTML = "NIL";
    // clearInterval(topMainObj.currentTime.bind(topMainObj),1);
    document.getElementById("time--second").innerHTML = "";
    let amIcon = document.getElementsByClassName("am-state")[0];
    let amIconpath = "/Assets/hmtlCss/genralImages/warning.svg";
    amIcon.src = amIconpath;
    errorForecastDisplay();
    for (let i = 0; i < 6; i++) {
      let classNameArray = [
        "now",
        "secondHour",
        "thirdHour",
        "fourthHour",
        "fifthHour",
        "sixthHour",
      ];
      let className = "time-" + classNameArray[i] + "--weather";
      document.getElementsByClassName(className)[0].src =
        "/Assets/hmtlCss/weatherIcons/sunnyIcon.svg";
    }
    document.getElementById("error-message").innerHTML =
      "Enter the correct city";
  }
};

//Display enter function inside input box to prevent autorefresh of page
refresh.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
  }
});

//Call topSection function on change in option in datalist.
refresh.addEventListener("change", function (event) {
  topSection();
});


/**
 * Creates a function to display error
 */
function errorForecastDisplay() {
  let errorItemsTime = document.querySelectorAll(".time-item");
  errorItemsTime.forEach((element) => {
    element.innerHTML = "NIL";
  });
  let errorItemsPrecipitation = document.querySelectorAll(
    ".precipitation-item"
  );
  errorItemsPrecipitation.forEach((element) => {
    element.innerHTML = "__";
  });
}









