import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="history" />
      <Stack.Screen name="icecream" />
      <Stack.Screen name="vendors" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
