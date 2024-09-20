import { Stack, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
				tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? "light"].secondaryBackground
				}
			}}
		>
			<Tabs.Screen
				name="(explore)"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<TabBarIcon name={"home"} color={color} size={size} />
					)
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color, size }) => (
						<TabBarIcon name={"person"} color={color} size={size} />
					)
				}}
			/>
		</Tabs>
	);
}
