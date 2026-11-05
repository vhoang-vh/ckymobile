import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { colors } from "../../components/theme";

export function BookingSuccessScreen({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Đặt lịch thành công</Text>
      <Text style={styles.subtitle}>Lịch hẹn đã được ghi nhận và sẽ được xác nhận trong thời gian sớm nhất.</Text>
      <Button title="Về lịch hẹn" onPress={() => navigation.navigate("BookingHistory")} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: 24 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { color: colors.ink, fontSize: 24, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: "center", marginTop: 12, marginBottom: 20 },
  button: { minWidth: 220 },
});
