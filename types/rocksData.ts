export enum ERoadType {
  BOULDER = "boulder",
  TRAD = "trad",
  DRYTOOL = "drytool",
  SPORT = "sport",
}

export type TPaths = {
  id: string;
  name: string;
  level: string;
  type: ERoadType[];
  rocks: TRocks[];
  topo: string;
};

export type TLocation = {
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
