import React from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { PetCard } from "../../components/PetCard";
import { colors } from "../../components/theme";
import { usePets } from "../../context/PetContext";

export function PetListScreen({ navigation }: any) {
  const { pets, deletePet } = usePets();
  const confirmDelete = (petId: string, petName: string) => {
    Alert.alert("Xóa hồ sơ thú cưng?", `Hồ sơ của ${petName} sẽ bị xóa khỏi thiết bị.`, [
      { text: "Không", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: () => deletePet(petId) },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Header title="Thú cưng của tôi" subtitle={`${pets.length} hồ sơ đang được quản lý`} />
      {pets.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyIcon}>🐾</Text><Text style={styles.emptyTitle}>Chưa có hồ sơ thú cưng</Text><Text style={styles.emptyText}>Thêm thông tin để bắt đầu theo dõi sức khỏe và đặt lịch.</Text></View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View>
              <PetCard pet={item} onPress={() => navigation.navigate("HealthRecord", { petId: item.id })} />
              <View style={styles.actions}>
                <Pressable onPress={() => navigation.navigate("HealthRecord", { petId: item.id })} style={styles.action}><MaterialCommunityIcons name="clipboard-pulse-outline" size={17} color={colors.teal} /><Text style={styles.actionText}>Sổ sức khỏe</Text></Pressable>
                <Pressable onPress={() => confirmDelete(item.id, item.name)} style={styles.action}><MaterialCommunityIcons name="trash-can-outline" size={17} color={colors.red} /><Text style={[styles.actionText, { color: colors.red }]}>Xóa hồ sơ</Text></Pressable>
              </View>
            </View>
          )}
        />
      )}
      <Button title="+  Thêm thú cưng" onPress={() => navigation.navigate("AddPet")} style={styles.addButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 16 },
  list: { paddingBottom: 92 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: -7, marginBottom: 14, paddingHorizontal: 10 },
  action: { flexDirection: "row", alignItems: "center", gap: 5, padding: 5 },
  actionText: { color: colors.teal, fontSize: 12, fontWeight: "700" },
  addButton: { position: "absolute", bottom: 20, left: 20, right: 20 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30, paddingBottom: 50 },
  emptyIcon: { fontSize: 52, marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontWeight: "800", fontSize: 17 },
  emptyText: { color: colors.muted, textAlign: "center", marginTop: 7, lineHeight: 20 },
});
