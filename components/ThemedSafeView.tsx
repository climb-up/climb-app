import { SafeAreaView, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedViewProps } from "./ThemedView";

export function ThemedSafeView({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  withBorder = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    "border" // You can define this key in your Colors object
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor },
        withBorder && { borderColor, borderWidth: 1 },
        style,
      ]}
      {...otherProps}
    />
  );
}
