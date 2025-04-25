// Imports
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase"; // Supabase client
import { useRouter } from "expo-router";   // Used for navigation between screens

// Main login screen component
export default function LoginScreen() {
  const router = useRouter(); // Used to programmatically navigate between routes
  const [loginError, setLoginError] = useState("");

  // State variables to hold form input and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login when the button is pressed
  const handleLogin = async () => {
    setLoginError(""); // Clear old errors
    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }
  
    setLoading(true);
  
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error || !data?.session) {
      if (error?.message.toLowerCase().includes("invalid login credentials")) {
        setLoginError("Username or Password is Incorrect!");
      } else if (error?.message.toLowerCase().includes("email")) {
        setLoginError("No account found with that email.");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } else {
      router.replace("/choose-mode");
    }
  
    setLoading(false);
  };
  
  

  return (
    <>
      {/* Back button to return to the landing page */}
      <Pressable onPress={() => router.replace("/")} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>

      {/* Main login form */}
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // hides password input
        />

      {/* Error message displayed right below inputs */}
      {loginError !== "" && (
      <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{loginError}</Text>
      </View>
      )}


        {/* Submit button */}
        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
        </Pressable>
      </View>
    </>
  );
}

// Styling using React Native's StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f", // dark theme background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "PressStart2P", // retro font
    color: "#25be38", // neon green
    marginBottom: 24,
    textAlign: "center",
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
    fontSize: 12, // 🔼 increased from 10
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
    top: 20,
    left: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: "#222", // dark base
    borderColor: "#25be38", // green border
    borderWidth: 2,
    borderRadius: 12,
    zIndex: 99,
  },
  backButtonText: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#25be38", // neon green text
    letterSpacing: 1,
  },
  errorContainer: {
    width: 320,           // match input width
    maxWidth: "90%",
    alignItems: "center", // horizontal centering
    marginBottom: 10,
  },  
  errorText: {
    color: "#ff4444",
    fontSize: 10,
    fontFamily: "PressStart2P",
    marginBottom: 12,
    textAlign: "left",
  },  
});
