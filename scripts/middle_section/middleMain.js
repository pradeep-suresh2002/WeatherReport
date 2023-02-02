/*Import necessary functions*/
import { cityDataObject } from "../top_section/dateTime.js";
import { FilterCity } from "../middle_section/filterCity.js";
// import { TimeDispConstructor } from "../top_section/dateTime.js";
import { DateTime } from "../top_section/dateTime.js";
import {
  sunnyCities,
  rainyCities,
  coldCities,
} from "../middle_section/filterCity.js";

/*Declare global varaibles*/
let weatherType = "";
let iconName = "";
let displayNumber = document.getElementsByClassName("number-of-city")[0];
let leftScrollImg = document.getElementById("left-scroll");
let rightScrollImg = document.getElementById("right-scroll");
let imgSrc = document.getElementById("flex-box");

/*Export required varaibles*/
export let sunnyIcon = document.getElementById("middle-icon1--size");
export let cloudIcon = document.getElementById("middle-icon2--size");
export let rainyIcon = document.getElementById("middle-icon3--size");

/** Creates a function for leftScroll Image Hover Animation
 * Change backgroundColor on MouseHover */
leftScrollImg.onmouseover = function () {
  leftScrollImg.style.backgroundColor = "rgb(128,128,128)";
};

/** Creates a function for leftScroll Image
 * Change to original state on MouseOut */
leftScrollImg.onmouseout = function () {
  leftScrollImg.style.backgroundColor = "rgb(128,128,128,0.5)";
};

/** Creates a function for rightScroll Image Hover Animation
 * Change backgroundColor on MouseHover */
rightScrollImg.onmouseover = function () {
  rightScrollImg.style.backgroundColor = "rgb(128,128,128)";
};

/** Creates a function for rightScroll Image
 * Change to original state on MouseOut */
rightScrollImg.onmouseout = function () {
  rightScrollImg.style.backgroundColor = "rgb(128,128,128,0.5)";
};

/** Create a eventListener for click event
 * Call the function ScrollLeft for leftScrollImg */
leftScrollImg.addEventListener("click", (event) => {
  scrollLeft();
});

/** Create a eventListener for click event
 * Call the function ScrollRight for rightScrollImg */
rightScrollImg.addEventListener("click", (event) => {
  scrollRight();
});

/**Creates a function for ScrollLeft
 * Scroll the flexElement by 335 pixels left */
function scrollLeft() {
  imgSrc.scrollBy(-335, 0);
}

/**Creates a function for ScrollRight
 * Scroll the flexElement by 335 pixels right */
function scrollRight() {
  imgSrc.scrollBy(335, 0);
}

//Creates a MainClass for Middle section. It inherits FilterCity Class
class MiddleMain extends FilterCity {
  /** Creates a function to fetch userInput to display number of cities
   * If the userValue is inbetween 3 to 10 => @return {number} the corresponding user entered input number
   * Else if userValue is less than 3 => @return {number} 3
   * Else if the value is greater than 10 => @return {number} 10
   */
  userInput() {
    if (displayNumber.value > 3 && displayNumber.value <= 10) {
      return displayNumber.value;
    } else if (displayNumber.value <= 3) {
      displayNumber.value = 3;
      return 3;
    } else if (displayNumber.value > 10) {
      displayNumber.value = 10;
      return 10;
    }
  }

  /** Creates a function to display time for individual cities
   * @param {string} cityName to display time
   * Fetch the timeZone from JSON file
   * Store the corresponding date and time in a variable
   * @return {Array} Array containing Hours, Minutes time and corresponding Meridiem
   */
  cityCardTimeDisplay(city, id) {
    var timezone = cityDataObject[city].timeZone;
    var date = new Date();
    const dispTime = date.toLocaleString("en-US", {
      timeZone: timezone,
    });
    var dateAndTime = dispTime;
    var timeDisp = "";
    var date = dateAndTime.split(", ");
    date = date[1];
    var hrsMins = date.split(":");
    var hrs = hrsMins[0];
    var hrsDisp = "";
    if (hrs.length == 1) {
      hrsDisp = "0" + hrs;
    } else {
      hrsDisp = hrs;
    }
    var mins = hrsMins[1];
    var sec = hrsMins[2].split(" ");
    var amIcon = document.getElementsByClassName("am-state")[0];
    let meridiem = sec[1];
    document.getElementById(id).innerHTML =
      hrsDisp + ":" + mins + " " + meridiem;
  }

