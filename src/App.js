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
        units: "metric",
      },
    }).then((res) => {
      // Saving the weather data to a var
      const weatherResults = res.data.list;

      // Store the API results to the weather state
      setWeather(weatherResults);
    });
  }, []);

  return (
    <div className="wrapper">
      {/* Mapping over weather to be able to access data */}
      {weather.map( (temp, key) => {
        // Returning the data so we can see it on page
        return (
          <div className="weather">
            <h1>
              {/* Using moment to format date */}
              <Moment format="ddd MMMM DD, hh:mm A" unix>{temp.dt}</Moment>
            </h1>
            {/* Weather api has built in icons, using their feature to use the weather icon value to get the appropriate weather icon */}
            {/* https://openweathermap.org/weather-conditions */}
            <img
              src={`http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`}
              alt={temp.weather[0].description}
            />
            {/* Rounding temp */}
            <p>{Math.round(temp.main.feels_like)} °C</p>
          </div>
        );
      })}
    </div>
  )
}

export default App;
