import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import FloatingMenu from "../components/FloatingMenu";


export default function NameHeroScreen() {
  const router = useRouter();
  const { heroId } = useLocalSearchParams();

  const [name, setName] = useState("");

  // Hero image map
  const heroImages: Record<string, any> = {
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

  const handleConfirm = () => {
    if (!name.trim()) {
      Alert.alert("Invalid Name", "Please enter a name for your hero.");
      return;
    }

    if (name.length > 20) {
      Alert.alert("Too Long", "Name must be under 20 characters.");
      return;
    }

    Alert.alert("Character Ready", `${name} the ${heroId} has been created!`);
    // router.push("/map"); // You can navigate here next
  };

  return (
    <>
      {/* Back button like other screens */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>

      {/* Main content */}
      <View style={styles.container}>
        <Text style={styles.title}>Name Your Hero</Text>

        {imageSource && (
          <Image source={imageSource} style={styles.heroImage} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Hero Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          maxLength={20}
          autoCapitalize="words"
        />

        <Pressable style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>✅ Confirm Name</Text>
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
});
