import { WeatherData } from "../Weather";

const getCurrentHourWeather = (weatherData: WeatherData) => {
  const now = new Date();
  const currentHour = now.getHours();

  const currentHourIndex = weatherData.hourly.time.findIndex(
    (time) =>
      time.getDate() === now.getDate() &&
      time.getMonth() === now.getMonth() &&
      time.getFullYear() === now.getFullYear() &&
      time.getHours() === currentHour
  );

  if (currentHourIndex !== -1) {
    return {
      time: weatherData.hourly.time[currentHourIndex],
      temperature2m: Math.round(
        weatherData.hourly.temperature2m[currentHourIndex]
      ),
      relativeHumidity2m: Math.round(
        weatherData.hourly.relativeHumidity2m[currentHourIndex]
      ),
      dewPoint2m: Math.round(weatherData.hourly.dewPoint2m[currentHourIndex]),
      windSpeed10m: Math.round(
        weatherData.hourly.windSpeed10m[currentHourIndex]
      ),
      windSpeed80m: Math.round(
        weatherData.hourly.windSpeed80m[currentHourIndex]
      ),
      surfacePressure: Math.round(
        weatherData.hourly.surfacePressure[currentHourIndex]
      ),
      weatherCode: weatherData.hourly.weatherCode[currentHourIndex],
    };
  } else {
    return undefined;
  }
};

export default getCurrentHourWeather;
