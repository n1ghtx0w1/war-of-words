import { View, Text, Pressable, StyleSheet, Image, FlatList, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import FloatingMenu from "../components/FloatingMenu";

const HEROES = [
  { id: "light_male_melee", label: "🗡️ Melee", image: require("../assets/images/heroes/light_male_melee.png") },
  { id: "light_male_archer", label: "🏹 Ranged", image: require("../assets/images/heroes/light_male_archer.png") },
  { id: "light_male_cavalry", label: "🐎 Cavalry", image: require("../assets/images/heroes/light_male_cavalry.png") },
  { id: "light_female_melee", label: "🗡️ Melee", image: require("../assets/images/heroes/light_female_melee.png") },
  { id: "light_female_archer", label: "🏹 Ranged", image: require("../assets/images/heroes/light_female_archer.png") },
  { id: "light_female_cavalry", label: "🐎 Cavalry", image: require("../assets/images/heroes/light_female_cavalry.png") },
  { id: "dark_male_melee", label: "🗡️ Melee", image: require("../assets/images/heroes/dark_male_melee.png") },
  { id: "dark_male_archer", label: "🏹 Ranged", image: require("../assets/images/heroes/dark_male_archer.png") },
  { id: "dark_male_cavalry", label: "🐎 Cavalry", image: require("../assets/images/heroes/dark_male_cavalry.png") },
  { id: "dark_female_melee", label: "🗡️ Melee", image: require("../assets/images/heroes/dark_female_melee.png") },
  { id: "dark_female_archer", label: "🏹 Ranged", image: require("../assets/images/heroes/dark_female_archer.png") },
  { id: "dark_female_cavalry", label: "🐎 Cavalry", image: require("../assets/images/heroes/dark_female_cavalry.png") },
];

export default function SelectHeroScreen() {
  const router = useRouter();
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const confirmSelection = () => {
    if (!selectedHeroId) {
      Alert.alert("Pick a Hero", "Please select a hero to continue.");
      return;
    }

    router.push({
      pathname: "/hero-name",
      params: { heroId: selectedHeroId },
    });    
    // TODO: Store selectedHeroId to Supabase or user state
    // router.push("/next-screen");
  };

  return (
    <>
      {/* Back button in top-left */}
      <Pressable onPress={() => router.replace("/choose-mode")} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>
  
      {/* Main container */}
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Hero</Text>
  
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
  
        {/* Confirm selection button */}
        <Pressable style={styles.confirmButton} onPress={confirmSelection}>
          <Text style={styles.buttonText}>✅ Confirm Hero</Text>
        </Pressable>
  
        {/* Logout */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </Pressable>
        <FloatingMenu />
      </View>
    </>
  );
}  



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
    padding: 12, // was 8
    borderRadius: 10,
    alignItems: "center",
    margin: 10, // slight bump from 8
    borderWidth: 2,
    borderColor: "transparent",
    width: 120, // was 96
  },  
  selected: {
    borderColor: "#25be38", // Highlight selection
  },
  heroImage: {
    width: 80,  // was 64
    height: 100, // was 80
    marginBottom: 6, // just a tiny bump
  },  
  heroText: {
    fontFamily: "PressStart2P",
    fontSize: 9,  // was 8
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
