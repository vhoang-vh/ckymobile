import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { usePets } from "../../context/PetContext";
import { formatDate } from "../../utils/formatters";

export function HealthRecordScreen({ navigation, route }: any) {
  const { pets } = usePets();
  const pet = pets.find((item) => item.id === route.params?.petId) ?? pets[0];
  if (!pet) return <View style={styles.screen}><Text style={styles.empty}>Chưa có hồ sơ thú cưng.</Text></View>;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={`Sức khỏe của ${pet.name}`} subtitle={`${pet.breed} · ${pet.weight} kg`} onBack={() => navigation.goBack()} />
      <View style={styles.notice}><Text style={styles.noticeTitle}>Tiền sử sức khỏe</Text><Text style={styles.noticeText}>{pet.medicalHistory}</Text></View>
      <Text style={styles.section}>Lịch sử chăm sóc</Text>
      {pet.healthRecords.length ? pet.healthRecords.map((record) => (
        <View key={record.id} style={styles.record}>
          <View style={styles.dot} />
          <View style={styles.recordCopy}>
            <Text style={styles.recordTitle}>{record.title}</Text>
            <Text style={styles.recordSub}>{record.type} · {formatDate(record.date)}</Text>
            {record.nextDueDate ? <Text style={styles.reminder}>Nhắc tiếp theo: {formatDate(record.nextDueDate)}</Text> : null}
            {record.note ? <Text style={styles.recordSub}>{record.note}</Text> : null}
          </View>
        </View>
      )) : <Text style={styles.empty}>Chưa có lịch sử tiêm phòng hoặc chăm sóc.</Text>}
      <View style={styles.reminderCard}><Text style={styles.reminderTitle}>💡 Nhắc nhở chăm sóc</Text><Text style={styles.recordSub}>Cập nhật lịch tiêm vaccine, tẩy giun và thuốc định kỳ để không bỏ lỡ lịch chăm sóc quan trọng.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15 },
  notice: { backgroundColor: colors.peach, padding: 15, borderRadius: 16, marginBottom: 21 },
  noticeTitle: { color: colors.ink, fontWeight: "800", marginBottom: 5 },
  noticeText: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  section: { fontSize: 17, color: colors.ink, fontWeight: "800", marginBottom: 13 },
  record: { flexDirection: "row", gap: 12, paddingBottom: 20, marginLeft: 5 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.teal, marginTop: 3 },
  recordCopy: { flex: 1, gap: 4, paddingBottom: 10, borderBottomWidth: 1, borderColor: colors.border },
  recordTitle: { color: colors.ink, fontWeight: "800", fontSize: 14 },
  recordSub: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  reminder: { color: colors.tealDark, fontSize: 12, fontWeight: "700", marginTop: 2 },
  reminderCard: { backgroundColor: "#fff", padding: 15, borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginTop: 8, gap: 7 },
  reminderTitle: { color: colors.ink, fontWeight: "800" },
  empty: { color: colors.muted, padding: 16 },
});
