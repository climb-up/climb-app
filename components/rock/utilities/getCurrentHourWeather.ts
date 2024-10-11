import { WeatherData } from "../Weather"; // Assuming the WeatherData type is defined in the Weather file

const getCurrentHourWeather = (weatherData: WeatherData) => {
  const now = new Date();
  const currentHour = now.getHours();

  // Find the index that corresponds to the current hour
  const currentHourIndex = weatherData.hourly.time.findIndex(
    (time) =>
      time.getDate() === now.getDate() &&
      time.getMonth() === now.getMonth() &&
      time.getFullYear() === now.getFullYear() &&
      time.getHours() === currentHour
  );

  // If the current hour is found, return the weather data for that hour
  if (currentHourIndex !== -1) {
    return {
      time: weatherData.hourly.time[currentHourIndex],
      temperature2m: weatherData.hourly.temperature2m[currentHourIndex],
      relativeHumidity2m:
        weatherData.hourly.relativeHumidity2m[currentHourIndex],
      dewPoint2m: weatherData.hourly.dewPoint2m[currentHourIndex],
      windSpeed10m: weatherData.hourly.windSpeed10m[currentHourIndex],
      windSpeed80m: weatherData.hourly.windSpeed80m[currentHourIndex],
    };
  } else {
    // If no data for the current hour is found, return undefined or handle the error
    return undefined;
  }
};

export default getCurrentHourWeather;
