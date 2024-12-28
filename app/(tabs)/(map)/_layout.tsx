import { Stack } from "expo-router";
import React from "react";

export default function ExploreStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "map",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
