import { useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RockHeader } from "@/components/rock/RockHeader";
import { Paths } from "@/components/rock/Paths";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TPaths, TLocation } from "@/types/rocksData";
import { useGetRocks } from "@/lib/tanstack-query/queries";

type TRockModalData = {
  id: string;
  name: string;
  pathCount: number;
  location: TLocation;
  backgroundImage: string;
  paths: TPaths[];
} | null;

const Index = () => {
  const [activeMarker, setActiveMarker] = useState<TRockModalData>(null);

  const router = useRouter();
  const modalizeRef = useRef<Modalize>(null);
  const markerRefs = useRef(new Map());

  const { data, isLoading, isError } = useGetRocks();

  const onOpenModal = (id: string) => {
    handleActiveMarker(id);
    modalizeRef.current?.open();
  };

  const handleActiveMarker = (id: string) => {
    const activeMarkerData = data?.documents.find((rock) => rock.$id === id);
    if (!activeMarkerData) return;
    setActiveMarker({
      id: id,
      name: activeMarkerData.name,
      pathCount: activeMarkerData.paths.length,
      location: activeMarkerData.location,
      backgroundImage: activeMarkerData.thumbnail,
      paths: activeMarkerData.paths ?? [],
    });
  };

  const theme = useColorScheme() ?? "light";
  const isLight = theme === "light";

  if (isError) {
    Alert.alert("Błąd", "Wystąpił błąd podczas ładowania danych");
  }

  return (
    <GestureHandlerRootView style={styles.mapContainer}>
      <ThemedView>
        <Modalize
          modalStyle={{
            ...styles.modal,
            backgroundColor: isLight
              ? Colors.light.background500
              : Colors.dark.background100,
          }}
        >
          <RockHeader
            name={activeMarker?.name}
            pathCount={activeMarker?.pathCount}
            location={activeMarker?.location?.name ?? ""}
          />

          <Image
            source={{ uri: activeMarker?.backgroundImage }}
            style={styles.modalRockImage}
          />
          <Paths pathsData={activeMarker ? activeMarker.paths : []} />
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/(explore)/${activeMarker?.id}`)}
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
          {isLoading && !data ? (
            <ActivityIndicator size="large" color={Colors.base.orange500} />
          ) : (
            data?.documents.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  ref={(ref) => {
                    if (ref) markerRefs.current.set(marker.$id, ref);
                  }}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={() => onOpenModal(marker.$id)}
                />
              );
            })
          )}
        </MapView>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default Index;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    marginTop: 80,
    padding: 16,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  regionWrapper: {
    gap: 2,
  },
  modalRockImage: {
    height: 300,
    resizeMode: "cover",
    borderRadius: 24,
    marginVertical: 16,
  },
  rockLink: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
