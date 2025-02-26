export enum ERoadType {
  Boulder = "Boulder",
  Trad = "Trad",
  Drytool = "Drytool",
  Sport = "Sport",
}

export type TPaths = {
  name: string;
  level: string;
  type: ERoadType;
  rocks: TRocks[];
};

type TLocation = {
  name: string;
  rocks: TRocks[];
  region: TRegion;
};

type TRegion = {
  name: string;
  rocks: TPaths;
  locations: TLocation[];
};

export type TRocks = {
  id: string;
  name: string;
  location: TLocation;
  thumbnail: string;
  region?: TRegion;
  longitude?: number;
  latitude?: number;
  paths?: TPaths[];
  pathCount?: number;
};
