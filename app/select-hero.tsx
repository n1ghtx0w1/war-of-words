// 📦 Imports
import { View, Text, Pressable, StyleSheet, Image, FlatList, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router"; // Navigation
import { supabase } from "../lib/supabase"; // Auth
import FloatingMenu from "../components/FloatingMenu"; // Music / Logout Menu

// 🧙 List of Heroes with images and labels
const HEROES = [
  { id: "light_male_melee", label: "🗡️ Melee ♂️", image: require("../assets/images/heroes/light_male_melee.png") },
  { id: "light_male_archer", label: "🏹 Ranged ♂️", image: require("../assets/images/heroes/light_male_archer.png") },
  { id: "light_male_cavalry", label: "🐎 Cavalry ♂️", image: require("../assets/images/heroes/light_male_cavalry.png") },
  
  { id: "light_female_melee", label: "🗡️ Melee ♀️", image: require("../assets/images/heroes/light_female_melee.png") },
  { id: "light_female_archer", label: "🏹 Ranged ♀️", image: require("../assets/images/heroes/light_female_archer.png") },
  { id: "light_female_cavalry", label: "🐎 Cavalry ♀️", image: require("../assets/images/heroes/light_female_cavalry.png") },
  
  { id: "dark_male_melee", label: "🗡️ Melee ♂️", image: require("../assets/images/heroes/dark_male_melee.png") },
  { id: "dark_male_archer", label: "🏹 Ranged ♂️", image: require("../assets/images/heroes/dark_male_archer.png") },
  { id: "dark_male_cavalry", label: "🐎 Cavalry ♂️", image: require("../assets/images/heroes/dark_male_cavalry.png") },
  
  { id: "dark_female_melee", label: "🗡️ Melee ♀️", image: require("../assets/images/heroes/dark_female_melee.png") },
  { id: "dark_female_archer", label: "🏹 Ranged ♀️", image: require("../assets/images/heroes/dark_female_archer.png") },
  { id: "dark_female_cavalry", label: "🐎 Cavalry ♀️", image: require("../assets/images/heroes/dark_female_cavalry.png") },
];

// 🚀 Main Screen
export default function SelectHeroScreen() {
  const router = useRouter();
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);

  // 🔒 Handle user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  // ✅ Confirm hero selection
  const confirmSelection = () => {
    if (!selectedHeroId) {
      Alert.alert("Pick a Hero", "Please select a hero to continue.");
      return;
    }

    // Push to hero naming screen
    router.push({
      pathname: "/hero-name",
      params: { heroId: selectedHeroId },
    });    
  };

  return (
    <>
      {/* 🔙 Back Button to Choose Mode */}
      <Pressable onPress={() => router.replace("/choose-mode")} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>
  
      {/* 📜 Main Container */}
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Hero</Text>
  
        {/* 🎨 Grid of Heroes */}
        <FlatList
          data={HEROES}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.heroGrid}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.heroButton,
                selectedHeroId === item.id && styles.selected,
              ]}
              onPress={() => setSelectedHeroId(item.id)}
            >
              <Image source={item.image} style={styles.heroImage} />
              <Text style={styles.heroText}>{item.label}</Text>
            </Pressable>
          )}
        />
  
        {/* ✅ Confirm Button */}
        <Pressable style={styles.confirmButton} onPress={confirmSelection}>
          <Text style={styles.buttonText}>✅ Confirm Hero</Text>
        </Pressable>
  
        {/* 🚪 Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </Pressable>

        {/* 🎵 Floating Music / Menu Control */}
        <FloatingMenu />
      </View>
    </>
  );
}

//////////////////////////
// 🎨 Styles
//////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontFamily: "PressStart2P",
    fontSize: 16,
    color: "#25be38",
    marginBottom: 16,
    textAlign: "center",
  },
  heroGrid: {
    gap: 12,
    paddingBottom: 20,
  },
  heroButton: {
    backgroundColor: "#4b0082",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    borderWidth: 2,
    borderColor: "transparent",
    width: 120,
  },
  selected: {
    borderColor: "#25be38", // Highlight border when selected
  },
  heroImage: {
    width: 80,
    height: 100,
    marginBottom: 6,
  },
  heroText: {
    fontFamily: "PressStart2P",
    fontSize: 9,
    color: "#fff",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#25be38",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#000",
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#222",
    borderColor: "#25be38",
    borderWidth: 2,
    borderRadius: 10,
  },
  logoutText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#25be38",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: "#222",
    borderColor: "#25be38",
    borderWidth: 2,
    borderRadius: 12,
    zIndex: 99,
  },
  backButtonText: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#25be38",
    letterSpacing: 1,
  },
});
