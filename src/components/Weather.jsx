import React, { useState, useRef, useEffect } from "react";
import "./weather.css";
import SearchHistory from "./SearchHistory.jsx";

// Import icons
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const cityInputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState(
    () => {
      const getSearchHistory = localStorage.getItem("searchHistory");   // 이전 검색 기록 가져오기

      return getSearchHistory ? JSON.parse(getSearchHistory) : [];   // 검색 기록이 있으면 데이터를 배열로 변환, 없으면 빈 배열 사용
    }
  );

  const api_key = `${import.meta.env.VITE_API_KEY}`; // Replace with your API key

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  };

  // Derive icon from weather data
  const getWeatherIcon = () => {
    if (!weatherData) return clear_icon;
    const iconCode = weatherData.weather[0].icon;
    return weatherIcons[iconCode] || clear_icon;
  };

  const handleSearch = async () => {
    const city = cityInputRef.current.value.trim();

    if (!city) {
      alert("Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.cod === "404") {
        alert("City not found");
        setWeatherData(null);
        return;
      }
      
      setWeatherData(data);
      setSearchHistory(prev => [...prev, city]);    // 검색한 도시를 기록 배열에 저장

    } catch (err) {
      alert("Error fetching weather data");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색 기록이 변경되면 Effect가 실행되도록 하여 localStorage의 내용을 업데이트
  useEffect(
    () => {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }, [searchHistory]
  );

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={cityInputRef}
          type="text"
          placeholder="Search"
          onKeyDown={handleKeyDown}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>

      {!weatherData && (
        <SearchHistory searchHistory={searchHistory} />
      )}

      {weatherData && (
        <>
          <img
            src={getWeatherIcon()}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="city">{weatherData.name}</p>
          <div className="details">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{Math.round(weatherData.wind.speed)} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
