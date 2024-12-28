import { TRocksData, ERoadType } from "../types/rocksData";

export const ROCKS_DATA: TRocksData[] = [
  {
    id: "0",
    name: "Wysoki Hrothgar",
    pathCount: 3,
    location: "Biała Grań",
    backgroundImage:
      "https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl",
    longitude: 20.352000832095047,
    latitude: 50.02574557925972,
    roads: [],
  },
  {
    id: "3",
    name: "Okrężek",
    pathCount: 15,
    location: "Piekary",
    backgroundImage:
      "https://topo.portalgorski.pl/images/item/150x100/480/844/480d844_piekary.png",
    longitude: 19.946949473643198,
    latitude: 50.06614396836268,
    roads: [
      {
        name: "Okrężne zacięcie",
        type: ERoadType.Trad,
        level: "V",
      },
      {
        name: "Noc nad Wisłą",
        type: ERoadType.Boulder,
        level: "VI.1+",
      },
      {
        name: "Melonizm",
        type: ERoadType.Drytool,
        level: "VI.2+",
      },
    ],
  },
  {
    id: "4",
    name: "Balaton",
    pathCount: 13,
    location: "Trzebinia",
    backgroundImage:
      "https://topo.portalgorski.pl/images/item/150x100/504/8fb/504f8fb_balaton.png",
    longitude: 20.194925819793564,
    latitude: 50.102449695731316,
    roads: [
      {
        name: "Na szczyt",
        type: ERoadType.Trad,
        level: "III",
      },
      {
        name: "Lewa Rysa",
        type: ERoadType.Boulder,
        level: "V+",
      },
      {
        name: "Prawy do Lewego",
        type: ERoadType.Drytool,
        level: "IV",
      },
    ],
  },
  {
    id: "5",
    name: "Fudalowa Skała",
    pathCount: 9,
    location: "Piekary",
    backgroundImage:
      "https://topo.portalgorski.pl/images/item/150x100/aec/0b1/aecd0b1_piek_4.png",
    longitude: 19.749803710397284,
    latitude: 50.05865511176557,
    roads: [
      {
        name: "Płyta wiśniaka",
        type: ERoadType.Trad,
        level: "VI",
      },
      {
        name: "Filar Nowodworczyków",
        type: ERoadType.Boulder,
        level: "III+",
      },
      {
        name: "N.N.",
        type: ERoadType.Drytool,
        level: "VI.3+",
      },
    ],
  },
];
