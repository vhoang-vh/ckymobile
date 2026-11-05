import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { mockProducts } from "../../assets/mockData";
import { formatCurrency } from "../../utils/formatters";

export function ProductDetailScreen({ navigation, route }: any) {
  const product = mockProducts.find((item) => item.id === route.params?.productId) ?? mockProducts[0];
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={product.name} onBack={() => navigation.goBack()} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Thêm vào giỏ" onPress={() => navigation.goBack()} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15 },
  image: { width: "100%", height: 220, borderRadius: 20, marginBottom: 18 },
  category: { color: colors.muted, fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  price: { color: colors.tealDark, fontSize: 24, fontWeight: "800", marginTop: 10 },
  description: { color: colors.muted, lineHeight: 22, marginTop: 12 },
  button: { marginTop: 22 },
});
