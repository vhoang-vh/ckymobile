import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatters";

export function CartScreen({ navigation }: any) {
  const { items, total, setQuantity, clearCart } = useCart();
  const checkout = () => {
    if (!items.length) return;
    Alert.alert("Đặt hàng thành công 🎉", `Đơn hàng mô phỏng trị giá ${formatCurrency(total)} đã được ghi nhận.`, [
      { text: "Tiếp tục mua sắm", onPress: () => { clearCart(); navigation.goBack(); } },
    ]);
  };
  return (
    <View style={styles.screen}>
      <Header title="Giỏ hàng" subtitle={`${items.length} sản phẩm`} onBack={() => navigation.goBack()} />
      {items.length ? (
        <ScrollView contentContainerStyle={styles.list}>
          {items.map(({ product, quantity }) => (
            <View key={product.id} style={styles.item}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={styles.copy}><Text style={styles.name}>{product.name}</Text><Text style={styles.price}>{formatCurrency(product.price)}</Text></View>
              <View style={styles.quantity}>
                <MaterialCommunityIcons name="minus-circle-outline" size={21} color={colors.teal} onPress={() => setQuantity(product.id, quantity - 1)} />
                <Text style={styles.qtyText}>{quantity}</Text>
                <MaterialCommunityIcons name="plus-circle-outline" size={21} color={colors.teal} onPress={() => setQuantity(product.id, quantity + 1)} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.empty}><Text style={styles.emptyIcon}>🛒</Text><Text style={styles.name}>Giỏ hàng đang trống</Text><Text style={styles.emptySub}>Thêm sản phẩm để bắt đầu mua sắm.</Text></View>
      )}
      <View style={styles.bottom}>
        <View style={styles.total}><Text style={styles.totalLabel}>Tổng cộng</Text><Text style={styles.totalPrice}>{formatCurrency(total)}</Text></View>
        <Button title="Tiến hành đặt hàng" onPress={checkout} disabled={!items.length} />
        <Text style={styles.note}>Đơn hàng được mô phỏng, chưa kết nối giao nhận thực tế.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  list: { paddingBottom: 12 },
  item: { flexDirection: "row", alignItems: "center", gap: 11, padding: 11, backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 10 },
  image: { width: 61, height: 61, borderRadius: 12, backgroundColor: colors.mint },
  copy: { flex: 1, gap: 6 },
  name: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  price: { color: colors.tealDark, fontWeight: "700", fontSize: 12 },
  quantity: { flexDirection: "row", alignItems: "center", gap: 7 },
  qtyText: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  bottom: { marginTop: "auto", paddingTop: 15 },
  total: { flexDirection: "row", justifyContent: "space-between", marginBottom: 13 },
  totalLabel: { color: colors.muted, fontSize: 14 },
  totalPrice: { color: colors.tealDark, fontSize: 17, fontWeight: "800" },
  note: { color: colors.muted, textAlign: "center", fontSize: 10, marginTop: 9 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptySub: { color: colors.muted, fontSize: 12 },
});
