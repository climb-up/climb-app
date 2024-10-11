import { useEffect, useRef } from "react";
import getWeather from "./utilities/getWeather";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { FlatList, Image, View, StyleSheet } from "react-native";
import getCurrentHourWeather from "./utilities/getCurrentHourWeather";

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
  };
};

type HourlyWeatherData = {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  dewPoint2m: number;
  windSpeed10m: number;
  windSpeed80m: number;
};

const Weather = ({ latitude, longitude }: TWeatherProps) => {
  const hourlyWeatherRef = useRef<HourlyWeatherData | undefined>();

  // na ten moment spoko ale jak będzimy robić kalendarz trzeba będzie do tego componentu przekazac juz dane podogowe kliknietego dnia i je po prostu wypisac
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
    <ThemedView>
      <View>
        <View>
          <ThemedText></ThemedText>
          <Image alt="weather icon" />
        </View>
      </View>
      <View>
        <View style={styles.weatherDetailLabelWraper}>
          <View>icon</View>
          <ThemedText>{hourlyWeatherRef.current?.dewPoint2m} C</ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <View>icon</View>
          <ThemedText>
            {hourlyWeatherRef.current?.relativeHumidity2m} %
          </ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <View>icon</View>
          <ThemedText>{hourlyWeatherRef.current?.windSpeed10m} m/s</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  weatherDetailLabelWraper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
