import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { colors } from "../../components/theme";
import { useAuth } from "../../context/AuthContext";

export function EditProfileScreen({ navigation }: any) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const save = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ.");
      return;
    }
    updateUser({ name: name.trim(), phone: phone.trim(), address: address.trim() });
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Chỉnh sửa hồ sơ" subtitle="Cập nhật thông tin tài khoản" onBack={() => navigation.goBack()} />
      <Input label="Họ và tên" value={name} onChangeText={setName} placeholder="Họ và tên" />
      <Input label="Email" value={user.email} editable={false} />
      <Input label="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Input label="Địa chỉ" value={address} onChangeText={setAddress} />
      <Button title="Lưu thay đổi" onPress={save} style={styles.save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 15 },
  save: { marginTop: 10 },
});
