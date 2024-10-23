import { FlatList, Pressable, View, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeView } from "../ThemedSafeView";
import { ThemedView } from "../ThemedView";

// @ts-ignore
import BoulderIcon from "../../assets/images/BoulderIcon.png";
// @ts-ignore
import DrytoolIcon from "../../assets/images/DrytoolIcon.png";
// @ts-ignore
import TradIcon from "../../assets/images/TradIcon.png";

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

  const getIconForType = (type: ERoadType | undefined) => {
    switch (type) {
      case ERoadType.Boulder:
        return BoulderIcon;
      case ERoadType.Trad:
        return TradIcon;
      case ERoadType.Drytool:
        return DrytoolIcon;
      default:
        return null;
    }
  };

  return (
    <ThemedSafeView style={{ marginBottom: 16 }}>
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        data={roadsData}
        keyExtractor={(item, index) => item.name || `road-${index}`}
        renderItem={({ item }) => (
          <ThemedView style={styles.road} withBorder={true}>
            <View style={styles.nameLevel}>
              <ThemedText style={styles.nameLevelText}>{item.name}</ThemedText>
              <ThemedText style={styles.nameLevelText}>{item.level}</ThemedText>
            </View>

            {item.type && (
              <Image
                source={getIconForType(item.type)}
                style={styles.typeIcon}
                resizeMode={"contain"}
              />
            )}
          </ThemedView>
        )}
      />
    </ThemedSafeView>
  );
};

const styles = StyleSheet.create({
  road: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
  nameLevel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameLevelText: {
    fontWeight: 600,
  },
  typeIcon: {
    height: 30,
    width: 30,
  },
});
