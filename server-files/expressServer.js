//Import Express framework
const express = require("express");
let app = express();
let fs = require("fs");
const {fork} = require("child_process");

// Declare host type and port number
const host = "localhost";
const port = 8000;

// Import body-parser to fetch POST request body
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import timeZone JavaScrpit files to fetch weather data
const timeZoneModules = require("../Assets/nodeJs/timeZone.js");
let filePath = "/index.html";

// Fetch current Directory path
let parentDirectory = process.cwd();

/* Render the HTML page
 * Display the index.html page =>Page name valid
 * For invalid page name => Display 404.html page */
if (fs.existsSync(parentDirectory + filePath)) {
  app.get("/", function (req, res) {
    res.sendFile(parentDirectory + filePath);
  });
  app.use(express.static(parentDirectory));
} else {
  app.get("/", function (req, res) {
    res.sendFile(parentDirectory + "/404.html");
  });
  app.use(express.static(parentDirectory));
}

/* Handle the GET request for all cities data and timeZone
 * Convert the JSON file to string and send as response to the client */
app.get("/time-zone", (req, res) => {
  let timeZoneChildProcess = fork(process.cwd()+"/server-child-process/allTimeZone.js");
  timeZoneChildProcess.send("time-zone")
  timeZoneChildProcess.on("message",message=>res.send(message));
});

/* Handle the GET request for the city Date and Time for the selected.
 * Query URL to get city name
 * Use cityname and find the city Date and Time
 * Convert the JSON to string and send as response to the client
 */
app.get("/city-data", (req, res) => {
  let cityDataChildProcess = fork(process.cwd()+"/server-child-process/timeForOneCity.js");
  let cityName = req.query.name;
  cityDataChildProcess.send({"city":cityName})
  cityDataChildProcess.on("message",message=>res.send(message));
});

/* Handle the POST request to provide Hourly forcast for selected city.
 * Using req.body get the body contents and convert the foreCast Json into string and provide response to client as String
 */
app.post("/hourly-forecast", (req, res) => {
  let cityDTN = req.body.city_Date_Time_Name;
  let hours = req.body.hours;
  let weatherResult = req.body.weather_result;
  let hourlyForecastChildProcess = fork(process.cwd()+"/server-child-process/nextNhourForecast.js");
  hourlyForecastChildProcess.send({"cityDTN":cityDTN,"hours":hours,"weatherResult":weatherResult});
  hourlyForecastChildProcess.on("message",message=>res.send(message));
});

//Handling error when the request url is not valid
app.use(function (req, res, next) {
  res.status(404).sendFile(parentDirectory + "/404.html");
});

// Set the server listen for port and host
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
