import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pet } from "../types";
import { colors } from "./theme";

export function PetCard({ pet, onPress }: { pet: Pet; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.detail}>{pet.breed} · {pet.age} tuổi</Text>
        <Text style={styles.weight}>{pet.weight} kg · {pet.gender}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 18, marginBottom: 12, gap: 13, borderWidth: 1, borderColor: colors.border },
  image: { width: 68, height: 68, borderRadius: 16, backgroundColor: colors.mint },
  content: { flex: 1, gap: 4 },
  name: { color: colors.ink, fontWeight: "800", fontSize: 16 },
  detail: { color: colors.muted, fontSize: 13 },
  weight: { color: colors.tealDark, fontSize: 12, fontWeight: "600" },
  chevron: { color: colors.muted, fontSize: 27, paddingHorizontal: 5 },
});
