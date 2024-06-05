import { useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWeatherData, showMessageError } from "../store/weatherSlice";
import AlertBox from "../utils/Alert";
import "./Weather.css";

import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const { loading, weatherData, messageError, showAlert } = useSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchWeatherData("Algiers"));
  }, [dispatch]);

  const searchHandler = (city) => {
    if (city === "") {
      dispatch(showMessageError("Enter a City Name"));
    } else {
      dispatch(fetchWeatherData(city));
    }
  };

  return (
    <Fragment>
      {showAlert && <AlertBox messageError={messageError} />}
      <div className="weather">
        <div className="search-bar">
          <input type="text" placeholder="search" ref={inputRef} />
          <img
            src={search_icon}
            alt="search-icon"
            onClick={() => searchHandler(inputRef.current.value)}
          />
        </div>
        {loading ? (
          <p>Loading...Please Wait!</p>
        ) : (
          weatherData && (
            <Fragment>
              <img
                src={weatherData.icon}
                alt="weatherIcon"
                className="weather-icon"
              />
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
            </Fragment>
          )
        )}
      </div>
    </Fragment>
  );
};

export default Weather;
