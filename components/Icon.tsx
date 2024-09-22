import { MaterialIcons } from "@expo/vector-icons";
import { type IconProps as IconPropsBase } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type IconProps = IconPropsBase<ComponentProps<typeof MaterialIcons>["name"]> & {
	size?: number;
};

export function Icon({ style, ...rest }: IconProps) {
	return (
		<MaterialIcons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
	);
}
