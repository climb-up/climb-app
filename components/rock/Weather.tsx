import { useEffect, useRef } from "react";
import getWeather from "./utilities/getWeather";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { View, StyleSheet, Image } from "react-native";
import getCurrentHourWeather from "./utilities/getCurrentHourWeather";

// @ts-ignore
import DewIcon from "../../assets/images/dew.png";
// @ts-ignore
import WindIcon from "../../assets/images/wind.png";
// @ts-ignore
import HumidityIcon from "../../assets/images/humidity.png";
// @ts-ignore
import SunBehindCloud from "../../assets/images/sunBehindCloud.png";

export type TWeatherProps = {
  longitude?: string;
  latitude?: string;
};

export type WeatherData = {
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
    relativeHumidity2m: Float32Array;
    dewPoint2m: Float32Array;
    windSpeed10m: Float32Array;
    windSpeed80m: Float32Array;
    surfacePressure: Float32Array;
    weatherCode: Float32Array;
  };
};

type HourlyWeatherData = {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  dewPoint2m: number;
  windSpeed10m: number;
  windSpeed80m: number;
  surfacePressure: number;
};

const Weather = ({ latitude, longitude }: TWeatherProps) => {
  const hourlyWeatherRef = useRef<HourlyWeatherData | undefined>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeather(latitude, longitude);
        const todaysWeather = getCurrentHourWeather(weatherData);
        hourlyWeatherRef.current = todaysWeather;
        console.log(todaysWeather);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return (
    <ThemedView style={styles.weatherDetialsContainer}>
      <View style={styles.weatherIconContainer}>
        <View style={styles.weatherIconWrapper}>
          <ThemedText type="title">{`${hourlyWeatherRef.current?.temperature2m} °C`}</ThemedText>
          <Image
            source={SunBehindCloud}
            resizeMode="contain"
            style={styles.weatherIcon}
          />
        </View>
        <ThemedText type="defaultSemiBold">{`${hourlyWeatherRef.current?.surfacePressure} hPa`}</ThemedText>
      </View>
      <View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={DewIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Dew icon"
          />
          <ThemedText type="defaultSemiBold">{`Punkt rosy: ${hourlyWeatherRef.current?.dewPoint2m} C`}</ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={HumidityIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Humidity icon"
          />
          <ThemedText type="defaultSemiBold">{`Wilgotność: ${hourlyWeatherRef.current?.relativeHumidity2m}%`}</ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={WindIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Wind icon"
          />
          <ThemedText type="defaultSemiBold">{`Wiatr: ${hourlyWeatherRef.current?.windSpeed10m} m/s`}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherDetialsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  weatherDetailLabelWraper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  weatherIconWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  weatherIcon: {
    height: 30,
    width: 30,
  },
  weatherDetailsIcon: {
    height: 16,
    width: 16,
  },
  weatherIconContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
