import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { colors } from "../../components/theme";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { RootStackParamList } from "../../navigation/AppNavigator";

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, "Login">;
type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

export function LoginScreen({ navigation }: { navigation: LoginNavigation }) {
  const [email, setEmail] = useState("minhanh@example.com");
  const [password, setPassword] = useState("123456");
  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập email và mật khẩu.");
      return;
    }
    const rootNavigation = navigation.getParent<RootNavigation>();
    if (!rootNavigation) {
      Alert.alert("Không thể đăng nhập", "Không tìm thấy điều hướng chính của ứng dụng.");
      return;
    }
    rootNavigation.replace("MainTabs");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🐾</Text>
        <Text style={styles.title}>PetCare Hanoi</Text>
        <Text style={styles.subtitle}>Đăng nhập để quản lý thú cưng và lịch hẹn</Text>
      </View>
      <View style={styles.card}>
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <Input label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
        <Text style={styles.demoHint}>Tài khoản demo: minhanh@example.com · Mật khẩu: 123456</Text>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </Pressable>
        <Button title="Đăng nhập" onPress={onLogin} style={styles.button} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Đăng ký ngay</Text>
        </Pressable>
      </View>
      <View style={styles.socialRow}>
        <MaterialCommunityIcons name="google" size={24} color={colors.red} />
        <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" />
        <MaterialCommunityIcons name="apple" size={24} color={colors.ink} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", backgroundColor: colors.background, padding: 24 },
  header: { alignItems: "center", marginBottom: 18 },
  emoji: { fontSize: 54 },
  title: { fontSize: 28, fontWeight: "800", color: colors.ink, marginTop: 10 },
  subtitle: { color: colors.muted, fontSize: 13, textAlign: "center", marginTop: 6 },
  card: { backgroundColor: "#fff", borderRadius: 22, padding: 18, borderWidth: 1, borderColor: colors.border },
  forgot: { color: colors.teal, fontWeight: "700", fontSize: 12, alignSelf: "flex-end", marginBottom: 16 },
  demoHint: { color: colors.muted, fontSize: 10, lineHeight: 16, marginTop: -4, marginBottom: 12 },
  button: { marginTop: 6 },
  footer: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 18 },
  footerText: { color: colors.muted, fontSize: 13 },
  link: { color: colors.teal, fontWeight: "800", fontSize: 13 },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 22, marginTop: 20 },
});
