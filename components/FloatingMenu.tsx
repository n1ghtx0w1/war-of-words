import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { Audio } from "expo-av";                // 🎵 Music playback
import { useEffect, useState } from "react";    // 🧠 React state and lifecycle
import { useRouter } from "expo-router";        // 🚦 Navigation between screens
import { supabase } from "../lib/supabase";     // 🔐 Supabase auth client
import * as Haptics from "expo-haptics";        // 📳 Native haptic feedback

// 🌟 FloatingMenu Component: Persistent bottom-right controls for music and logout
export default function FloatingMenu() {
  const router = useRouter(); // 🌍 Routing handler
  const [sound, setSound] = useState<Audio.Sound | null>(null); // 🔊 Audio object reference
  const [isPlaying, setIsPlaying] = useState(false);            // 🎶 Music playing state
  const [isMuted, setIsMuted] = useState(false);                // 🔇 Mute toggle

  // 🔁 Load and prepare background music on component mount
  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/retro_game_level_1.mp3"),
        { isLooping: true } // ♾️ Loop music
      );
      setSound(newSound);
    };

    loadSound();

    // 🧼 Cleanup: unload sound when component is removed
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  // ▶️ Start background music
  const startMusic = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsMuted(false); // Reset mute toggle
    }
  };

  // 🔇 Toggle mute/unmute music
  const toggleMute = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();  // ⏸️ Pause
      } else {
        await sound.playAsync();   // ▶️ Resume
      }
      setIsMuted(!isMuted);
    }
  };

  // 🚪 Log out user and return to landing screen
  const logout = async () => {
    if (Platform.OS !== "web") {
      await Haptics.selectionAsync(); // 📳 Vibration on native
    }
    await supabase.auth.signOut();    // 📴 Supabase session end
    router.replace("/");              // 🔁 Redirect to login
  };

  // 🧭 UI layout: floating vertical button menu in bottom-right corner
  return (
    <View style={styles.menu}>
      {/* ▶️ Play Music Button */}
      <Pressable onPress={startMusic} disabled={isPlaying}>
        <Text style={[styles.menuText, isPlaying && { opacity: 0.5 }]}>▶️</Text>
      </Pressable>

      {/* 🔊 Toggle Mute Button */}
      <Pressable onPress={toggleMute}>
        <Text style={styles.menuText}>{isMuted ? "🔇" : "🔊"}</Text>
      </Pressable>

      {/* 🚪 Logout Button */}
      <Pressable onPress={logout}>
        <Text style={styles.menuText}>🚪</Text>
      </Pressable>
    </View>
  );
}

// 🎨 Styling for FloatingMenu layout and icons
const styles = StyleSheet.create({
  menu: {
    position: "absolute",   // ⬇️ Fix to bottom-right
    bottom: 20,
    right: 20,
    flexDirection: "column", // 🧱 Stack buttons vertically
    alignItems: "center",
    gap: 12,
    zIndex: 999,             // 🧮 Stay on top
  },
  menuText: {
    fontSize: 22,
    backgroundColor: "#222",   // Dark gray
    color: "#25be38",          // Neon green
    padding: 10,
    borderRadius: 10,
    fontFamily: "PressStart2P", // Retro pixel font
  },
});