// 📦 Core imports for layout and text rendering
import { View, Text, StyleSheet } from "react-native";

// 🌍 Global state for accessing the current hero
import { useHero } from "../context/HeroContext";

// 🎛️ Persistent bottom-right menu
import FloatingMenu from "../components/FloatingMenu";

// 🗺️ Map screen component
export default function MapScreen() {
  // ⚔️ Load the current hero from global state
  const { hero } = useHero();

  // ❌ Display fallback if no hero is set
  if (!hero) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hero loaded.</Text>
      </View>
    );
  }

  // ✅ Display hero HUD and map screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Battle Map</Text>

      {/* 🧾 Hero overview */}
      <View style={styles.heroCard}>
        <Text style={styles.heroName}>{hero.name}</Text>
        <Text style={styles.stat}>⚔️ Strength: {hero.strength}</Text>
        <Text style={styles.stat}>🏃 Dexterity: {hero.dexterity}</Text>
        <Text style={styles.stat}>❤️ HP: {hero.hp}</Text>
        <Text style={styles.stat}>🧠 Intelligence: {hero.intelligence}</Text>
      </View>

      {/* 🎛️ Global floating menu */}
      <FloatingMenu />
    </View>
  );
}
const styles = StyleSheet.create({
    // 🧱 Page layout container
    container: {
      flex: 1,
      backgroundColor: "#1e1e2f",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  
    // 🏷️ Page title
    title: {
      fontFamily: "PressStart2P",
      fontSize: 16,
      color: "#25be38",
      marginBottom: 20,
      textAlign: "center",
    },
  
    // 🧾 Hero info card
    heroCard: {
      backgroundColor: "#333",
      borderColor: "#25be38",
      borderWidth: 2,
      borderRadius: 12,
      padding: 16,
      width: "90%",
      alignItems: "center",
      marginBottom: 30,
    },
  
    // 🧙 Hero name styling
    heroName: {
      fontFamily: "PressStart2P",
      fontSize: 14,
      color: "#a64ac9",
      marginBottom: 10,
      textAlign: "center",
    },
  
    // 📊 Stat labels
    stat: {
      fontFamily: "PressStart2P",
      fontSize: 10,
      color: "#ccc",
      marginVertical: 2,
      textAlign: "center",
    },
  
    // ❌ Error message styling
    errorText: {
      fontFamily: "PressStart2P",
      fontSize: 10,
      color: "red",
      textAlign: "center",
    },
  });
  