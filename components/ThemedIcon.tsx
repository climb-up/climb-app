import { MaterialIcons } from "@expo/vector-icons";
import { type IconProps as IconPropsBase } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { Colors, LightColorValues, DarkColorValues } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

type IconProps = IconPropsBase<ComponentProps<typeof MaterialIcons>["name"]> & {
  size?: number;
  lightColor?: LightColorValues;
  darkColor?: DarkColorValues;
};

export function ThemedIcon({
  lightColor = Colors.light.text500,
  darkColor = Colors.dark.text500,
  style,
  ...rest
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor });
  return (
    <MaterialIcons
      size={28}
      style={[{ marginBottom: -3, color: color }, style]}
      {...rest}
    />
  );
}
