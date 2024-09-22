import { Icon } from "@/components/Icon";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { DATA } from ".";
import {
	ExploreMountainCard,
	ExploreMountainCardProps
} from "@/components/ExploreMountainCard";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

function normalizeString(str: string | string[]) {
	return Array.isArray(str) ? str.join(", ") : str;
}

function findMountainById(id: string) {
	return DATA.find((mountain) => mountain.id === id);
}

export default function MountainPage() {
	const iconColor = useThemeColor({}, "tint");
	const { id } = useLocalSearchParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [mountain, setMountain] = useState<ExploreMountainCardProps>();

	useEffect(() => {
		if (!isLoaded) {
			const mountain = findMountainById(normalizeString(id));
			setMountain(mountain);
			setInterval(() => {
				setIsLoaded(true);
			}, 3000);
		}
	}, [isLoaded]);

	if (!isLoaded) {
		return (
			<ThemedSafeView
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Stack.Screen
					options={{
						title: "Ładowanie..."
					}}
				/>
				<ActivityIndicator size="large" color={iconColor} />
			</ThemedSafeView>
		);
	}

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
						title: mountain?.name
					}}
				/>
				<ScrollView
					contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
					style={{ width: "100%" }}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<View>
							<ThemedText type="title">{mountain?.name}</ThemedText>
							<ThemedText>
								<Icon name="location-pin" size={13} />
								{mountain?.location}
							</ThemedText>
						</View>
						<View style={{ display: "flex", alignItems: "center" }}>
							<ThemedText type="title">{mountain?.pathCount}</ThemedText>
							<ThemedText>dróg</ThemedText>
						</View>
					</View>

					<ThemedText type="defaultSemiBold">Skały w pobliżu</ThemedText>
					<View style={{ display: "flex", gap: 8 }}>
						{mountain?.nearbyMountains?.map((mountain) => (
							<Link
								key={mountain.id}
								push
								href={{
									pathname: "/[id]",
									params: { id: mountain.id }
								}}
								asChild
							>
								<Pressable>
									<ExploreMountainCard key={mountain.id} {...mountain} />
								</Pressable>
							</Link>
						))}
					</View>
				</ScrollView>
			</ThemedSafeView>
		</>
	);
}
