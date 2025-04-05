import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Paths } from "@/components/rock/Paths";
import { RockHeader } from "@/components/rock/RockHeader";
import Weather from "@/components/rock/Weather";
import { Colors } from "@/constants/Colors";
import { useGetRock } from "@/lib/tanstack-query/queries";
import { Modalize } from "react-native-modalize";
import { MaterialIcons } from "@expo/vector-icons";
import PathImageModal from "@/components/rock/PathImageModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type TActiveTopo = {
  id: string;
  topo: string;
};

const CONTAINER_PADDING = 24;

export default function RockPage() {
  const [activeTopo, setActiveTopo] = useState<TActiveTopo | null>(null);
  const [thumbnailTopOffset, setThumbnailTopOffset] = useState(0);

  const modalizeRef = useRef<Modalize>(null);

  const { id } = useLocalSearchParams();

  const formatedRockId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isError } = useGetRock(formatedRockId);

  if (isLoading) {
    return (
      <ThemedSafeView style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color={Colors.base.orange500} />
      </ThemedSafeView>
    );
  }

  if (isError) {
    Alert.alert("Błąd", "Wystąpił błąd podczas ładowania danych");
  }

  const handleChageActiveTopo = (topo: string, id: string) => {
    setActiveTopo({ topo, id });
  };

  const handleImageFullView = () => {
    modalizeRef.current?.open();
  };

  const handleImageTopOffset = (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    setThumbnailTopOffset(y);
  };

  const calculateModalOffsetTop = () => {
    if (!thumbnailTopOffset) return 0;
    return thumbnailTopOffset + CONTAINER_PADDING;
  };

  return (
    <GestureHandlerRootView>
      <ThemedSafeView style={styles.rockSaveView}>
        <View style={styles.rockHeaderContainer}>
          <RockHeader
            name={data?.name}
            pathCount={data?.paths?.length}
            location={data?.location?.name}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.rockScrollViewContainer}
          style={styles.rockScrollView}
          onLayout={handleImageTopOffset}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: activeTopo?.topo || data?.thumbnail }}
              style={styles.rockImage}
            />
            {activeTopo && (
              <View style={styles.imageActionsWrapper}>
                <TouchableOpacity style={styles.imageActionButton}>
                  <MaterialIcons
                    name="download"
                    size={24}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imageActionButton}
                  onPress={handleImageFullView}
                >
                  <MaterialIcons
                    name="image-search"
                    size={24}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ThemedText style={styles.pathsLabel} type="defaultSemiBold">
            Drogi
          </ThemedText>
          <Paths
            pathsData={data?.paths ?? []}
            onPathClick={handleChageActiveTopo}
          />
          {/* <ThemedText style={{ marginBottom: 8 }} type="defaultSemiBold">
          Pogoda
        </ThemedText>
        <Weather longitude={rock?.longitude} latitude={rock?.latitude} /> */}
        </ScrollView>
        <PathImageModal
          modalRef={modalizeRef}
          imageUrl={activeTopo?.topo ?? null}
          offsetTop={calculateModalOffsetTop()}
        />
      </ThemedSafeView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rockSaveView: {
    flex: 1,
    alignItems: "center",
  },
  rockHeaderContainer: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rockScrollViewContainer: {
    paddingHorizontal: 16,
  },
  rockScrollView: { width: "100%" },
  imageWrapper: {
    height: 400,
    marginBottom: 16,
    position: "relative",
    borderRadius: 10,
  },
  imageActionsWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  imageActionButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: Colors.base.white500,
  },
  actionIcon: {
    color: Colors.base.darkBlue100,
  },
  rockImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  pathsLabel: { marginBottom: 8 },
});
