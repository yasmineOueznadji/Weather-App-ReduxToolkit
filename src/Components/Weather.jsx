import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  Fragment,
} from "react";

import Alert from "react-bootstrap/Alert";
import "./Weather.css";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const Weather = () => {
  const apiKey = import.meta.env.VITE_APP_ID;

  const [weatherData, setWeatherData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setmessageError] = useState(false);
  
  const inputRef = useRef();

  const allIcons = useMemo(
    () => ({
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": cloud_icon,
      "03n": cloud_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13n": snow_icon,
      "13d": snow_icon,
    }),
    []
  );

  const search = useCallback(
    async (city) => {
      if (city === "") {
        console.log("im here", city);
        setmessageError('Enter a City Name');
        setShowAlert(true);
        return;
      }

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if(!response.ok){
          setmessageError(data.message);
        setShowAlert(true);
        }
        const icon = allIcons[data.weather[0].icon];
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [apiKey, allIcons]
  );

  useEffect(() => {
    search("Algiers");
  }, [search]);

  return (
    <Fragment>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>You got an error!</Alert.Heading>
          <p>
            {messageError}
          </p>
        </Alert>
      )}
    {weatherData ? (
      <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="search" ref={inputRef} />
        <img
          src={search_icon}
          alt="search-icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="weatherIcon" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity_icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind_icon" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>):<p>Loading...</p>
    }
      
    </Fragment>
  );
};

export default Weather;
