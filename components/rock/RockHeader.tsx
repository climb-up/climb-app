import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon } from "../ThemedIcon";

type RockHeaderProps = {
  name?: string;
  pathCount?: number;
  location?: string;
};

export function RockHeader({ name, pathCount, location }: RockHeaderProps) {
  return (
    <View style={styles.rockHeaderWrapper}>
      <View>
        <ThemedText type="title">{name}</ThemedText>
        <View style={styles.rockLocationWrapper}>
          <ThemedIcon
            name="location-pin"
            size={13}
            style={styles.locationIcon}
          />
          <ThemedText type="defaultSemiBold">{location}</ThemedText>
        </View>
      </View>
      <View style={styles.pathCountWrapper}>
        <ThemedText type="title">{pathCount}</ThemedText>
        <ThemedText type="defaultSemiBold">dróg</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rockHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rockLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginBottom: 0,
  },
  pathCountWrapper: { alignItems: "center" },
});
