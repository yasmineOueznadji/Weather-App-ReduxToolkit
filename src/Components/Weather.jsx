import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="search" />
        <img src={search_icon} alt="search-icon" />
      </div>
      <img src={clear_icon} alt="" className="weather-icon" />
      <p className="temperature">20°c</p>
      <p className="location">Algeria</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity_icon" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind_icon" />
          <div>
            <p>3.6 km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
