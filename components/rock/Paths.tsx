import { FlatList, View, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeView } from "../ThemedSafeView";
import { ThemedView } from "../ThemedView";
import { ERoadType, TPaths } from "../../types/rocksData";

// @ts-ignore
import BoulderIcon from "../../assets/images/BoulderIcon.png";
// @ts-ignore
import DrytoolIcon from "../../assets/images/DrytoolIcon.png";
// @ts-ignore
import TradIcon from "../../assets/images/TradIcon.png";

type TPathsProps = {
  pathsData: TPaths[];
};

export const Paths = ({ pathsData }: TPathsProps) => {
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

  const renderRoads = () => {
    return (
      <FlatList
        style={{ width: "100%" }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        data={pathsData}
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
        scrollEnabled={false}
      />
    );
  };

  return (
    <ThemedSafeView style={{ marginBottom: 16 }}>
      {pathsData && pathsData.length > 0 ? (
        renderRoads()
      ) : (
        <ThemedText style={styles.emptyRoadsText}>
          Nie znaleziono dróg dla tej skały
        </ThemedText>
      )}
    </ThemedSafeView>
  );
};

export default Paths;

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
  emptyRoadsText: {
    textAlign: "center",
  },
});
