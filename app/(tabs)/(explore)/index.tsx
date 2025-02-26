import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { Models } from "react-native-appwrite";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import ExploreMountainCard from "@/components/ExploreMountainCard";
import { ThemedText } from "@/components/ThemedText";
import { getAllRocks } from "@/lib/appwrite";
import { Colors } from "@/constants/Colors";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rocks, setRocks] = useState<Models.Document[] | null>([]);

  useEffect(() => {
    setIsLoading(true);
    const getRocksHanlder = async () => {
      const response = await getAllRocks();
      setRocks(response);
      setIsLoading(false);
    };

    getRocksHanlder();
  }, []);

  if (isLoading) {
    return (
      <ThemedSafeView style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color={Colors.base.orange500} />
      </ThemedSafeView>
    );
  }

  return (
    <ThemedSafeView style={styles.exploreContainer}>
      <ThemedText type="title" style={styles.header}>
        Odkrywaj
      </ThemedText>
      {rocks && (
        <FlatList
          style={styles.exploreList}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          data={rocks}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/[id]",
                params: { id: item.$id },
              }}
              asChild
            >
              <Pressable>
                <ExploreMountainCard
                  backgroundImage={item.thumbnail}
                  name={item.name}
                  location={item.location?.name ?? ""}
                  pathCount={item.paths.length}
                />
              </Pressable>
            </Link>
          )}
        />
      )}
    </ThemedSafeView>
  );
};

export default Index;

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignSelf: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  exploreList: {
    width: "100%",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listSeparator: { height: 12 },
});
