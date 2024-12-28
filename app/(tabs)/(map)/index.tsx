import { useRef } from "react";
import { type ExploreMountainCardProps } from "@/components/ExploreMountainCard";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, View, Image, Text } from "react-native";
import { ERoadType } from "../../../components/rock/Roads";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { RockHeader } from "@/components/rock/RockHeader";
import { Roads } from "../../../components/rock/Roads";

type DataProps = ExploreMountainCardProps;

export const DATA: DataProps[] = [
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

export default function Index() {
  const modalizeRef = useRef<Modalize>(null);
  const colorScheme = useColorScheme();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedSafeView>
        <Modalize
          ref={modalizeRef}
          snapPoint={400}
          modalStyle={{
            ...styles.modal,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
        >
          <RockHeader name="Okrężek" pathCount={16} location="Tatry Wysokie" />

          <Image
            source={{ uri: DATA[0].backgroundImage }}
            style={styles.modalRockImage}
          />
          <Roads roadsData={DATA[1].roads} />
          <ThemedText style={styles.rockLink}>Zobacz profil</ThemedText>
        </Modalize>
        <MapView
          initialRegion={{
            latitude: 50.0647,
            longitude: 19.945,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
          style={styles.map}
        >
          {DATA.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: +marker.latitude,
                longitude: +marker.longitude,
              }}
              onPress={onOpen}
            />
          ))}
        </MapView>
      </ThemedSafeView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    display: "flex",
    marginTop: 52,
    padding: 16,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  regionWrapper: {
    display: "flex",
    // alignItems: "center",
    gap: 2,
  },
  modalRockImage: {
    height: 300,
    resizeMode: "cover",
    borderRadius: 24,
    marginBottom: 16,
  },
  rockLink: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
