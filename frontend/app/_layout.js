import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { AuthProvider } from "../src/context/AuthContext";
import { NavbarProvider } from "../src/context/NavbarContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { pingBackend } from "../src/config";

export default function RootLayout() {
  useEffect(() => {
    pingBackend();
  }, []);

  return (
    <AuthProvider>
      <NavbarProvider>
        <LanguageProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>

          <Toast />
        </LanguageProvider>
      </NavbarProvider>
    </AuthProvider>
  );
}
