import { ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";

export const unstable_settings = {
  initialRouteName: "index",
};

export const screenOptions = {
  headerShown: false,
};

export default function HomeScreen() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [fontsLoaded] = useFonts({
    PressStart2P: require("../assets/fonts/PressStart2P-Regular.ttf"),
  });

  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/music/retro_game_level_1.mp3"),
        { isLooping: true }
      );
      setSound(newSound);
    };

    loadSound();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const startMusic = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const toggleMute = async () => {
    if (sound && isPlaying) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsMuted(!isMuted);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.background}
      imageStyle={styles.bgImage}
    >
      <View style={styles.navbar} />

      <View style={styles.container}>
        <Text style={styles.title}>🏹 HeadGames 🐎</Text>
        <Text style={styles.subtitle}>⚔️ War of Words 🛡️</Text>

        <Pressable style={styles.button} onPress={() => router.push("/signup")}>
          <Text style={styles.buttonText}>➕ Create Account</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>🔐 Login</Text>
        </Pressable>
      </View>

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
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  title: {
    fontSize: 40,
    fontFamily: "PressStart2P",
    color: "#a64ac9", // retro purple
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "PressStart2P",
    color: "#25be38", // neon green
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
