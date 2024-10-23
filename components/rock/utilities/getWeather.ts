import { fetchWeatherApi } from "openmeteo";
import { TWeatherData, TRockLocation } from "@/types/weather";

// to do ujednolicić api pogodowe, jeśli sie da i ma sens przejść na to co ikonki z niego są bo w tym nie ma ikonek

const formatWeatherCode = (
  weatherCodesArr: Float32Array | null | undefined
): string[] => {
  if (!weatherCodesArr) return [];

  return Array.from(weatherCodesArr, (value) => {
    if (value < 10) {
      return value.toFixed(0).padStart(2, "0");
    } else {
      return value.toFixed(0);
    }
  });
};

const getWeather = async (
  location: TRockLocation
): Promise<TWeatherData | null> => {
  const { latitude, longitude } = location;

  try {
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required.");
    }

    const params = {
      latitude: latitude,
      longitude: longitude,
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

    const response = responses[0];

    if (!response) {
      throw new Error("No response received from the API.");
    }

    const utcOffsetSeconds = response.utcOffsetSeconds?.();
    const hourly = response.hourly?.();

    if (!hourly || utcOffsetSeconds === undefined) {
      throw new Error("Incomplete data received from the API.");
    }

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const formatedWeatherCodes = formatWeatherCode(
      hourly?.variables(6)?.valuesArray()
    );

    const weatherData: TWeatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)?.valuesArray() || new Float32Array(),
        relativeHumidity2m:
          hourly.variables(1)?.valuesArray() || new Float32Array(),
        dewPoint2m: hourly.variables(2)?.valuesArray() || new Float32Array(),
        windSpeed10m: hourly.variables(3)?.valuesArray() || new Float32Array(),
        windSpeed80m: hourly.variables(4)?.valuesArray() || new Float32Array(),
        surfacePressure:
          hourly.variables(5)?.valuesArray() || new Float32Array(),
        weatherCode: formatedWeatherCodes,
      },
    };

    return weatherData;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    return null;
  }
};

export default getWeather;
