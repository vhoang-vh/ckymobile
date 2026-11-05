import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { colors } from "../../components/theme";
import { mockServices } from "../../assets/mockData";
import { formatCurrency } from "../../utils/formatters";

export function ServiceDetailScreen({ navigation, route }: any) {
  const service = mockServices.find((item) => item.id === route.params?.serviceId) ?? mockServices[0];
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={service.name} onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        <Text style={styles.price}>{formatCurrency(service.price)}</Text>
        <Text style={styles.desc}>{service.description}</Text>
        {service.addOns.map((item) => (
          <Text key={item.id} style={styles.addOn}>• {item.name} · {item.price ? formatCurrency(item.price) : "Miễn phí"}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  price: { color: colors.tealDark, fontSize: 24, fontWeight: "800", marginBottom: 10 },
  desc: { color: colors.muted, lineHeight: 20, marginBottom: 12 },
  addOn: { color: colors.ink, fontSize: 13, marginBottom: 6 },
});
