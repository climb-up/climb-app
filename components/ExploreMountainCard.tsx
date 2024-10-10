import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ImageBackgroundWithGradient } from "./ImageBackgroundWithGradient";
import { Icon } from "./Icon";
import { TRoads } from "./rock/Roads";

export type ExploreMountainCardProps = {
  id: string;
  name: string;
  location: string;
  pathCount: number;
  backgroundImage: string;
  nearbyMountains?: ExploreMountainCardProps[];
  longitude?: string;
  latitude?: string;
  roads?: TRoads[];
};

export function ExploreMountainCard(props: ExploreMountainCardProps) {
  return (
    <View style={styles.view}>
      <ImageBackgroundWithGradient
        source={{ uri: props.backgroundImage }}
        innerStyle={styles.innerView}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <ThemedText isContrast type="title">
              {props.name}
            </ThemedText>
            <ThemedText isContrast>
              <Icon name="location-pin" size={13} />
              {props.location}
            </ThemedText>
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            <ThemedText isContrast type="title">
              {props.pathCount}
            </ThemedText>
            <ThemedText isContrast>dróg</ThemedText>
          </View>
        </View>
      </ImageBackgroundWithGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
  innerView: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 16,
  },
});
