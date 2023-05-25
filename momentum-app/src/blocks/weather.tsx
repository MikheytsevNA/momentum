import { useState, useEffect } from "react";
import {
  WeatherResponse,
  fetchWeather,
  WeatherResponseFail,
  WeatherResponseOK,
} from "./api";

export default function Weather() {
  interface WeatherData {
    icon: string;
    temp: string;
    windSpeed: string;
    humidity: string;
    error: string;
  }
  const initialWeather: WeatherData = {
    icon: "",
    temp: "",
    windSpeed: "",
    humidity: "",
    error: "Wrong city name",
  };
  const [city, setCity] = useState("Novi Sad");
  const [data, setData] = useState<WeatherResponse | null>(null);

  function handleChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setCity(target.value);
  }

  useEffect(() => {
    const getWeatherData = async (city: string) => {
      setData(await fetchWeather(city));
    };
    getWeatherData(city);
  }, [city]);

  return (
    <i>
      <input
        type="text"
        className="city"
        value={city}
        onChange={handleChange}
      />
      {data && data.success ? (
        <WeatherInfo weatherInfo={data} />
      ) : (
        <div className="weather-error">{data?.error}</div>
      )}
    </i>
  );
}

function WeatherInfo(props: { weatherInfo: WeatherResponseOK }) {
  const { icon, humidity, temp, windSpeed } = props.weatherInfo;
  return (
    <>
      <i className={"weather-icon owf " + icon}></i>
      <div className="description-container">
        <span className="temperature">Temperature: {temp}</span>
        <span className="weather-description"></span>
      </div>
      <div className="wind-speed">Wind speed: {windSpeed} m/s</div>
      <div className="humidity">Humidity: {humidity}</div>
    </>
  );
}
