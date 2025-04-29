// app/_layout.tsx
import { Stack } from "expo-router";
import FloatingMenu from "../components/FloatingMenu";

export default function Layout() {
  return (
    <>
      {/* Navigation stack (all pages/screens) */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="choose-mode" options={{ headerShown: false }} />
        <Stack.Screen name="select-hero" options={{ headerShown: false }} />
        <Stack.Screen name="hero-name" options={{ headerShown: false }} />
        {/* Add more screens later */}
      </Stack>

      {/* Floating menu at bottom-right (only one instance across app) */}
      <FloatingMenu />
    </>
  );
}
