import { FlatList, Pressable, View, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeView } from "../ThemedSafeView";
import { ThemedView } from "../ThemedView";

const BoulderIcon = "../../assets/images/BoulderIcon.png";

export enum ERoadType {
  Boulder = "Boulder",
  Trad = "Trad",
  Drytool = "Drytool",
  Sport = "Sport",
}

export type TRoads = {
  name?: string;
  level?: string;
  type?: ERoadType;
};

interface IRoadsProps {
  roadsData: TRoads[] | undefined;
}

export const Roads = (props: IRoadsProps) => {
  const { roadsData } = props;
  return (
    <ThemedSafeView withBorder={true} style={styles.roadList}>
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        data={roadsData}
        keyExtractor={(item, index) => item.name || `road-${index}`}
        renderItem={({ item }) => (
          <ThemedView style={styles.road}>
            <View style={styles.nameLevel}>
              <ThemedText>{item.name}</ThemedText>
              <ThemedText>{item.level}</ThemedText>
            </View>

            <ThemedText>{item.type}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedSafeView>
  );
};

const styles = StyleSheet.create({
  roadList: {
    padding: 16,
    borderRadius: 10,
  },
  road: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameLevel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typeIcon: {
    height: 70,
  },
});
