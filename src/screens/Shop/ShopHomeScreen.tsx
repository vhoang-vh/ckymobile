import React, { useMemo, useState } from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mockProducts } from "../../assets/mockData";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { useCart } from "../../context/CartContext";
import { Product } from "../../types";
import { formatCurrency } from "../../utils/formatters";

const categories = ["Tất cả", "Đồ ăn", "Đồ chơi", "Vệ sinh"];

export function ShopHomeScreen({ navigation }: any) {
  const [category, setCategory] = useState("Tất cả");
  const { addToCart, itemCount } = useCart();
  const products = useMemo(() => category === "Tất cả" ? mockProducts : mockProducts.filter((product) => product.category === category), [category]);
  const add = (product: Product) => {
    addToCart(product);
    Alert.alert("Đã thêm vào giỏ", `${product.name} đã được thêm vào giỏ hàng.`);
  };
  return (
    <View style={styles.screen}>
      <Header title="Pet Shop" subtitle="Mọi điều bé yêu cần, ở ngay đây" rightAction={{ icon: "cart-outline", onPress: () => navigation.navigate("Cart") }} />
      <View style={styles.cartHint}><MaterialCommunityIcons name="truck-fast-outline" size={20} color={colors.teal} /><Text style={styles.cartHintText}>Miễn phí giao hàng cho đơn từ 500.000đ</Text><Text style={styles.cartCount}>{itemCount}</Text></View>
      <View style={styles.categories}>
        {categories.map((item) => <Text key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.categoryActive]}>{item}</Text>)}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} onAdd={() => add(item)} />}
      />
    </View>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <View style={styles.product}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productBody}>
        <Text style={styles.productCategory}>{product.category} · ★ {product.rating}</Text>
        <Text numberOfLines={2} style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Pressable onPress={onAdd} style={styles.addButton}><MaterialCommunityIcons name="plus" color="#fff" size={17} /><Text style={styles.addButtonText}>Thêm vào giỏ</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  cartHint: { height: 45, borderRadius: 13, backgroundColor: colors.mint, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 8, marginBottom: 16 },
  cartHintText: { flex: 1, color: colors.tealDark, fontSize: 11, fontWeight: "600" },
  cartCount: { color: colors.tealDark, fontSize: 14, fontWeight: "800" },
  categories: { flexDirection: "row", gap: 8, marginBottom: 15 },
  category: { overflow: "hidden", borderRadius: 12, paddingVertical: 9, paddingHorizontal: 13, backgroundColor: "#fff", color: colors.muted, fontSize: 11, fontWeight: "700" },
  categoryActive: { backgroundColor: colors.teal, color: "#fff" },
  list: { paddingBottom: 20 },
  columns: { justifyContent: "space-between" },
  product: { width: "48.5%", borderRadius: 17, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, overflow: "hidden", marginBottom: 12 },
  productImage: { width: "100%", height: 125, backgroundColor: colors.mint },
  productBody: { padding: 10 },
  productCategory: { color: colors.muted, fontSize: 9, fontWeight: "700" },
  productName: { color: colors.ink, fontSize: 13, fontWeight: "800", height: 36, marginTop: 5 },
  price: { color: colors.tealDark, fontWeight: "800", fontSize: 13, marginTop: 5 },
  addButton: { backgroundColor: colors.teal, borderRadius: 11, minHeight: 34, marginTop: 9, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 },
  addButtonText: { color: "#fff", fontSize: 10, fontWeight: "800" },
});
