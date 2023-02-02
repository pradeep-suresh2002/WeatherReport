
/** Creates a async function to fetch city Date and Time from API 
 * GET Method
 * @param {string} cityName 
 * @return {object} Object containing selected city Data and Time 
 */
async function fetchCityName(cityName){
    try{
        let fetchCity = fetch(`http://localhost:8000/city-data?name=${cityName}`);
        let res = await fetchCity;
        let output = await res.json();
        return output;
    }
    catch(error){
        console.log("Cannot fetch data. Check your network connection")
        throw error;
    }

}


/** Creates a async function to fetch the all cities data
 * @export function GET Method
 * @return {object} Object containing data of all cities from API
 */
export async function fetchTimeZones(){
    try{
        let fetchZone = fetch("http://localhost:8000/time-zone");
        let response = await fetchZone;
        let cityTimeZone = await response.json();
        return cityTimeZone;
    }
    catch(error){
        // window.alert("Cannot fetch data. Check your network connection");
        console.log("Cannot fetch data. Check your network connection")
        throw error;
        
    }

}


/** Creates a async function to get ForeCast temperature value
 * POST Method
 * @export function
 * @param {string} cityName 
 * @return {object} Selected city temperature object 
 */
export async function getPostValue(cityName){
        
    let fetchBody = fetchCityName("NewYork").then((res)=>{

        var cityDataTimeName = (Object.values(res));
        return cityDataTimeName;
        // console.log(Object.values(res));
    });
    

    try{
        let cityDataResponse = await fetchBody; 

        let response = fetchCityName(cityName);
        let citiesData = await response;
        let cityDataTime = Object.values(citiesData);
        let jsonFile = await fetchTimeZones();
        let postRequest =fetch("http://localhost:8000/hourly-forecast",
        {
            method:'POST',
            body:JSON.stringify({
                "city_Date_Time_Name": `${cityDataTime}`,
                "hours":6,
                "weather_result" : jsonFile

            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        )
        
        let cityTempResponse = await postRequest;
      
        let cityForeCastTemperature = await cityTempResponse.json();
        // cityForeCastTemperature = JSON.parse(cityForeCastTemperature);
        // console.log(typeof(cityForeCastTemperature))
        cityForeCastTemperature = cityForeCastTemperature.temperature;
        return cityForeCastTemperature;
    }
    catch(error){
        console.log("Cannot fetch data. Check your network connection");
        throw error;
    }

    
}
fetchTimeZones();




