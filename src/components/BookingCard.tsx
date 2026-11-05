import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Booking } from "../types";
import { formatCurrency, formatDate } from "../utils/formatters";
import { colors } from "./theme";

const statusLabels = { upcoming: "Sắp tới", completed: "Hoàn thành", cancelled: "Đã hủy" };

export function BookingCard({ booking, onCancel, onPress }: { booking: Booking; onCancel?: () => void; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.top}>
        <View style={styles.titleWrap}>
          <Text style={styles.service}>{booking.serviceName}</Text>
          <Text style={styles.clinic}>{booking.clinicName}</Text>
        </View>
        <Text style={[styles.status, booking.status === "upcoming" ? styles.upcoming : booking.status === "completed" ? styles.completed : styles.cancelled]}>
          {statusLabels[booking.status]}
        </Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.info}>🐾  {booking.petName}     ·     {formatDate(booking.date)} lúc {booking.time}</Text>
      <View style={styles.bottom}>
        <Text style={styles.price}>{formatCurrency(booking.total)}</Text>
        {booking.status === "upcoming" && onCancel ? (
          <Pressable onPress={onCancel} hitSlop={8}><Text style={styles.cancelAction}>Hủy lịch</Text></Pressable>
        ) : null}
      </View>
      <Text style={styles.address}>{booking.clinicAddress}</Text>
      <Text style={styles.phone}>Hotline: {booking.clinicPhone}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 18, marginBottom: 13, borderWidth: 1, borderColor: colors.border },
  top: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  titleWrap: { flex: 1, gap: 5 },
  service: { fontSize: 16, fontWeight: "800", color: colors.ink },
  clinic: { fontSize: 13, color: colors.muted },
  status: { fontSize: 11, fontWeight: "700", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 10, overflow: "hidden" },
  upcoming: { color: colors.tealDark, backgroundColor: colors.mint },
  completed: { color: colors.green, backgroundColor: "#E8F6EF" },
  cancelled: { color: colors.red, backgroundColor: "#FCECEC" },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 13 },
  info: { color: colors.ink, fontSize: 13 },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 13 },
  price: { color: colors.tealDark, fontWeight: "800", fontSize: 15 },
  cancelAction: { color: colors.red, fontWeight: "700", fontSize: 13 },
  address: { marginTop: 10, color: colors.muted, fontSize: 12 },
  phone: { marginTop: 4, color: colors.muted, fontSize: 12 },
});
