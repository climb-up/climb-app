import { EDayTime } from "@/types/weather";

const getWeatherIcon = async (weatherCode: string, dayTime: EDayTime) => {
  try {
    const url = `https://openweathermap.org/img/wn/${weatherCode}${dayTime}@2x.png`;
    console.log(url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No icon was recieved");
    }
    return response.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getWeatherIcon;
