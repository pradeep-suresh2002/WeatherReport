//Import custom package for weather data
const weatherData = require("weather-data-api");

/* Create a response for the hourly-forecast child process
* Sends the nextNhour temp as response */
process.on("message",(data)=>{
    const nextNhourTemp = weatherData.nextNhoursWeather(data.cityDTN, data.hours, data.weatherResult);
    let nHourForeCastResponse = JSON.stringify(nextNhourTemp);
    process.send(nHourForeCastResponse);
    process.exit();
})