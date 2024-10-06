import { StyleSheet } from "react-native";
import { Icon } from "@/components/Icon";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Roads } from "@/components/rock/Roads";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { DATA } from ".";
import {
  ExploreMountainCard,
  ExploreMountainCardProps,
} from "@/components/ExploreMountainCard";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RockHeader } from "@/components/rock/RockHeader";

function normalizeString(str: string | string[]) {
  return Array.isArray(str) ? str.join(", ") : str;
}

function findMountainById(id: string) {
  return DATA.find((mountain) => mountain.id === id);
}

export default function MountainPage() {
  const iconColor = useThemeColor({}, "tint");
  const { id } = useLocalSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mountain, setMountain] = useState<ExploreMountainCardProps>();

  useEffect(() => {
    if (!isLoaded) {
      const mountain = findMountainById(normalizeString(id));
      setMountain(mountain);

      setInterval(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isLoaded]);

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
    <>
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
            ></Image>
          </View>
          <ThemedText style={{ marginBottom: 8 }} type="defaultSemiBold">
            Drogi
          </ThemedText>
          <Roads roadsData={mountain?.roads} />
          <ThemedText type="defaultSemiBold">Skały w pobliżu</ThemedText>
          <View style={{ display: "flex", gap: 8 }}>
            {mountain?.nearbyMountains?.map((mountain) => (
              <Link
                key={mountain.id}
                push
                href={{
                  pathname: "/[id]",
                  params: { id: mountain.id },
                }}
                asChild
              >
                <Pressable>
                  <ExploreMountainCard key={mountain.id} {...mountain} />
                </Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </ThemedSafeView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
});
