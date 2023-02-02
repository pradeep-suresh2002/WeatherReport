//Import neccessary modules
const http = require("http");
let fs = require("fs");
let path = require("path");
const url = require("url");
const querystring = require("querystring");
const { json } = require("stream/consumers");
const { checkPrimeSync } = require("crypto");

//Import timeZone JavaScript file for backend data
const timeZoneModules = require("../Assets/nodeJs/timeZone.js");

// Define host type and port number
const host = "localhost";
const port = 8000;

// Create header for HTML, CSS, JS, Image and GIF
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

//Define the HTML file path
const STATIC_PATH = path.join(process.cwd(), "./");
const toBool = [() => true, () => false];

/** Create function to render HTML file using Local host
 * @param {string} url the request url
 * @returns Object of file path
 */
const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

/** Creates function for server data for top, middle and bottom section
 * @param {object} req Request by the client
 * @param {object} res Response for the client
 */
const serverData = function (req, res) {
  let fullUrl = new URL("http://localhost:8000" + req.url);
  let pathName = fullUrl.pathname;
  let city = fullUrl.search;
  city = city.split("=")[1];

  // For display All city time zone data
  if (pathName == "/time-zone") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let cityDataJson = timeZoneModules.allTimeZones();
    cityDataJson = JSON.stringify(cityDataJson);
    res.end(cityDataJson);
  }
  // For display timeZone details for selected city
  else if (pathName == "/city-data") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let oneCityTimeZone = timeZoneModules.timeForOneCity(city);
    oneCityTimeZone = JSON.stringify(oneCityTimeZone);
    res.end(oneCityTimeZone);
  }
  //For display hourly forecast for selected city
  else if (pathName == "/hourly-forecast") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let postRequestBody = JSON.parse(body);
      let cityTDN = postRequestBody.city_Date_Time_Name;
      let hour = postRequestBody.hours;
      let weatherData = postRequestBody.weather_result;
      let nHourForeCast = timeZoneModules.nextNhoursWeather(
        cityTDN,
        hour,
        weatherData
      );
      let nHourForeCastResponse = JSON.stringify(nHourForeCast);
      res.end(nHourForeCastResponse);
    });
  }
};

/** Creates a function to call prepareFile for html file and render and write it
 * @param {object} req request by the client
 * @param {object} res response for the client
 */
let renderHtmlPage = async function (req, res) {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);
//   console.log(`${req.method} ${req.url} ${statusCode}`);
};

/**Creates the hTTP server using http module
 * Function call for the server data for top,middle and bottom section
 * Function call to render and load the HTML page
 */
let server = http.createServer((req, res) => {
  serverData(req, res);
  renderHtmlPage(req, res);
});

//Listen to the http server module
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
