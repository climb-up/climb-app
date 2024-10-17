export type TWeatherData = {
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

export type THourlyWeatherData = {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  dewPoint2m: number;
  windSpeed10m: number;
  windSpeed80m: number;
  surfacePressure: number;
};

export type TRockLocation = {
  longitude: string | undefined;
  latitude: string | undefined;
};
