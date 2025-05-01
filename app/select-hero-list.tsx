import { View, Text, FlatList, Image, Pressable, StyleSheet, Alert, Modal } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import FloatingMenu from "../components/FloatingMenu";
import { useHero } from "../context/HeroContext";

async function loadHeroes() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error("Failed to load heroes");
  return data;
}

export default function SelectHeroListScreen() {
  const router = useRouter();
  const { setHero } = useHero();
  const [heroes, setHeroes] = useState([]);
  const [heroToDelete, setHeroToDelete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadHeroes().then(setHeroes).catch(console.error);
  }, []);

  const heroImages = {
    light_male_melee: require("../assets/images/heroes/light_male_melee.png"),
    light_male_archer: require("../assets/images/heroes/light_male_archer.png"),
    light_male_cavalry: require("../assets/images/heroes/light_male_cavalry.png"),
    light_female_melee: require("../assets/images/heroes/light_female_melee.png"),
    light_female_archer: require("../assets/images/heroes/light_female_archer.png"),
    light_female_cavalry: require("../assets/images/heroes/light_female_cavalry.png"),
    dark_male_melee: require("../assets/images/heroes/dark_male_melee.png"),
    dark_male_archer: require("../assets/images/heroes/dark_male_archer.png"),
    dark_male_cavalry: require("../assets/images/heroes/dark_male_cavalry.png"),
    dark_female_melee: require("../assets/images/heroes/dark_female_melee.png"),
    dark_female_archer: require("../assets/images/heroes/dark_female_archer.png"),
    dark_female_cavalry: require("../assets/images/heroes/dark_female_cavalry.png"),
  };
  

  const confirmDelete = async () => {
    if (!heroToDelete) return;
    try {
      const { error } = await supabase.from("heroes").delete().eq("id", heroToDelete.id);
      if (error) {
        Alert.alert("Error", "Failed to delete hero.");
        return;
      }
      setHeroes((prev) => prev.filter((h) => h.id !== heroToDelete.id));
    } catch (e) {
      Alert.alert("Error", "Unexpected error during deletion.");
    } finally {
      setModalVisible(false);
      setHeroToDelete(null);
    }
  };

  const handlePlay = (hero) => {
    setHero(hero);
    router.replace("/map");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace("/choose-mode")} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙 Back</Text>
      </Pressable>

      <View style={{ height: 80 }} />

      <FlatList
        data={heroes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={heroImages[item.class]} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.stat}>
              ⚔️ {item.strength} | 🏃 {item.dexterity} | ❤️ {item.hp} | 🧠 {item.intelligence}
            </Text>
            <View style={styles.buttons}>
              <Pressable style={styles.playBtn} onPress={() => handlePlay(item)}>
                <Text style={styles.btnText}>▶️ Play</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={() => {
                setHeroToDelete(item);
                setModalVisible(true);
              }}>
                <Text style={[styles.btnText, { fontSize: 14 }]}>🗑️ Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Delete {heroToDelete?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.playBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={confirmDelete}>
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <FloatingMenu />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    padding: 16,
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    borderColor: "#25be38",
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#a64ac9",
    marginBottom: 6,
  },
  stat: {
    fontFamily: "PressStart2P",
    fontSize: 8,
    color: "#ccc",
    marginBottom: 10,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  playBtn: {
    backgroundColor: "#4b0082",
    padding: 10,
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: "#8b0000",
    padding: 10,
    borderRadius: 10,
  },  
  btnText: {
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
  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    borderColor: "#25be38",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
});
