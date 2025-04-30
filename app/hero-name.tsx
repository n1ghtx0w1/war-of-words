// 📦 Core imports for React Native components
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from "react-native";
import { useState } from "react";
import { useHero } from "../context/HeroContext";

// 🚦 Navigation hooks
import { useRouter, useLocalSearchParams } from "expo-router";

// 🌟 Reusable floating menu with logout/music controls
import FloatingMenu from "../components/FloatingMenu";

// 🔐 Supabase client for auth/database
import { supabase } from "../lib/supabase";

// 🎲 Utility for generating base stats by hero type
import { getHeroStats } from "../lib/heroStats";

// 🛡️ Main screen for naming and saving the new hero
export default function NameHeroScreen() {
  const router = useRouter();
  const { heroId } = useLocalSearchParams();
  const { setHero } = useHero();
  const [name, setName] = useState(""); // Hero name input

  // 🖼️ Map hero types to images
  const heroImages: Record<string, ReturnType<typeof require>> = { 
    "light_male_melee": require("../assets/images/heroes/light_male_melee.png"),
    "light_male_archer": require("../assets/images/heroes/light_male_archer.png"),
    "light_male_cavalry": require("../assets/images/heroes/light_male_cavalry.png"),
    "light_female_melee": require("../assets/images/heroes/light_female_melee.png"),
    "light_female_archer": require("../assets/images/heroes/light_female_archer.png"),
    "light_female_cavalry": require("../assets/images/heroes/light_female_cavalry.png"),
    "dark_male_melee": require("../assets/images/heroes/dark_male_melee.png"),
    "dark_male_archer": require("../assets/images/heroes/dark_male_archer.png"),
    "dark_male_cavalry": require("../assets/images/heroes/dark_male_cavalry.png"),
    "dark_female_melee": require("../assets/images/heroes/dark_female_melee.png"),
    "dark_female_archer": require("../assets/images/heroes/dark_female_archer.png"),
    "dark_female_cavalry": require("../assets/images/heroes/dark_female_cavalry.png"),
  };

  const imageSource = heroId && heroImages[heroId as string];

  // 🚀 Confirm hero creation and save to Supabase
  const handleConfirm = async () => {
    if (!name.trim()) {
      Alert.alert("Invalid Name", "Please enter a name for your hero.");
      return;
    }

    if (name.length > 20) {
      Alert.alert("Too Long", "Name must be under 20 characters.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      Alert.alert("Error", "Could not find user session.");
      return;
    }
    
    if (!heroId) {
      Alert.alert("Error", "Hero selection is missing.");
      return;
    }
    
    const heroStats = getHeroStats(heroId as string);

    const { data, error } = await supabase
    .from("heroes")
    .insert([
      {
        user_id: userData.user.id,
        name,
        class: heroId,
        strength: heroStats.strength,
        dexterity: heroStats.dexterity,
        hp: heroStats.hp,
        intelligence: heroStats.intelligence,
      },
    ])
    .select()
    .single(); // ✅ Return inserted row
  

    if (error || !data) {
      Alert.alert("Error", "Failed to save hero.");
      console.error("Supabase insert error:", error.message, error.details);
      return;
    }
    
    // ✅ Set hero in global context
    setHero(data);

    Alert.alert("Hero Created", `${name} has been created!`);
    router.replace("/map");
  };

  return (
    <>
      {/* 🔙 Back button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>

      {/* 📜 Main form */}
      <View style={styles.container}>
        <Text style={styles.title}>Name Your Hero</Text>

        {/* 🖼️ Hero preview */}
        {imageSource && (
          <Image source={imageSource} style={styles.heroImage} />
        )}

      {heroId && (
      <View style={styles.statsContainer}>
      <Text style={styles.statText}>Strength: {getHeroStats(heroId as string).strength}</Text>
      <Text style={styles.statText}>Dexterity: {getHeroStats(heroId as string).dexterity}</Text>
      <Text style={styles.statText}>HP: {getHeroStats(heroId as string).hp}</Text>
      <Text style={styles.statText}>Intelligence: {getHeroStats(heroId as string).intelligence}</Text>
      </View>
      )}

        {/* ✏️ Hero name input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Hero Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          maxLength={20}
          autoCapitalize="words"
        />

        {/* ✅ Confirm button */}
        <Pressable style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>✅ Confirm Name</Text>
        </Pressable>

        {/* 🎛️ Floating music/logout menu */}
        <FloatingMenu />
      </View>
    </>
  );
}

// 🎨 Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "PressStart2P",
    color: "#25be38",
    marginBottom: 24,
    textAlign: "center",
  },
  heroImage: {
    width: 96,
    height: 120,
    marginBottom: 20,
  },
  input: {
    width: 320,
    maxWidth: "90%",
    borderWidth: 1,
    borderColor: "#4b0082",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "PressStart2P",
    padding: 10,
    fontSize: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#4b0082",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PressStart2P",
    fontSize: 10,
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
  statsContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  statText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#ccc",
    marginVertical: 2,
  },  
});
