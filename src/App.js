import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);

  // useEffect to call api to get weather data for toronto
  useEffect(() => {
    axios({
      // URL with api key and query for Toronto
      url: "http://api.openweathermap.org/data/2.5/forecast?appid=ef789d33883afc2c00eb596fd81b40cd&q=toronto",
      params: {
        // To ensure metric units
        units: "metric"
      },
    }).then((res) => {
      // Saving the weather data to a var
      const weatherResults = res.data.list;
      console.log(res.data.list);
      // Store the API results to the weather state
      setWeather(weatherResults);
    });
  }, []);

  return (
    <div>
      {/* Mapping over weather to be able to access data */}
      {weather.map( (temp, key) => {
        // console.log(temp.main);
        console.log(temp.weather[0].icon);
        // Returning the data so we can see it on page
        return (
          <div>
            <h1>
              <Moment format="ddd MMMM DD, hh:mm A" unix>
                {temp.dt}
              </Moment>
            </h1>
            <p>{temp.main.feels_like} Degrees Celsius</p>
            <img
              src={`http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`}
              alt={temp.weather[0].description}
            />
          </div>
        );
      })}
    </div>

  )
}

export default App;



// Create an application that gives you the 5-day weather forecast for the City of Toronto, CANADA.
// This test should take about 2-3 hours.

// Acceptance Criteria
// Users should be able to view the 5-day weather forecast for the City of Toronto (from
// OpenWeather API).
// Users should be able to view the 5-day forecast (today’s and the next 4 days’). Example, if today
// is July 10th, then we should see the forecast from July 10-14th.
// The API by default returns a 5-day, 3-hour forecast.
// Each list item should feature the following details:
// ● Day (or date)
// ● Temperature (in degrees celsius)
// ● Icon or image representing weather conditions
// ○ Use any icon library you like. An example would be Erik Flower’s weather icons.
