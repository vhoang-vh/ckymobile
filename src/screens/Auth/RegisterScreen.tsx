import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { colors } from "../../components/theme";

export function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ thông tin đăng ký.");
      return;
    }
    Alert.alert("Đăng ký thành công", "Tài khoản của bạn đã được tạo.");
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Header title="Đăng ký" subtitle="Tạo tài khoản mới" onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        <Input label="Họ và tên" value={name} onChangeText={setName} placeholder="Nguyễn Văn A" />
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <Input label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry placeholder="Tối thiểu 6 ký tự" />
        <Button title="Tạo tài khoản" onPress={submit} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 15 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 15, borderWidth: 1, borderColor: colors.border },
  button: { marginTop: 8 },
});
