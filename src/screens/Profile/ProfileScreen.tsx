import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { useAuth } from "../../context/AuthContext";
import { usePets } from "../../context/PetContext";

export function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();
  const { pets } = usePets();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Tài khoản" subtitle="Quản lý thông tin của bạn" />
      <View style={styles.profile}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileCopy}><Text style={styles.name}>{user.name}</Text><Text style={styles.email}>{user.email}</Text><Text style={styles.email}>{user.phone}</Text></View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statValue}>{pets.length}</Text><Text style={styles.statLabel}>Thú cưng</Text></View>
        <View style={styles.statDivider} />
        <View style={styles.stat}><Text style={styles.statValue}>PetCare</Text><Text style={styles.statLabel}>Thành viên</Text></View>
      </View>
      <Text style={styles.section}>Tài khoản & dịch vụ</Text>
      <MenuRow icon="account-edit-outline" title="Chỉnh sửa hồ sơ" onPress={() => navigation.navigate("EditProfile")} />
      <MenuRow icon="calendar-heart" title="Lịch hẹn của tôi" onPress={() => navigation.navigate("BookingHistory")} />
      <MenuRow icon="paw" title="Thú cưng của tôi" onPress={() => navigation.navigate("Pets")} />
      <MenuRow icon="cart-outline" title="Giỏ hàng" onPress={() => navigation.navigate("Cart")} />
      <View style={styles.address}><Text style={styles.addressTitle}>Địa chỉ mặc định</Text><Text style={styles.addressText}>📍  {user.address}</Text></View>
      <Text style={styles.version}>PetCare Hanoi · Phiên bản 1.0.0</Text>
    </ScrollView>
  );
}

function MenuRow({ icon, title, onPress }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; title: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.menu}><MaterialCommunityIcons name={icon} size={21} color={colors.teal} /><Text style={styles.menuTitle}>{title}</Text><MaterialCommunityIcons name="chevron-right" size={21} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15, paddingBottom: 30 },
  profile: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.border, gap: 13 },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.mint },
  profileCopy: { gap: 4 },
  name: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  email: { color: colors.muted, fontSize: 12 },
  stats: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: colors.mint, borderRadius: 16, padding: 15, marginTop: 13, marginBottom: 24 },
  stat: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { color: colors.tealDark, fontSize: 16, fontWeight: "800" },
  statLabel: { color: colors.muted, fontSize: 11 },
  statDivider: { width: 1, height: 34, backgroundColor: "#C9DFDA" },
  section: { color: colors.ink, fontSize: 16, fontWeight: "800", marginBottom: 10 },
  menu: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, marginBottom: 9 },
  menuTitle: { flex: 1, color: colors.ink, fontWeight: "600", fontSize: 13 },
  address: { padding: 15, borderRadius: 15, backgroundColor: colors.peach, marginTop: 12 },
  addressTitle: { color: colors.ink, fontWeight: "800", marginBottom: 7, fontSize: 13 },
  addressText: { color: colors.muted, fontSize: 12 },
  version: { color: colors.muted, fontSize: 10, textAlign: "center", marginTop: 23 },
});
