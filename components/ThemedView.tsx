import { View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lighBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  withBorder?: boolean;
};

export function ThemedView({
  style,
  lighBackgroundColor = Colors.light.background500,
  darkBackgroundColor = Colors.dark.background100,
  lightBorderColor = Colors.light.border,
  darkBorderColor = Colors.dark.border,
  withBorder = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({
    light: lighBackgroundColor,
    dark: darkBackgroundColor,
  });

  const borderColor = useThemeColor({
    light: lightBorderColor,
    dark: darkBorderColor,
  });

  return (
    <View
      style={[
        { backgroundColor },
        withBorder && { borderColor, borderWidth: 1 },
        style,
      ]}
      {...otherProps}
    />
  );
}
