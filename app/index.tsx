// Core imports for building the landing screen
import { ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router"; // Used for page routing
import { Audio } from "expo-av";         // Used for background music
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";    // Load custom fonts
import { supabase } from "../lib/supabase";

// Disable default Expo Router header
export const unstable_settings = {
  initialRouteName: "index",
};

export const screenOptions = {
  headerShown: false,
};

// Landing page component
export default function HomeScreen() {
  const router = useRouter(); // Used to navigate to /signup or /login
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Audio playback object
  const [isPlaying, setIsPlaying] = useState(false);            // Is music currently playing
  const [isMuted, setIsMuted] = useState(false);                // Is music currently muted

  // Load custom font
  const [fontsLoaded] = useFonts({
    PressStart2P: require("../assets/fonts/PressStart2P-Regular.ttf"),
    
  });
 // ✅ SESSION CHECK - moved inside component
 useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.replace("/select-hero"); // Redirect if already logged in
    }
  };

  checkSession();
}, []);

  // Load and prepare music on component mount
  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/retro_game_level_1.mp3"),
        { isLooping: true } // Loop music continuously
      );
      setSound(newSound);
    };

    loadSound();

    return () => {
      sound?.unloadAsync(); // Clean up sound when unmounting
    };
  }, []);

  // Start the music on first user interaction
  const startMusic = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  // Toggle mute/unmute
  const toggleMute = async () => {
    if (sound && isPlaying) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync(); // Pause the music
      } else {
        await sound.playAsync(); // Resume the music
      }
      setIsMuted(!isMuted);
    }
  };

  // Don’t render until font is loaded
  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")} // Your retro battle background
      style={styles.background}
      imageStyle={styles.bgImage}
    >
      {/* Transparent top navbar overlay (optional) */}
      <View style={styles.navbar} />

      {/* Title and main action buttons in center */}
      <View style={styles.container}>
        <Text style={styles.title}>🏹 HeadGames 🐎</Text>
        <Text style={styles.subtitle}>⚔️ War of Words 🛡️</Text>

        {/* Navigate to signup screen */}
        <Pressable style={styles.button} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>➕ Create Account</Text>
        </Pressable>

        {/* Navigate to login screen */}
        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>🔐 Login</Text>
        </Pressable>
      </View>

      {/* Music controls in the bottom-right */}
      <View style={styles.audioControls}>
        <Pressable style={styles.audioButton} onPress={startMusic}>
          <Text style={styles.buttonText}>▶️</Text>
        </Pressable>
        <Pressable style={styles.audioButton} onPress={toggleMute}>
          <Text style={styles.buttonText}>{isMuted ? "🔇" : "🔊"}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

// Styles for the landing screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    resizeMode: "cover", // Fill the background
  },
  navbar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "transparent", // Shows background image through the navbar
    zIndex: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay to enhance text visibility
  },
  title: {
    fontSize: 40,
    fontFamily: "PressStart2P",
    color: "#a64ac9", // Retro purple
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "PressStart2P",
    color: "#25be38", // Neon green
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4b0082",
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
  audioControls: {
    position: "absolute",
    bottom: 30,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  audioButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 10,
  },
});
