import { useState } from "react";

export default async function Weather() {
  const [city, setCity] = useState("Novi Sad");

  function handleChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setCity(target.value);
  }

  async function getWeatherData(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=fb26b11c999e74ec5b65b111dd9e56dc&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  const weatherData = await getWeatherData(city);
  return (
    <>
      <input
        type="text"
        className="city"
        value={city}
        onChange={handleChange}
      />
      <i className={"weather-icon owf owf-" + weatherData.weather[0].id}></i>
      <div className="weather-error"></div>
      <div className="description-container">
        <span className="temperature">
          {Math.round(weatherData.main.temp) + "°C"}
        </span>
        <span className="weather-description"></span>
      </div>
      <div className="wind-speed">
        {"Wind speed:" + Math.round(weatherData.wind.speed) + "m/s"}
      </div>
      <div className="humidity">
        {"Humidiity: " + Math.round(weatherData.main.humidity) + "%"}
      </div>
    </>
  );
}
