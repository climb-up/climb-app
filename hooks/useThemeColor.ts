/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors, LightColorValues, DarkColorValues } from "@/constants/Colors";

export function useThemeColor(props: {
  light: LightColorValues;
  dark: DarkColorValues;
}) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
}
