import { useRef, useState } from "react";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RockHeader } from "@/components/rock/RockHeader";
import { Roads } from "../../../components/rock/Roads";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ROCKS_DATA } from "../../../constants/RocksData";
import { TRoads } from "@/types/rocksData";

type TRockModalData = {
  id: string;
  name: string;
  pathCount: number;
  location: string;
  backgroundImage: string;
  roads: TRoads[];
} | null;

export default function Index() {
  const [activeMarker, setActiveMarker] = useState<TRockModalData>(null);
  const router = useRouter();
  const modalizeRef = useRef<Modalize>(null);
  const colorScheme = useColorScheme();

  const navigateToExplore = (id: string) => {
    router.push(`/(tabs)/(explore)/${id}`);
  };

  const onOpenModal = (id: string) => {
    handleActiveMarker(id);
    modalizeRef.current?.open();
  };

  const handleActiveMarker = (id: string) => {
    const activeMarkerData = ROCKS_DATA.find((rock) => rock.id === id);
    if (!activeMarkerData) return;
    setActiveMarker({
      id: id,
      name: activeMarkerData.name,
      pathCount: activeMarkerData.pathCount,
      location: activeMarkerData.location,
      backgroundImage: activeMarkerData.backgroundImage,
      roads: activeMarkerData.roads ?? [],
    });
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
          <RockHeader
            name={activeMarker?.name}
            pathCount={activeMarker?.pathCount}
            location={activeMarker?.location}
          />

          <Image
            source={{ uri: activeMarker?.backgroundImage }}
            style={styles.modalRockImage}
          />
          <Roads roadsData={activeMarker ? activeMarker.roads : []} />
          <TouchableOpacity
            onPress={() => navigateToExplore(activeMarker?.id ?? "0")}
          >
            <ThemedText style={styles.rockLink}>Zobacz profil</ThemedText>
          </TouchableOpacity>
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
          {ROCKS_DATA.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: +marker.latitude,
                longitude: +marker.longitude,
              }}
              onPress={() => onOpenModal(marker.id)}
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
