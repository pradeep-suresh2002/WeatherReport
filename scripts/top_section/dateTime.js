// Import TimeZone fetch data from weaatherAPI file
import { fetchTimeZones } from "../../weather-data/weatherAPI.js";

var secDisp = "";
var userSelect = document.getElementById("city-name");
export let cityDataObject ={};

/** Creates a async function to JSON object data using API
 * Changes the object keys to cityName */
async function fetchCityJson(){
  let data = await fetchTimeZones();
  for (let i=0;i<data.length;i++){
    cityDataObject[data[i].cityName.toLowerCase()] = data[i];
  }

}
await fetchCityJson();
console.log(cityDataObject);

// Creates a class to display Date and Time for selected city
export class DateTime {
  constructor(city) {
    this.city = city;
    this.cityApi = userSelect.value;
  }

  async fetchCityArray (){
    let cityDatas = await fetchTimeZones();
    return cityDatas;
    }
  
  async cityTimeZone(){
    let cityArray = await this.fetchCityArray();
    for (let i=0;i<cityArray.length;i++){
      if (cityArray[i].cityName == this.cityApi){

        // console.log(cityArray[i].timeZone);
        return cityArray[i].timeZone
      }
    }
  }

  /** Creates a function to display time based on Zone data
   * @returns time from Date function
   */

   setZone() {
    var timezone = cityDataObject[this.city].timeZone;
    var date = new Date();
    const dispTime = date.toLocaleString("en-US", {
      timeZone: timezone,
    });
    return dispTime;
  }

  /** Creates a function to display Date for the selected city
   * @returns Date of the selected city */
  monthDisplay() {
    var dateAndTime = this.setZone();
    var date = dateAndTime.split(", ");
    date = date[0];
    var month1 = date.split("/");
    var monthDisp = "";
    var month = month1[0];
    var monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    monthDisp = monthArray[month - 1];
    if (month1[1].length == 1) {
      return "0" + month1[1] + "-" + monthDisp + "-" + month1[2];
    }
    return month1[1] + "-" + monthDisp + "-" + month1[2];
  }

  /** Creates a function get Seconds of selected city
   * @returns seconds of a selected city*/
   secondDisplay() {
    var dateAndTime = this.setZone();
    var timeDisp = "";
    var date = dateAndTime.split(", ");
    date = date[1];
    var hrsMins = date.split(":");
    var hrs = hrsMins[0];
    var hrsDisp = "";
    hrsDisp = hrs.length == 1 ? "0" + hrs : hrs;
    var mins = hrsMins[1];
    var sec = hrsMins[2].split(" ");
    secDisp = sec[0];
    return secDisp;
  }

  /** Creates a function to display time of the selected city
   * @returns time of the selected city */
 timeDisplay =  function () {
    var dateAndTime = this.setZone();
    var timeDisp = "";
    var date = dateAndTime.split(", ");
    date = date[1];
    var hrsMins = date.split(":");
    var hrs = hrsMins[0];
    var hrsDisp = "";
    hrsDisp = hrs.length == 1 ? "0" + hrs : hrs;
    var mins = hrsMins[1];
    var sec = hrsMins[2].split(" ");
    secDisp = sec[0];
    var amIcon = document.getElementsByClassName("am-state")[0];
    var amIconpath =
      "/Assets/hmtlCss/genralImages/" + sec[1].toLowerCase() + "State.svg";
    amIcon.src = amIconpath;
    let meridiem = sec[1];
    document.getElementsByClassName("time")[0].innerHTML = hrsDisp + ":" + mins;
    document.getElementById("time--second").innerHTML =
      ":" + this.secondDisplay();
    return [hrsDisp, meridiem, mins];
  };
}
