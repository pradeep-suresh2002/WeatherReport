//Import custom package for weather data
const weatherData = require("weather-data-api");

/* Create a response for the timezone child process
* Sends the allTimeZone as response */
process.on("message",(data)=>{
    if (data=="time-zone"){
        const citiesTimeZone = weatherData.allTimeZones();
        process.send(citiesTimeZone);
        process.exit();
    }

});