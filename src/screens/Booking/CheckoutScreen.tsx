import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { formatCurrency } from "../../utils/formatters";

export function CheckoutScreen({ navigation, route }: any) {
  const total = route.params?.total ?? 0;
  return (
    <View style={styles.screen}>
      <Header title="Thanh toán" subtitle="Xem lại hóa đơn" onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        <Text style={styles.label}>Tổng thanh toán</Text>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
        <Text style={styles.note}>Đây là màn hình thanh toán mô phỏng. Tạo đơn vé sẽ hoàn tất sau khi xác nhận.</Text>
      </View>
      <Button title="Xác nhận thanh toán" onPress={() => navigation.navigate("BookingSuccess")} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.muted, fontSize: 12 },
  total: { color: colors.tealDark, fontSize: 30, fontWeight: "800", marginTop: 12 },
  note: { color: colors.muted, fontSize: 12, lineHeight: 20, marginTop: 12 },
  button: { marginTop: 22 },
});
