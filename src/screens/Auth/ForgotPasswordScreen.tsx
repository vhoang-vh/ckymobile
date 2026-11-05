import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { colors } from "../../components/theme";

export function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const submit = () => {
    if (!email.trim()) {
      Alert.alert("Thiếu email", "Vui lòng nhập email để đặt lại mật khẩu.");
      return;
    }
    Alert.alert("Đã gửi email", "Hướng dẫn đặt lại mật khẩu đã được gửi đến hộp thư của bạn.");
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Header title="Quên mật khẩu" subtitle="Khôi phục tài khoản" onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        <Text style={styles.text}>Nhập email của bạn để nhận đường dẫn đặt lại mật khẩu.</Text>
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <Button title="Gửi hướng dẫn" onPress={submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: colors.border },
  text: { color: colors.muted, fontSize: 13, marginBottom: 14, lineHeight: 20 },
});
