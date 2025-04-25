import { Stack } from "expo-router";

export default function Layout() {
  return (
    
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="select-hero" options={{ headerShown: false }} />
      <Stack.Screen name="hero-name" options={{ headerShown: false }} />
      <Stack.Screen name="choose-mode" options={{ headerShown: false }} />
      {/* Add other screens here as needed */}
    </Stack>
  );
}
