import { useState, useEffect } from "react";
import {
  WeatherResponse,
  fetchWeather,
  WeatherResponseFail,
  WeatherResponseOK,
} from "./api";
import { debounce } from "./debounce";
import { useDebounce } from "./use-debounce";

const debounced = debounce(fetchWeather, 300); //debouncing api

export default function Weather() {
  const [city, setCity] = useState("Novi Sad");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const debouncedCity = useDebounce(city, 300); //debouncing city

  useEffect(() => {
    const getWeatherData = async (city: string) => {
      const data = await fetchWeather(city);
      setData(data);
    };
    getWeatherData(debouncedCity);
  }, [debouncedCity]);

  function handleChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setCity(target.value);
  }

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
  const { icon, humidity, temp, windSpeed, description } = props.weatherInfo;
  return (
    <>
      <i className={"weather-icon owf " + icon}></i>
      <div className="description-container">
        <span className="temperature">{temp}</span>
        <span className="weather-description">{description}</span>
      </div>
      <div className="wind-speed">Wind speed: {windSpeed} m/s</div>
      <div className="humidity">Humidity: {humidity}</div>
    </>
  );
}
