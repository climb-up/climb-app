import { View, type ViewProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  withBorder?: boolean;
};

export function ThemedView({
  style,
  lightColor = Colors.base.white500,
  darkColor = Colors.base.darkBlue100,
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
