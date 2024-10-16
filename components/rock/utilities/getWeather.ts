import { fetchWeatherApi } from "openmeteo";

const getWeather = async (
  rockLatitude: string | undefined,
  rockLongitude: string | undefined
) => {
  const params = {
    latitude: rockLatitude,
    longitude: rockLongitude,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "dew_point_2m",
      "wind_speed_10m",
      "wind_speed_80m",
      "surface_pressure",
      "weather_code",
    ],
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly()!;

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      dewPoint2m: hourly.variables(2)!.valuesArray()!,
      windSpeed10m: hourly.variables(3)!.valuesArray()!,
      windSpeed80m: hourly.variables(4)!.valuesArray()!,
      surfacePressure: hourly.variables(5)!.valuesArray()!,
      weatherCode: hourly.variables(6)!.valuesArray()!,
    },
  };

  return weatherData;
};

export default getWeather;
