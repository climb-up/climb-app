import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
	return (
		<>
			<ThemedSafeView
				style={{
					flex: 1,
					alignItems: "center"
				}}
			>
				<ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
			</ThemedSafeView>
		</>
	);
}