  /** Creates a function to populate the individual flex cards
   * @param {Array} weatherType an array containing the cities of specified weather types
   * Add the backgroundImage for individual city
   * Add the corrsponding humidity, Precipitation, Temperature nd merdiam icon
   * Add cards upto the length of the userInput
   */
  cityIndividualCards = function (weatherType) {
    document.getElementById("flex-box").replaceChildren();
    let noOfCities;
    let len = weatherType.length;
    let userInputNumber = displayNumber.value;

    // Using Try and Catch to handle less no of cities selected by user
    try {
      if (len <= 3) {
        noOfCities = len;
      }
      else if (userInputNumber <= len) {
        noOfCities = userInputNumber;
      } 
      else {
          noOfCities = len;
      }
    } catch (error) {
      noOfCities = error;
    }

    for (let i = 0; i < noOfCities; i++) {
      let middleObj = new DateTime(weatherType[i][0]);
      let currentCityIconPath =
        "/Assets/hmtlCss/cityIcons/" + weatherType[i][0] + ".svg";
      let cityCard = `                                   <div class="city-no1" 
          style="background-image: url('${currentCityIconPath}')">
          <div class="city-no1-top">
              <div class="city-no1-name">
                  <p>${weatherType[i][4]}</p>
              </div>
              <div class="city-no1--weather">
                  <img src="./Assets/hmtlCss/weatherIcons/${iconName}.svg" alt="Sunny icon"
                      class="grid-temp-icon" style="height:2.4vw;width:2.4vw">
              </div>
              <div class="city-no1--temp">
                  <p class="city-temp-value">${
                    weatherType[i][1]
                  }<span>&#176</span>C</p>
              </div>
          </div>
          <!--City no 1 time, precipittion and humidity value-->
          <p class="city-no1-time" id ="middle-city-time${i}"></p>
          <p class="city-no1-date">${middleObj.monthDisplay()}</p>
          <div class="city-no1-condition">
              <div class="city-no1-humidIcon">
                  <img src="./Assets/hmtlCss/weatherIcons/humidityIcon.svg" alt="humidity icon">
              </div>
              <div class="city-no1-humidValue">
                  <p class="city-humid-value">${weatherType[i][2]}%</p>
              </div>
              <div class="city-no1-precipIcon">
                  <img src="./Assets/hmtlCss/weatherIcons/precipitationIcon.svg" alt="precipitation icon">
              </div>
              <div class="city-no1-precipValue">
                  <p class="city-precip-value">${weatherType[i][3]}%</p>
              </div>
          </div>
      </div>`;
      document.getElementById("flex-box").innerHTML += cityCard;

      let middleTime = setInterval(
        this.cityCardTimeDisplay(weatherType[i][0], `middle-city-time${i}`),
        100
      );
      sunnyIcon.addEventListener("click", function () {
        clearInterval(middleTime);
      });
      cloudIcon.addEventListener("click", function () {
        clearInterval(middleTime);
      });
      rainyIcon.addEventListener("click", function () {
        clearInterval(middleTime);
      });
    }
  };
}
//Creates an object for Middlemain class
let middleMainObj = new MiddleMain();

/**Creates a function for eventListener for click event for Sunny cities
 * Add the necessary CSS properties
 * Call cityIndividualCards function to populate the individual cards
 */
sunnyIcon.addEventListener("click", (event) => {
  displayNumber.value = 3;
  weatherType = "sunny";
  sunnyIcon.style.paddingBottom = "0.5vw";
  sunnyIcon.style.borderBottom = "solid  #00C0F1";
  document.getElementById("middle-icon2--size").style.borderBottom = "";
  document.getElementById("middle-icon3--size").style.borderBottom = "";
  iconName = "sunnyIcon";
  middleMainObj.cityIndividualCards(sunnyCities);
});

/**Creates a function for eventListener for click event for Cloudy cities
 * Add the necessary CSS properties
 * Call cityIndividualCards function to populate the individual cards
 */
cloudIcon.addEventListener("click", (event) => {
  displayNumber.value = 3;
  weatherType = "cold";
  cloudIcon.style.paddingBottom = "0.5vw";
  cloudIcon.style.borderBottom = "solid  #00C0F1";
  document.getElementById("middle-icon1--size").style.borderBottom = "";
  document.getElementById("middle-icon3--size").style.borderBottom = "";
  iconName = "cloudyIcon";
  middleMainObj.cityIndividualCards(coldCities);
});

/**Creates a function for eventListener for click event for Rainy cities
 * Add the necessary CSS properties
 * Call cityIndividualCards function to populate the individual cards
 */
rainyIcon.addEventListener("click", (event) => {
  displayNumber.value = 4;
  weatherType = "rainy";
  rainyIcon.style.paddingBottom = "0.5vw";
  rainyIcon.style.borderBottom = "solid  #00C0F1";
  document.getElementById("middle-icon2--size").style.borderBottom = "";
  document.getElementById("middle-icon1--size").style.borderBottom = "";
  iconName = "rainyIcon";
  middleMainObj.cityIndividualCards(rainyCities);
});

/*Creates a event listener for change event to display corresponding weathered cities*/
displayNumber.addEventListener("change", function () {
  if (weatherType === "sunny") {
    middleMainObj.cityIndividualCards(sunnyCities);
  } else if (weatherType === "cold") {
    middleMainObj.cityIndividualCards(coldCities);
  } else if (weatherType === "rainy") {
    middleMainObj.cityIndividualCards(rainyCities);
  }
});

/** Creates an IIFE function for Browser Onload
 * Show sunnyCities data
 */
var browserOnLoad = (function () {
  let middleObj2 = new MiddleMain();
  sunnyIcon.style.paddingBottom = "0.5vw";
  sunnyIcon.style.borderBottom = "solid  #00C0F1";
  iconName = "sunnyIcon";
  // console.log(middleObj2);
  middleObj2.cityIndividualCards(sunnyCities);
})();

