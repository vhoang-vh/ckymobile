import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mockClinics, mockServices } from "../../assets/mockData";
import { useAuth } from "../../context/AuthContext";
import { useBookings } from "../../context/BookingContext";
import { usePets } from "../../context/PetContext";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { formatDate } from "../../utils/formatters";

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { pets } = usePets();
  const { bookings } = useBookings();
  const [query, setQuery] = useState("");
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const upcoming = bookings.filter((booking) => booking.status === "upcoming" && (!selectedPetId || booking.petId === selectedPetId));
  const clinics = useMemo(() => mockClinics.filter((clinic) =>
    `${clinic.name} ${clinic.area} ${clinic.address}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Header title={`Xin chào, ${user.name.split(" ").slice(-1)[0]} 👋`} subtitle="Chăm sóc bé yêu mỗi ngày" rightAction={{ icon: "bell-outline", onPress: () => navigation.navigate("BookingHistory") }} />
      <View style={styles.search}>
        <MaterialCommunityIcons name="magnify" size={22} color={colors.muted} />
        <TextInput value={query} onChangeText={setQuery} placeholder="Tìm spa, phòng khám, khu vực..." placeholderTextColor={colors.muted} style={styles.searchInput} />
      </View>
      <View style={styles.banner}>
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerEyebrow}>ƯU ĐÃI THÁNG NÀY</Text>
          <Text style={styles.bannerTitle}>Bé khỏe, nhà vui!</Text>
          <Text style={styles.bannerSub}>Giảm 20% dịch vụ chăm sóc lần đầu</Text>
          <Pressable onPress={() => navigation.navigate("Booking")} style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Đặt lịch ngay</Text>
          </Pressable>
        </View>
        <Text style={styles.bannerEmoji}>🐶</Text>
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Thú cưng của bạn</Text>
        <Pressable onPress={() => navigation.navigate("Pets")}><Text style={styles.link}>Xem tất cả</Text></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petRow}>
        {pets.map((pet) => (
          <Pressable key={pet.id} onPress={() => setSelectedPetId(selectedPetId === pet.id ? null : pet.id)} style={[styles.petChip, selectedPetId === pet.id && styles.petChipActive]}>
            <Image source={{ uri: pet.image }} style={styles.petAvatar} />
            <Text style={[styles.petName, selectedPetId === pet.id && styles.petNameActive]}>{pet.name}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => navigation.navigate("AddPet")} style={styles.addPetChip}>
          <MaterialCommunityIcons name="plus" size={23} color={colors.teal} />
          <Text style={styles.addPetText}>Thêm bé</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Dịch vụ phổ biến</Text>
        <Pressable onPress={() => navigation.navigate("Booking")}><Text style={styles.link}>Đặt dịch vụ</Text></Pressable>
      </View>
      <View style={styles.serviceGrid}>
        {mockServices.map((service) => (
          <Pressable key={service.id} onPress={() => navigation.navigate("Booking")} style={styles.serviceCard}>
            <View style={styles.serviceIcon}><MaterialCommunityIcons name={service.icon as any} size={24} color={colors.teal} /></View>
            <Text style={styles.serviceName}>{service.name}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Lịch hẹn sắp tới</Text>
        <Pressable onPress={() => navigation.navigate("BookingHistory")}><Text style={styles.link}>Tất cả</Text></Pressable>
      </View>
      {upcoming.length ? upcoming.slice(0, 2).map((booking) => (
        <View key={booking.id} style={styles.appointment}>
          <View style={styles.dateTile}><Text style={styles.dateDay}>{booking.date.slice(-2)}</Text><Text style={styles.dateMonth}>TH{booking.date.slice(5, 7)}</Text></View>
          <View style={styles.appointmentCopy}>
            <Text style={styles.appointmentTitle}>{booking.serviceName} · {booking.petName}</Text>
            <Text style={styles.appointmentSub}>{booking.clinicName}</Text>
            <Text style={styles.appointmentSub}>{formatDate(booking.date)} · {booking.time}</Text>
          </View>
        </View>
      )) : <Text style={styles.emptyText}>Chưa có lịch hẹn{selectedPetId ? " cho bé này" : ""}.</Text>}

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Địa điểm nổi bật</Text>
        <Text style={styles.link}>Hà Nội</Text>
      </View>
      {clinics.map((clinic) => (
        <View key={clinic.id} style={styles.clinicCard}>
          <Image source={{ uri: clinic.image }} style={styles.clinicImage} />
          <View style={styles.clinicCopy}>
            <Text style={styles.clinicName}>{clinic.name}</Text>
            <Text style={styles.clinicAddress}>{clinic.area} · {clinic.address.split(",")[0]}</Text>
            <Text style={styles.rating}>★ {clinic.rating} <Text style={styles.clinicAddress}>({clinic.reviewCount} đánh giá) · {clinic.bookingCount}+ lượt đặt</Text></Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 16, paddingBottom: 32 },
  search: { height: 50, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, paddingHorizontal: 13, flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 18 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 13 },
  banner: { flexDirection: "row", backgroundColor: colors.teal, borderRadius: 22, padding: 18, minHeight: 160, overflow: "hidden", marginBottom: 24 },
  bannerCopy: { flex: 1, zIndex: 1 },
  bannerEyebrow: { fontSize: 10, fontWeight: "800", color: "#C9EEE6", letterSpacing: 1 },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 7 },
  bannerSub: { color: "#E5F4F1", fontSize: 12, marginTop: 5, maxWidth: 210 },
  bannerButton: { backgroundColor: "#fff", paddingHorizontal: 13, paddingVertical: 9, borderRadius: 12, alignSelf: "flex-start", marginTop: 13 },
  bannerButtonText: { color: colors.tealDark, fontSize: 12, fontWeight: "800" },
  bannerEmoji: { fontSize: 76, position: "absolute", right: 4, bottom: 4, opacity: 0.9 },
  sectionHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, marginTop: 3 },
  sectionTitle: { color: colors.ink, fontSize: 17, fontWeight: "800" },
  link: { color: colors.teal, fontWeight: "700", fontSize: 12 },
  petRow: { gap: 10, paddingBottom: 20 },
  petChip: { width: 82, alignItems: "center", gap: 6, paddingVertical: 9, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  petChipActive: { backgroundColor: colors.mint, borderColor: colors.teal },
  petAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.mint },
  petName: { color: colors.ink, fontSize: 12, fontWeight: "600" },
  petNameActive: { color: colors.tealDark },
  addPetChip: { width: 82, alignItems: "center", justifyContent: "center", gap: 4, borderRadius: 16, borderWidth: 1, borderStyle: "dashed", borderColor: colors.teal, backgroundColor: "#fff" },
  addPetText: { color: colors.teal, fontSize: 11, fontWeight: "700" },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  serviceCard: { width: "48%", minHeight: 75, backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 11, marginBottom: 9, flexDirection: "row", alignItems: "center", gap: 10 },
  serviceIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.mint, alignItems: "center", justifyContent: "center" },
  serviceName: { flex: 1, color: colors.ink, fontWeight: "700", fontSize: 12 },
  appointment: { flexDirection: "row", backgroundColor: "#fff", padding: 13, borderRadius: 16, borderWidth: 1, borderColor: colors.border, gap: 12, marginBottom: 9 },
  dateTile: { width: 48, borderRadius: 13, backgroundColor: colors.peach, alignItems: "center", justifyContent: "center", paddingVertical: 7 },
  dateDay: { color: colors.orange, fontSize: 19, fontWeight: "800" },
  dateMonth: { color: colors.orange, fontSize: 9, fontWeight: "800" },
  appointmentCopy: { flex: 1, justifyContent: "center", gap: 4 },
  appointmentTitle: { color: colors.ink, fontWeight: "700", fontSize: 13 },
  appointmentSub: { color: colors.muted, fontSize: 11 },
  emptyText: { color: colors.muted, paddingVertical: 13, fontSize: 13 },
  clinicCard: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 17, overflow: "hidden", borderWidth: 1, borderColor: colors.border, marginBottom: 11 },
  clinicImage: { width: 98, height: 95, backgroundColor: colors.mint },
  clinicCopy: { flex: 1, padding: 11, justifyContent: "center", gap: 6 },
  clinicName: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  clinicAddress: { color: colors.muted, fontSize: 11 },
  rating: { color: "#ED9B3C", fontSize: 12, fontWeight: "800" },
});
