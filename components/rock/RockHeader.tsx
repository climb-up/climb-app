import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@/components/Icon";

type RockHeaderProps = {
  name?: string;
  pathCount?: number;
  location?: string;
};

export function RockHeader(props: RockHeaderProps) {
  const { name, pathCount, location } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <View>
        <ThemedText type="title">{name}</ThemedText>
        <ThemedText>
          <Icon name="location-pin" size={13} />
          <ThemedText type="defaultSemiBold">{location}</ThemedText>
        </ThemedText>
      </View>
      <View style={{ display: "flex", alignItems: "center" }}>
        <ThemedText type="title">{pathCount}</ThemedText>
        <ThemedText type="defaultSemiBold">dróg</ThemedText>
      </View>
    </View>
  );
}
