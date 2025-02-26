// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { ThemedIcon } from "../ThemedIcon";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof ThemedIcon>["name"]>) {
  return (
    <ThemedIcon size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
