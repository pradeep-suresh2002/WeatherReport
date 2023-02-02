//Importing the express framework
let express = require("express");
let app = express();

//Importing the fork function of child-process
let { fork } = require("child_process");

//Declaration of host and port
let port = 8000;
let host = "localhost";

//Importing the built-in method of Node JS
let fs = require("fs");

//Importing the body-parser for obtaining the body of the POST request
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Render the valid HTML page
if (fs.existsSync(process.cwd() + "/index.html")) {
  app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/index.html");
  });

  app.use(express.static(process.cwd()));
}
//Render the 404 HTML page
else {
  app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/404.html");
  });

  app.use(express.static(process.cwd()));
}

//Getting the request to respond with the city zones of all cities
app.get("/time-zone", (req, res) => {
  let childProcess1 = fork(
    process.cwd() + "/server-child-process/allTimeZone.js"
  );
  childProcess1.send({ key: "activate" });
  childProcess1.on("message", (message) => res.send(message));
});

//Getting the request to respond with the time for the selected city
app.get("/city-data", (req, res) => {
  let childProcess2 = fork(
    process.cwd() + "/server-child-process/timeForOneCity.js"
  );
  let cityName = req.query.name;
  childProcess2.send({ city: cityName });
  childProcess2.on("message", (message) => res.send(message));
});

//Getting the request to respond with the next five hours temperature
app.post("/hourly-forecast", (req, res) => {
  let cityDTN = req.body.city_Date_Time_Name;
  let hours = req.body.hours;
  let weatherResult = req.body.weather_result;
  let childProcess3 = fork(
    process.cwd() + "/server-child-process/nextNhourForecast.js"
  );
  childProcess3.send({
    cityDTN: cityDTN,
    hours: hours,
    weatherResult: weatherResult,
  });
  childProcess3.on("message", (message) => res.send(message));
});

//Listening to the server for getting the request and responding  with the required response
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

//Handling error when the request URL is not valid
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(process.cwd() + "/404.html");
});