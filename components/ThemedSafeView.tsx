import { SafeAreaView, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedViewProps } from "./ThemedView";

export function ThemedSafeView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
