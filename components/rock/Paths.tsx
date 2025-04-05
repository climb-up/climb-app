import {
  FlatList,
  View,
  StyleSheet,
  Image,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeView } from "../ThemedSafeView";
import { ThemedView } from "../ThemedView";
import { ERoadType, TPaths } from "../../types/rocksData";

// @ts-ignore
import BoulderIconLight from "../../assets/icons/climbing-styles/BoulderIconLight.png";
// @ts-ignore
import BoulderIconDark from "../../assets/icons/climbing-styles/BoulderIconDark.png";
// @ts-ignore
import DrytoolIconLight from "../../assets/icons/climbing-styles/DrytoolIconLight.png";
//@ts-ignore
import DrytoolIconDark from "../../assets/icons/climbing-styles/DrytoolIconDark.png";
// @ts-ignore
import TradIconDark from "../../assets/icons/climbing-styles/TradIconDark.png";
// @ts-ignore
import TradIconLight from "../../assets/icons/climbing-styles/TradIconLight.png";
// @ts-ignore
import SportIconLight from "../../assets/icons/climbing-styles/SportIconLight.png";
// @ts-ignore
import SportIconDark from "../../assets/icons/climbing-styles/SportIconDark.png";

type TPathsProps = {
  pathsData: TPaths[];
  onPathClick: (topo: string, id: string) => void;
};

export const Paths = ({ pathsData, onPathClick }: TPathsProps) => {
  const theme = useColorScheme() ?? "light";

  const ICONS = {
    [ERoadType.BOULDER]: {
      light: BoulderIconDark,
      dark: BoulderIconLight,
    },
    [ERoadType.TRAD]: {
      light: TradIconDark,
      dark: TradIconLight,
    },
    [ERoadType.DRYTOOL]: {
      light: DrytoolIconDark,
      dark: DrytoolIconLight,
    },
    [ERoadType.SPORT]: {
      light: SportIconDark,
      dark: SportIconLight,
    },
  };

  const getIconForType = (type: ERoadType | undefined) => {
    if (!type || !ICONS[type]) return null;
    return ICONS[type][theme];
  };

  return (
    <ThemedSafeView style={{ marginBottom: 16 }}>
      {pathsData.length > 0 ? (
        <FlatList
          style={styles.pathsList}
          ItemSeparatorComponent={() => <View style={styles.pathsDivider} />}
          data={pathsData}
          keyExtractor={(item, index) => item.name || `road-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPathClick(item.topo, item.id)}>
              <ThemedView style={styles.road} withBorder={true}>
                <View style={styles.nameLevel}>
                  <ThemedText style={styles.nameLevelText}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.nameLevelText}>
                    {item.level}
                  </ThemedText>
                </View>
                <View style={styles.iconsWrapper}>
                  {item.type?.map((itemType) => (
                    <Image
                      key={itemType}
                      source={getIconForType(itemType)}
                      style={styles.typeIcon}
                      resizeMode="contain"
                    />
                  ))}
                </View>
              </ThemedView>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
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
  pathsList: {
    width: "100%",
  },
  pathsDivider: {
    height: 16,
  },
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
  iconsWrapper: {
    display: "flex",
    gap: 2,
  },
  typeIcon: {
    height: 30,
    width: 30,
  },
  emptyRoadsText: {
    textAlign: "center",
  },
});
