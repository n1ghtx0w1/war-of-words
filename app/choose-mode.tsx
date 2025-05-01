import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import FloatingMenu from "../components/FloatingMenu";
import { useHero } from "../context/HeroContext";
import { loadPlayerHero } from "../lib/player";

// ✅ Main screen component for choosing between new or saved game
export default function ChooseModeScreen() {
  const router = useRouter();
  const { setHero } = useHero();        // ✅ Correct usage
  const [loading, setLoading] = useState(false);

  // 🔄 Handle continue logic
  const handleContinue = async () => {
    setLoading(true);
    try {
      const hero = await loadPlayerHero();
      if (hero) {
        setHero(hero); // ✅ Store globally
        router.push("/select-hero-list"); 
      } else {
        Alert.alert("No Hero", "You don't have a saved hero yet.");
      }
    } catch (e) {
      Alert.alert("Error", e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>What would you like to do?</Text>

      {/* 🆕 Start New Game */}
      <Pressable style={styles.button} onPress={() => router.push("/select-hero")}>
        <Text style={styles.buttonText}>🆕 Start New Game</Text>
      </Pressable>

      {/* 🔄 Continue Game */}
      <Pressable style={styles.button} onPress={handleContinue} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Loading..." : "🔄 Continue Game"}</Text>
      </Pressable>

      <FloatingMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "PressStart2P",
    fontSize: 18,
    color: "#25be38",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#ccc",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4b0082",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#fff",
  },
  backButtonText: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#25be38",
    letterSpacing: 1,
  },
});
