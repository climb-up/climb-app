import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

function normalizeString(str: string | string[]) {
	return Array.isArray(str) ? str.join(", ") : str;
}

export default function MountainPage() {
	const { id, name } = useLocalSearchParams();
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			<ThemedSafeView
				style={{
					flex: 1,
					alignItems: "center"
				}}
			>
				<Stack.Screen
					options={{
						title: normalizeString(name)
					}}
				/>
				<ThemedText type="title">Mountain Page</ThemedText>
				<ThemedText>{id}</ThemedText>
			</ThemedSafeView>
		</>
	);
}
