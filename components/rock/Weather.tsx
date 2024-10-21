import { useState, useEffect, useRef } from "react";
import getWeather from "./utilities/getWeather";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import getCurrentHourWeather from "./utilities/getCurrentHourWeather";
import { THourlyWeatherData, TRockLocation } from "@/types/weather";
import { useThemeColor } from "@/hooks/useThemeColor";
import getWeatherIcon from "./utilities/getWeatherIcon";
import { EDayTime } from "@/types/weather";

// @ts-ignore
import DewIcon from "../../assets/images/dew.png";
// @ts-ignore
import WindIcon from "../../assets/images/wind.png";
// @ts-ignore
import HumidityIcon from "../../assets/images/humidity.png";
// @ts-ignore
import SunBehindCloud from "../../assets/images/sunBehindCloud.png";

const Weather = ({ latitude, longitude }: TRockLocation) => {
  const [hourlyWeather, setHourlyWeather] = useState<THourlyWeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState("");

  const iconColor = useThemeColor({}, "tint");
  const isLoaded = useState(false);

  const fetchWeather = async () => {
    setLoading(true);

    try {
      const weatherData = await getWeather({ latitude, longitude });

      if (!weatherData) {
        throw new Error("No weather data received");
      }
      const todaysWeather = getCurrentHourWeather(weatherData);

      if (!todaysWeather) {
        throw new Error("No hourly weather data available");
      }

      setHourlyWeather(todaysWeather);

      const todaysWeatherIcon = await getWeatherIcon(
        todaysWeather.weatherCode,
        EDayTime.Day
      );

      if (!todaysWeatherIcon) {
        setWeatherIcon(""); // to do ogarnąć jakąś iconke gdy nie ma ikonki
        throw new Error("No weather icon available");
      }

      setWeatherIcon(todaysWeatherIcon);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  if (!isLoaded) {
    return (
      <ThemedView style={styles.weatherDetialsContainer}>
        <ActivityIndicator size="large" color={iconColor} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.weatherDetialsContainer}>
      <View style={styles.weatherIconContainer}>
        <View style={styles.weatherIconWrapper}>
          <ThemedText type="title">{`${hourlyWeather?.temperature2m} °C`}</ThemedText>
          <Image
            source={{ uri: weatherIcon }}
            resizeMode="contain"
            style={styles.weatherIcon}
          />
        </View>
        <ThemedText type="defaultSemiBold">{`${hourlyWeather?.surfacePressure} hPa`}</ThemedText>
      </View>
      <View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={DewIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Dew icon"
          />
          <ThemedText type="defaultSemiBold">{`Punkt rosy: ${hourlyWeather?.dewPoint2m} C`}</ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={HumidityIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Humidity icon"
          />
          <ThemedText type="defaultSemiBold">{`Wilgotność: ${hourlyWeather?.relativeHumidity2m}%`}</ThemedText>
        </View>
        <View style={styles.weatherDetailLabelWraper}>
          <Image
            source={WindIcon}
            resizeMode="contain"
            style={styles.weatherDetailsIcon}
            alt="Wind icon"
          />
          <ThemedText type="defaultSemiBold">{`Wiatr: ${hourlyWeather?.windSpeed10m} m/s`}</ThemedText>
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
    height: 60,
    width: 60,
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
