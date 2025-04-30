// 🧱 Core landing screen setup
import { ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router"; // 🌐 Navigation
import { useFonts } from "expo-font";    // 🧾 Load retro font
import { supabase } from "../lib/supabase"; // 🔐 Auth
import { useEffect } from "react";       // 🌀 Lifecycle hook

// ⚙️ Expo Router config
export const unstable_settings = {
  initialRouteName: "index",
};

export const screenOptions = {
  headerShown: false,
};

// 🏠 Landing page component
export default function HomeScreen() {
  const router = useRouter();

  // 🧾 Load retro pixel font
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../assets/fonts/PressStart2P-Regular.ttf"),
  });

  // 🔐 Auto-login check
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/select-hero"); // 🚀 Skip login if session is active
      }
    };
    checkSession();
  }, []);

  // 💤 Wait for font before rendering
  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")} // 🌄 Retro splash image
      style={styles.background}
      imageStyle={styles.bgImage}
    >
      {/* 🔲 Optional top nav overlay */}
      <View style={styles.navbar} />

      {/* 🧱 Page content */}
      <View style={styles.container}>
        <Text style={styles.title}>🏹 HeadGames 🐎</Text>
        <Text style={styles.subtitle}>⚔️ War of Words 🛡️</Text>

        {/* ➕ Account creation */}
        <Pressable style={styles.button} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>➕ Create Account</Text>
        </Pressable>

        {/* 🔐 Login */}
        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>🔐 Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

// 🎨 Styles for the landing screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    resizeMode: "cover",
  },
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.6)", // 🕶️ Dark overlay
  },
  title: {
    fontSize: 40,
    fontFamily: "PressStart2P",
    color: "#a64ac9", // 💜 Retro purple
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "PressStart2P",
    color: "#25be38", // 💚 Neon green
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4b0082", // 🟣 Indigo
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "PressStart2P",
  },
});
