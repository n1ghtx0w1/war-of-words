// Imports for components, hooks, navigation, and Supabase
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase"; // Supabase client connection
import { useRouter } from "expo-router";   // Routing helper

// Signup screen component
export default function SignupScreen() {
  const router = useRouter();

  // State to track form inputs and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Called when "Create Account" button is pressed
  const handleSignup = async () => {
    // Basic empty check
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Minimum password length check
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password should be at least 6 characters.");
      return;
    }

    setLoading(true); // Show loading state

    // Call Supabase to create a new account
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Signup Error", error.message);
    } else {
      Alert.alert("Account Created", "Check your email to confirm.");
      router.replace("/login"); // After sign-up, go to login screen
    }

    setLoading(false); // Hide loading state
  };

  return (
    <>
      {/* Back button to go back to landing page */}
      <Pressable onPress={() => router.replace("/")} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>

      {/* Main form */}
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Hides password input
        />

        {/* Submit button */}
        <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? "Creating..." : "Create Account"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

// Styles for the screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f", // dark background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "PressStart2P",
    color: "#25be38", // green title
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: 320, // ~50 characters
    maxWidth: "90%",
    borderWidth: 1,
    borderColor: "#4b0082", // purple outline
    backgroundColor: "#000", // black input bg
    color: "#fff",
    fontFamily: "PressStart2P",
    padding: 10,
    fontSize: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#4b0082", // purple button
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
    top: 20, // pushed near top
    left: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: "#222",
    borderColor: "#25be38", // neon green border
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
