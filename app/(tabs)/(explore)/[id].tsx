import { StyleSheet } from "react-native";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Roads } from "@/components/rock/Roads";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  LogBox,
} from "react-native";
import { ROCKS_DATA } from "@/constants/RocksData";
import { TRocksData } from "@/types/rocksData";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RockHeader } from "@/components/rock/RockHeader";
import Weather from "@/components/rock/Weather";

function normalizeString(str: string | string[]) {
  return Array.isArray(str) ? str.join(", ") : str;
}

function findMountainById(id: string) {
  return ROCKS_DATA.find((mountain) => mountain.id === id);
}

export default function MountainPage() {
  const iconColor = useThemeColor({}, "tint");
  const { id } = useLocalSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mountain, setMountain] = useState<TRocksData>();

  useEffect(() => {
    if (!isLoaded) {
      const mountain = findMountainById(normalizeString(id));
      setMountain(mountain);

      setInterval(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isLoaded]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  if (!isLoaded) {
    return (
      <ThemedSafeView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={iconColor} />
      </ThemedSafeView>
    );
  }

  return (
    <ThemedSafeView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        style={{ width: "100%" }}
      >
        <RockHeader
          name={mountain?.name}
          pathCount={mountain?.pathCount}
          location={mountain?.location}
        />
        <View style={{ marginBottom: 16 }}>
          <Image
            source={{ uri: mountain?.backgroundImage }}
            style={styles.image}
          />
        </View>
        <ThemedText style={{ marginBottom: 8 }} type="defaultSemiBold">
          Drogi
        </ThemedText>
        <Roads roadsData={mountain?.roads} />
        <ThemedText style={{ marginBottom: 8 }} type="defaultSemiBold">
          Pogoda
        </ThemedText>
        <Weather
          longitude={mountain?.longitude}
          latitude={mountain?.latitude}
        />
      </ScrollView>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
});
