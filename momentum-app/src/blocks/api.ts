export type WeatherResponseOK = {
  success: true;
  icon: string;
  temp: string;
  windSpeed: string;
  humidity: string;
  description: string;
};

export type WeatherResponseFail = {
  success: false;
  error: string;
};

export type WeatherResponse = WeatherResponseOK | WeatherResponseFail;
export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=fb26b11c999e74ec5b65b111dd9e56dc&units=metric`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: "City not found",
        };
      } else if (response.status === 401) {
        return {
          success: false,
          error: "Wrong API key",
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: "Too many inquiries",
        };
      } else {
        return {
          success: false,
          error: "Oops, something went wrong.",
        };
      }
    }
    return {
      success: true,
      icon: "owf-" + result.weather[0].id,
      temp: Math.round(result.main.temp).toString() + "°C",
      windSpeed: Math.round(result.wind.speed).toString(),
      humidity: Math.round(result.main.humidity).toString() + "%",
      description: result.weather[0].description,
    };
  } catch (error) {
    console.warn(error);
    return {
      success: false,
      error: "Oops, something went wrong.",
    };
  }
}
