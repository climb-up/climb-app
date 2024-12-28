import { ThemedSafeView } from "@/components/ThemedSafeView";
import { Link } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { ExploreMountainCard } from "@/components/ExploreMountainCard";
import { ROCKS_DATA } from "@/constants/RocksData";

export default function Index() {
  return (
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
        data={ROCKS_DATA}
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
  );
}
