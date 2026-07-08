import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../src/context/AuthContext";
import { NavbarProvider } from "../src/context/NavbarContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavbarProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>

        <Toast />
      </NavbarProvider>
    </AuthProvider>
  );
}
