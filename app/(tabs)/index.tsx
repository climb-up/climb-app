import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<>
			<ThemedView
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
			</ThemedView>
		</>
	);
}
