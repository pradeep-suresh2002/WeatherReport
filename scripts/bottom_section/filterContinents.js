//Importing JSON data
import { cityDataObject } from "../top_section/dateTime.js";
//Importing necessary functions from other files
import { jsonKeysFetch } from "../top_section/main.js";

// Fetch json feys from the the JSON file
let jsonKeys = jsonKeysFetch();

//Declare an empty array to store city data
let cityContinentNameArray = [];
export let asContAsTemp = [];
export let asContDsTemp = [];
export let dsContAsTemp = [];
export let dsContDsTemp = [];

// Creates a class named FilterContinents to filter continents for Bottom section
export class FilterContinents {
  /** Creates a function to filter necessary data from JSON file using json keys
   * @param {Array} jsonKeys consists of array of json keys for each cities
   * Pushes each city cityName, temperature, humidity, contientName and json key to the cityNameArray
   */
  filterContinentName(jsonKeys) {
    cityContinentNameArray.push([
      cityDataObject[jsonKeys].cityName,
      parseInt(cityDataObject[jsonKeys].temperature.split("°")[0]),
      cityDataObject[jsonKeys].humidity,
      cityDataObject[jsonKeys].timeZone.split("/")[0],
      jsonKeys,
    ]);
  }

  /** Creates a function to sort two elements in an array to sort in alphabetical order
   * @param {array} a => cityContinentName array from index i is passed.
   * @param {*} b => cityContinentName array from index i+1 is passed.
   *  If both continent name is equal @returns 0
   * Else if a continent < b continent @returns -1
   * Else @returns 1
   */
  compareSecondColumn(a, b) {
    if (a[3] === b[3]) {
      return 0;
    } else {
      return a[3] < b[3] ? -1 : 1;
    }
  }

  /** Creates a function to sort same continent name arrays based on ascending temperature value
   * @param {array} a => cityContinentName array from index i is passed.
   * @param {*} b => cityContinentName array from index i+1 is passed.
   *  If both continent name => if a continent < b continent @returns -1
   * Else @returns 1
   */
  asContinentAsTemp(a, b) {
    if (a[3] == b[3]) {
      return a[1] < b[1] ? -1 : 1;
    }
  }

  /** Creates a function to sort same continent name arrays based on descending temperature value
   * @param {array} a => cityContinentName array from index i is passed.
   * @param {*} b => cityContinentName array from index i+1 is passed.
   *  If both continent name => if a continent > b continent @returns -1
   * Else @returns 1
   */
  asContinentDsTemp(a, b) {
    if (a[3] == b[3]) {
      return a[1] > b[1] ? -1 : 1;
    }
  }
}

let filterContinentObj = new FilterContinents();

/** Map function used to call the filterContinentName function
 * Map function used to iterate each json file element.
 */
jsonKeys.map(filterContinentObj.filterContinentName);

/* Sort function is used to sort based on alphabetical order*/
cityContinentNameArray.sort(filterContinentObj.compareSecondColumn);
// console.log(cityContinentNameArray);

// Shallow copy of cityContinentName array.
asContAsTemp = [...cityContinentNameArray];
asContDsTemp = [...cityContinentNameArray];

// Sorting the array in Ascending continentName and Ascending Temperature value
asContAsTemp.sort(filterContinentObj.asContinentAsTemp);

// Sorting the array in Ascending continentName and Descending Temperature value
asContDsTemp.sort(filterContinentObj.asContinentDsTemp);

// Sorting the array in Descending continentName and Ascending Temperature value
dsContAsTemp = [...asContDsTemp];
dsContAsTemp.reverse();

// Sorting the array in Descending continentName and Descending Temperature value
dsContDsTemp = [...asContAsTemp];
dsContDsTemp.reverse();
