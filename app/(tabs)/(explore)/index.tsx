import {
  ExploreMountainCard,
  type ExploreMountainCardProps,
} from "@/components/ExploreMountainCard";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { Link } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { ERoadType } from "../../../components/rock/Roads";

type DataProps = ExploreMountainCardProps;

export const DATA: DataProps[] = [
  {
    id: "0",
    name: "Wysoki Hrothgar",
    pathCount: 3,
    location: "Biała Grań",
    backgroundImage:
      "https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl",
    roads: [],
    nearbyMountains: [
      {
        id: "5",
        name: "Wysoka twoja stara 5",
        pathCount: 20,
        location: "Biała Grań",
        backgroundImage:
          "https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl",
      },
      {
        id: "6",
        name: "Wysoki Hrothgar 6",
        pathCount: 20,
        location: "Biała Grań",
        backgroundImage:
          "https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl",
      },
    ],
  },
  {
    id: "3",
    name: "Okrężek",
    pathCount: 15,
    location: "Piekary",
    backgroundImage:
      "https://topo.portalgorski.pl/images/item/150x100/480/844/480d844_piekary.png",
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

export default function Index() {
  return (
    <>
      <ThemedSafeView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          data={DATA}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <Pressable>
                <ExploreMountainCard {...item} />
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.id}
        />
      </ThemedSafeView>
    </>
  );
}
