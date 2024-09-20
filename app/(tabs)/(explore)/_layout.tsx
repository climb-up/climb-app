import { Stack } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text } from "react-native";

export default function ExploreStackLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Odkrywaj"
				}}
			/>
		</Stack>
	);
}
