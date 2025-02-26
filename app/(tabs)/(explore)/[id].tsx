import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Paths } from "@/components/rock/Paths";
import { TRocks } from "@/types/rocksData";
import { RockHeader } from "@/components/rock/RockHeader";
import Weather from "@/components/rock/Weather";
import { Colors } from "@/constants/Colors";
import { getRock } from "@/lib/appwrite";

export default function RockPage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [rock, setRock] = useState<TRocks | null>();

  useEffect(() => {
    setIsLoading(true);
    const getRocksHanlder = async (rockId: string | string[]) => {
      const formatedRockId = Array.isArray(id) ? id[0] : id;
      const response = await getRock(formatedRockId);
      setRock(response);
      setIsLoading(false);
    };

    getRocksHanlder(id);
  }, []);

  if (isLoading) {
    return (
      <ThemedSafeView style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color={Colors.base.orange500} />
      </ThemedSafeView>
    );
  }

  return (
    <ThemedSafeView style={styles.rockSaveView}>
      <View style={styles.rockHeaderContainer}>
        <RockHeader
          name={rock?.name}
          pathCount={rock?.paths?.length}
          location={rock?.location?.name}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.rockScrollViewContainer}
        style={styles.rockScrollView}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: rock?.thumbnail }} style={styles.rockImage} />
        </View>
        <ThemedText style={styles.pathsLabel} type="defaultSemiBold">
          Drogi
        </ThemedText>
        <Paths pathsData={rock?.paths ?? []} />
        {/* <ThemedText style={{ marginBottom: 8 }} type="defaultSemiBold">
          Pogoda
        </ThemedText>
        <Weather
          longitude={mountain?.longitude}
          latitude={mountain?.latitude}
        /> */}
      </ScrollView>
    </ThemedSafeView>
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
  imageWrapper: { marginBottom: 16 },
  rockImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  pathsLabel: { marginBottom: 8 },
});
