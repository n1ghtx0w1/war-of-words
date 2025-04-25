// ✅ Core React Native imports
import { View, Text, Pressable, StyleSheet } from "react-native";
// ✅ Expo router for screen navigation
import { useRouter } from "expo-router";
// ✅ Floating menu component for music + logout controls
import FloatingMenu from "../components/FloatingMenu";

// ✅ Main screen component for choosing between new or saved game
export default function ChooseModeScreen() {
  const router = useRouter(); // Initialize navigation

  return (
    <>
      {/* 🔳 Main screen layout container */}
      <View style={styles.container}>
        {/* 👋 Welcome message */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>What would you like to do?</Text>

        {/* 🆕 Start new game option */}
        <Pressable style={styles.button} onPress={() => router.replace("/select-hero")}>
          <Text style={styles.buttonText}>🆕 Start New Game</Text>
        </Pressable>

        {/* 🔄 Continue game option */}
        <Pressable style={styles.button} onPress={() => router.replace("/map")}>
          <Text style={styles.buttonText}>🔄 Continue Game</Text>
        </Pressable>

        {/* 🎛️ Floating menu (Logout, Music, Mute) */}
        <FloatingMenu />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    // 🔳 Fullscreen dark container
    container: {
      flex: 1,
      backgroundColor: "#1e1e2f", // Dark background
      justifyContent: "center",   // Center vertically
      alignItems: "center",       // Center horizontally
      padding: 20,
    },
  
    // 👋 Large title
    title: {
      fontFamily: "PressStart2P",
      fontSize: 18,
      color: "#25be38", // Neon green
      marginBottom: 10,
      textAlign: "center",
    },
  
    // 📝 Smaller subtitle
    subtitle: {
      fontFamily: "PressStart2P",
      fontSize: 10,
      color: "#ccc",
      marginBottom: 24,
      textAlign: "center",
    },
  
    // 🟪 Purple button styling
    button: {
      backgroundColor: "#4b0082",
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 12,
      marginVertical: 10,
    },
  
    // 🔤 Button text style
    buttonText: {
      fontFamily: "PressStart2P",
      fontSize: 10,
      color: "#fff",
    },
  
    // 🔙 (Unused here, but preserved for reuse if needed)
    backButtonText: {
      fontFamily: "PressStart2P",
      fontSize: 12,
      color: "#25be38",
      letterSpacing: 1,
    },
  });
  