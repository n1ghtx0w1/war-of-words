// components/FloatingMenu.tsx

// 📦 Import core libraries and components
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av"; // 🎵 Used for sound control
import { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // 🚦 Used for navigation
import { supabase } from "../lib/supabase"; // 🔐 Authentication service
import * as Haptics from "expo-haptics";

// 🌟 Floating menu component with music and logout controls
export default function FloatingMenu() {
    const router = useRouter(); // Used to navigate (logout)
    const [sound, setSound] = useState<Audio.Sound | null>(null); // Music playback object
    const [isPlaying, setIsPlaying] = useState(false); // Is music playing
    const [isMuted, setIsMuted] = useState(false); // Is music muted  

  // 🔁 Load background music when the component mounts
  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/retro_game_level_1.mp3"),
        { isLooping: true } // Loop music indefinitely
      );
      setSound(newSound);
    };

    loadSound();

    // 🔄 Cleanup on unmount
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const startMusic = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsMuted(false); // Optional: Reset muted state when started
    }
  };
  
  // 🔇 Toggle music play/pause state
  const toggleMute = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync(); // Pause music
      } else {
        await sound.playAsync();  // Resume music
      }
      setIsMuted(!isMuted);
    }
  };

  // 🚪 Sign the user out and return to landing screen
  const logout = async () => {
    await Haptics.selectionAsync();        // Light tap feedback
    await supabase.auth.signOut();         // Sign out from Supabase
    router.replace("/");                   // Navigate to landing
  };
  
  // 🧭 Render the floating button menu in the bottom-right
  return (
    <View style={styles.menu}>
      {/* ▶️ Start Music */}
    <Pressable onPress={startMusic} disabled={isPlaying}>
    <Text style={[styles.menuText, isPlaying && { opacity: 0.5 }]}>▶️</Text>
    </Pressable>


      {/* 🔊 / 🔇 Toggle Mute */}
      <Pressable onPress={toggleMute}>
        <Text style={styles.menuText}>{isMuted ? "🔇" : "🔊"}</Text>
      </Pressable>

      {/* 🚪 Logout */}
      <Pressable onPress={logout}>
        <Text style={styles.menuText}>🚪</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    // 📍 Position menu in the bottom-right
    menu: {
      position: "absolute",
      bottom: 20,
      right: 20,
      flexDirection: "column", // Stack vertically
      alignItems: "center",
      gap: 12, // Space between buttons
      zIndex: 999, // Always on top
    },
  
    // 🧱 Style for each button icon
    menuText: {
      fontSize: 22, // Icon size
      backgroundColor: "#222", // Dark background
      color: "#25be38", // Neon green text
      padding: 10,
      borderRadius: 10,
      fontFamily: "PressStart2P", // Retro font
    },
  });
  