import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ImageBackgroundWithGradient } from "./ImageBackgroundWithGradient";
import { ThemedIcon } from "./ThemedIcon";
import { Colors } from "@/constants/Colors";

type TExploreMountainCardProps = {
  backgroundImage: string;
  name: string;
  location: string;
  pathCount: string;
};

const ExploreMountainCard = ({
  backgroundImage,
  name,
  location,
  pathCount,
}: TExploreMountainCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundWithGradient
        source={{ uri: backgroundImage }}
        innerStyle={styles.cardBackground}
      >
        <View style={styles.cardDataWrapper}>
          <View>
            <ThemedText type="title" lightColor={Colors.base.white500}>
              {name}
            </ThemedText>
            <ThemedText lightColor={Colors.base.white500}>
              <ThemedIcon name="location-pin" size={13} />
              {location}
            </ThemedText>
          </View>
          <View style={styles.roadsCountWrapper}>
            <ThemedText type="title" lightColor={Colors.base.white500}>
              {pathCount}
            </ThemedText>
            <ThemedText lightColor={Colors.base.white500}>dróg</ThemedText>
          </View>
        </View>
      </ImageBackgroundWithGradient>
    </View>
  );
};

export default ExploreMountainCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardBackground: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 16,
  },
  cardDataWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roadsCountWrapper: { display: "flex", alignItems: "center" },
});
