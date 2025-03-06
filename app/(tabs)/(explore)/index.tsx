import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import ExploreMountainCard from "@/components/ExploreMountainCard";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useGetRocks } from "@/lib/tanstack-query/queries";

const Index = () => {
  const { data, isLoading, isError } = useGetRocks();

  if (isLoading) {
    return (
      <ThemedSafeView style={styles.errorLoaderWrapper}>
        <ActivityIndicator size="large" color={Colors.base.orange500} />
      </ThemedSafeView>
    );
  }

  if (isError) {
    return (
      <ThemedSafeView style={styles.errorLoaderWrapper}>
        <ThemedText type="default">Coś poszło nie tak</ThemedText>
      </ThemedSafeView>
    );
  }

  return (
    <ThemedSafeView style={styles.exploreSaveView}>
      <ThemedText type="title" style={styles.header}>
        Odkrywaj
      </ThemedText>
      {data?.documents && (
        <FlatList
          style={styles.exploreList}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          data={data.documents}
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
  errorLoaderWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreSaveView: {
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
