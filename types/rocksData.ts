export enum ERoadType {
  Boulder = "Boulder",
  Trad = "Trad",
  Drytool = "Drytool",
  Sport = "Sport",
}

export type TRoads = {
  name?: string;
  level?: string;
  type?: ERoadType;
};

export interface IRoadsProps {
  roadsData: TRoads[] | undefined;
}

export type TRocksData = {
  id: string;
  name: string;
  location: string;
  pathCount: number;
  backgroundImage: string;
  nearbyMountains?: TRocksData[];
  longitude: number;
  latitude: number;
  roads?: TRoads[];
};
