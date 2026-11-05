import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { BookingCard } from "../../components/BookingCard";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { useBookings } from "../../context/BookingContext";
import { BookingStatus } from "../../types";

const tabs: { key: BookingStatus; label: string }[] = [
  { key: "upcoming", label: "Sắp tới" },
  { key: "completed", label: "Hoàn thành" },
  { key: "cancelled", label: "Đã hủy" },
];

export function BookingHistoryScreen({ navigation }: any) {
  const { bookings, cancelBooking } = useBookings();
  const [status, setStatus] = useState<BookingStatus>("upcoming");
  const selected = bookings.filter((booking) => booking.status === status);
  const requestCancel = (bookingId: string, date: string, time: string) => {
    const appointmentTime = new Date(`${date}T${time}:00`);
    if (appointmentTime <= new Date()) {
      Alert.alert("Không thể hủy lịch", "Lịch hẹn đã đến giờ hoặc đã qua.");
      return;
    }
    Alert.alert("Hủy lịch hẹn?", "Bạn có chắc muốn hủy lịch này không?", [
      { text: "Giữ lịch", style: "cancel" },
      { text: "Xác nhận hủy", style: "destructive", onPress: () => cancelBooking(bookingId) },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Header title="Lịch hẹn của tôi" subtitle="Theo dõi và quản lý các dịch vụ đã đặt" />
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Text key={tab.key} onPress={() => setStatus(tab.key)} style={[styles.tab, status === tab.key && styles.tabActive]}>{tab.label}</Text>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {selected.length ? selected.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onCancel={() => requestCancel(booking.id, booking.date, booking.time)} onPress={() => Alert.alert(`Lịch hẹn ${booking.id}`, `${booking.serviceName}\n${booking.clinicName}\n${booking.clinicAddress}\nHotline: ${booking.clinicPhone}\nNhân viên: ${booking.staffName}`)} />
        )) : (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>{status === "upcoming" ? "🗓️" : status === "completed" ? "✨" : "🐾"}</Text>
            <Text style={styles.emptyTitle}>Chưa có lịch hẹn</Text>
            <Text style={styles.emptySub}>Danh sách lịch {tabs.find((item) => item.key === status)?.label.toLowerCase()} sẽ hiển thị tại đây.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  tabs: { flexDirection: "row", backgroundColor: "#EAF0EE", borderRadius: 14, padding: 4, marginBottom: 16 },
  tab: { flex: 1, textAlign: "center", color: colors.muted, fontSize: 11, fontWeight: "700", paddingVertical: 11, borderRadius: 11, overflow: "hidden" },
  tabActive: { backgroundColor: "#fff", color: colors.tealDark },
  list: { paddingBottom: 25, flexGrow: 1 },
  empty: { flex: 1, minHeight: 300, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontWeight: "800", fontSize: 17 },
  emptySub: { color: colors.muted, textAlign: "center", fontSize: 13, lineHeight: 19, marginTop: 6 },
});
