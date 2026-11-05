import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";

export function ClinicDetailScreen({ navigation, route }: any) {
  const clinic = route.params?.clinic;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={clinic?.name ?? "Phòng khám"} onBack={() => navigation.goBack()} />
      {clinic ? (
        <>
          <Image source={{ uri: clinic.image }} style={styles.image} />
          <Text style={styles.section}>{clinic.area}</Text>
          <Text style={styles.address}>{clinic.address}</Text>
          <Text style={styles.rating}>★ {clinic.rating} · {clinic.reviewCount} đánh giá</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15 },
  image: { width: "100%", height: 200, borderRadius: 18, marginBottom: 18 },
  section: { fontSize: 20, fontWeight: "800", color: colors.ink },
  address: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  rating: { color: "#E89A37", fontWeight: "800", marginTop: 10 },
});
