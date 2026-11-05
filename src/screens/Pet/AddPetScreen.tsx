import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../components/theme";
import { usePets } from "../../context/PetContext";
import { petApi } from "../../services/api";
import { Pet, PetGender, PetSpecies } from "../../types";

const speciesOptions: PetSpecies[] = ["Chó", "Mèo", "Chim", "Thỏ", "Khác"];
const genderOptions: PetGender[] = ["Đực", "Cái"];

export function AddPetScreen({ navigation }: any) {
  const { addPet } = usePets();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<PetSpecies>("Chó");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<PetGender>("Đực");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const parsedAge = Number(age);
    const parsedWeight = Number(weight);
    if (!name.trim() || !breed.trim() || !age.trim() || !weight.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên, giống loài, tuổi và cân nặng.");
      return;
    }
    if (!Number.isFinite(parsedAge) || parsedAge < 0 || !Number.isFinite(parsedWeight) || parsedWeight <= 0) {
      Alert.alert("Thông tin chưa hợp lệ", "Tuổi phải từ 0 trở lên và cân nặng phải lớn hơn 0.");
      return;
    }
    const pet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim(),
      age: parsedAge,
      weight: parsedWeight,
      gender,
      medicalHistory: medicalHistory.trim() || "Chưa ghi nhận",
      image: species === "Mèo"
        ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"
        : "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
      healthRecords: [],
    };
    setSaving(true);
    try {
      const saved = await petApi.savePet(pet);
      addPet(saved);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Không thể lưu hồ sơ", error instanceof Error ? error.message : "Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Header title="Thêm thú cưng" subtitle="Tạo hồ sơ cá nhân cho bé" onBack={() => navigation.goBack()} />
      <View style={styles.avatar}><Text style={styles.avatarEmoji}>🐾</Text><Text style={styles.avatarHint}>Ảnh đại diện sẽ được gán theo loài</Text></View>
      <Input label="Tên thú cưng *" value={name} onChangeText={setName} placeholder="Ví dụ: Bắp" />
      <Text style={styles.label}>Loài *</Text>
      <View style={styles.wrap}>{speciesOptions.map((option) => <Choice key={option} title={option} selected={species === option} onPress={() => setSpecies(option)} />)}</View>
      <Input label="Giống loài *" value={breed} onChangeText={setBreed} placeholder="Ví dụ: Corgi, mèo Anh..." />
      <View style={styles.columns}>
        <View style={styles.column}><Input label="Tuổi (năm) *" value={age} onChangeText={setAge} placeholder="2" keyboardType="decimal-pad" /></View>
        <View style={styles.column}><Input label="Cân nặng (kg) *" value={weight} onChangeText={setWeight} placeholder="8.5" keyboardType="decimal-pad" /></View>
      </View>
      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.wrap}>{genderOptions.map((option) => <Choice key={option} title={option} selected={gender === option} onPress={() => setGender(option)} />)}</View>
      <Input label="Tiền sử bệnh lý / dị ứng" value={medicalHistory} onChangeText={setMedicalHistory} placeholder="Ghi chú tình trạng sức khỏe của bé" multiline />
      <Button title="Lưu hồ sơ thú cưng" onPress={save} loading={saving} style={styles.save} />
    </ScrollView>
  );
}

function Choice({ title, selected, onPress }: { title: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}><Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15, paddingBottom: 30 },
  avatar: { alignItems: "center", marginBottom: 18, gap: 5 },
  avatarEmoji: { width: 76, height: 76, lineHeight: 76, textAlign: "center", borderRadius: 38, overflow: "hidden", backgroundColor: colors.mint, fontSize: 36 },
  avatarHint: { color: colors.muted, fontSize: 11 },
  label: { color: colors.ink, fontSize: 14, fontWeight: "600", marginBottom: 9 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  choice: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 13 },
  choiceSelected: { backgroundColor: colors.mint, borderColor: colors.teal },
  choiceText: { color: colors.ink, fontSize: 13 },
  choiceTextSelected: { color: colors.tealDark, fontWeight: "800" },
  columns: { flexDirection: "row", gap: 12 },
  column: { flex: 1 },
  save: { marginTop: 8 },
});
