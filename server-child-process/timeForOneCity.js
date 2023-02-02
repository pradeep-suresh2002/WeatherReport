//Import custom package for weather data
const weatherData = require("weather-data-api");

/* Create a response for the cityData child process
* Sends the timeforOneCity as response */
process.on("message",(data)=>{
    const oneCityTime = weatherData.timeForOneCity(data.city);
    process.send(oneCityTime);
    process.exit();
})