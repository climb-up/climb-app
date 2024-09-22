// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { Icon } from "../Icon";

export function TabBarIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Icon>["name"]>) {
	return <Icon size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
