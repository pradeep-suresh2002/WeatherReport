// Importing JSON file
import { cityDataObject } from "../top_section/dateTime.js";
// Importing necessary data from other files
import {
  asContAsTemp,
  asContDsTemp,
  dsContAsTemp,
  dsContDsTemp,
} from "./filterContinents.js";
import { FilterContinents } from "./filterContinents.js";
import { DateTime } from "../top_section/dateTime.js";

// Global declaration of variables for DOM selector
let continentSort = document.getElementById("continent-arrow");
let temperatureSort = document.getElementById("temperature-arrow");

/**
 * Creates a Main class for Bottom section
 * It inherits Filter Continents class
 */
class BottomSection extends FilterContinents {
  /** Creates a function to change continent arrow
   *  Onfunction function change UpArrow to downArrow and downArrow to UpArrow.
   */
  continentChangeArrow() {
    let userContinentSelect = continentSort.src;
    userContinentSelect = userContinentSelect.split("/");

    if (userContinentSelect[6] == "arrowUp.svg") {
      continentSort.src = "./Assets/hmtlCss/genralImages/arrowDown.svg";
    }

    if (userContinentSelect[6] == "arrowDown.svg") {
      continentSort.src = "./Assets/hmtlCss/genralImages/arrowUp.svg";
    }
  }

  /** Creates a function to change temperature arrow
   * On function call change UpArrow to downArrow and downArrow to upArrow
   */

  temperatureChangeArrow() {
    let userTemperatureSelect = temperatureSort.src;
    userTemperatureSelect = userTemperatureSelect.split("/");

    if (userTemperatureSelect[6] == "arrowDown.svg") {
      temperatureSort.src = "./Assets/hmtlCss/genralImages/arrowUp.svg";
    }

    if (userTemperatureSelect[6] == "arrowUp.svg") {
      temperatureSort.src = "./Assets/hmtlCss/genralImages/arrowDown.svg";
    }
  }

  /** Creates a function to sort continents based on userInput
   * Both arrows in upState => Cities Ascending order and Temperature Ascending order
   * Continent arrow Up and Temperature arrow Down => Cities Ascending order and Temperature Descending order
   * Continent arrow Down and Temperature arrow Up => Cities Descending order and Temperature Ascending order
   * Both arrows in DownState => Cities Descending order and Temperature Descending order
   */

  ContinentSortFunction() {
    let userContinentSelect = continentSort.src.split("/");
    let userTemperatureSelect = temperatureSort.src.split("/");

    if (
      userContinentSelect[6] == "arrowUp.svg" &&
      userTemperatureSelect[6] == "arrowUp.svg"
    ) {
      this.continentCards(asContAsTemp);
    } else if (
      userContinentSelect[6] == "arrowUp.svg" &&
      userTemperatureSelect[6] == "arrowDown.svg"
    ) {
      this.continentCards(asContDsTemp);
    } else if (
      userContinentSelect[6] == "arrowDown.svg" &&
      userTemperatureSelect[6] == "arrowUp.svg"
    ) {
      this.continentCards(dsContAsTemp);
    } else if (
      userContinentSelect[6] == "arrowDown.svg" &&
      userTemperatureSelect[6] == "arrowDown.svg"
    ) {
      this.continentCards(dsContDsTemp);
    }
  }

  /** Creates a function to sort temperature based on userInput
   * Both arrows in upState => Cities Ascending order and Temperature Ascending order
   * Continent arrow Up and Temperature arrow Down => Cities Ascending order and Temperature Descending order
   * Continent arrow Down and Temperature arrow Up => Cities Descending order and Temperature Ascending order
   * Both arrows in DownState => Cities Descending order and Temperature Descending order
   */
  temperatureSortFunction() {
    let userContinentSelect = continentSort.src.split("/");
    let userTemperatureSelect = temperatureSort.src.split("/");

    if (
      userContinentSelect[6] == "arrowUp.svg" &&
      userTemperatureSelect[6] == "arrowUp.svg"
    ) {
      this.continentCards(asContAsTemp);
    } else if (
      userContinentSelect[6] == "arrowUp.svg" &&
      userTemperatureSelect[6] == "arrowDown.svg"
    ) {
      this.continentCards(asContDsTemp);
    } else if (
      userContinentSelect[6] == "arrowDown.svg" &&
      userTemperatureSelect[6] == "arrowUp.svg"
    ) {
      this.continentCards(dsContAsTemp);
    } else if (
      userContinentSelect[6] == "arrowDown.svg" &&
      userTemperatureSelect[6] == "arrowDown.svg"
    ) {
      this.continentCards(dsContDsTemp);
    }
  }

  /** Creates a function to populate grid elements.
   * @param {Array} userSelectArray consists of cityName, temperature, humidityValue, timeZone, jsonKey
   * Time is updated every millisecond using setInterval.
   * On event change of again to other arrow change the interval of timer is cleared using clearInterval
   */
  continentCards(userSelectArray) {
    document.getElementById("bottomBody").replaceChildren();
    for (let i = 0; i < 12; i++) {
      let name = userSelectArray[i][4];
      let zone = cityDataObject[userSelectArray[i][4]].timeZone;

      let continentCard = `              <div class="continent-1">
            <!--Continent 1 name-->
            <div class="continent--name">
                <p>${userSelectArray[i][3]}</p>
            </div>
            <div class="continent--temp">
                <p>${userSelectArray[i][1]}<span>&#176</span>C</p>
            </div>
            <div class="continent--city">
                <span>${userSelectArray[i][0]}, <span> <span id ="time${i}"></span>
            </div>
            <div class="continent--humid">
                <img src="./Assets/hmtlCss/weatherIcons/humidityIcon.svg" alt="Humidity">
                <p class="humid-pose">${userSelectArray[i][2]}</p>
            </div>
        </div> `;
      document.getElementById("bottomBody").innerHTML += continentCard;
      let cityTime = setInterval(
        bottomMainObj.displayGridTime,
        1,
        zone,
        `time${i}`
      );
      continentSort.addEventListener("click", function () {
        clearInterval(cityTime);
      });
      temperatureSort.addEventListener("click", function () {
        clearInterval(cityTime);
      });
    }
  }

  /** Creates function to display live time in the bottom grid
   * @param {String} zone gives the timeZone for each city.
   * @param {String} id  gives the id for each cities, used to manipulate the live time for each city.
   * Updates live time using DOM manipulator
   */

   displayGridTime(zone, id) {
    let cityName = zone.split("/");
    cityName = cityName[1];
    cityName = cityName.split("_").join("");
    cityName = cityName.toLowerCase();
    let bottomTimeObj = new DateTime(cityName);
    let dispTime = bottomTimeObj.setZone();
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
}

/** Creates a event listener for continent arrow click event
 * Calls function to change arrow state
 * Calls function to sort cities based on user select
 */
let bottomMainObj = new BottomSection();
continentSort.addEventListener("click", () => {
  bottomMainObj.continentChangeArrow();
  bottomMainObj.ContinentSortFunction();
});

/** Creates a event listener for temperature arrow click event
 * Calls function to change arrow state
 * Calls function to sort cities based on user select
 */
temperatureSort.addEventListener("click", () => {
  bottomMainObj.temperatureChangeArrow();
  bottomMainObj.temperatureSortFunction();
});

/** Browser OnLoad function
 * Creates a function for browser onload.
 * Calls continentCards funcion for DOM manipulton.
 * Default display ascending order of continents with temperature in ascending order.
 */
let browserDefaultLoad = (function () {
  bottomMainObj.continentCards(asContAsTemp);
})();
