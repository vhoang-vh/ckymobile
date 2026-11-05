import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "./theme";

interface InputProps extends TextInputProps {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        {...props}
        style={[styles.input, props.multiline && styles.multiline, props.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8, marginBottom: 15 },
  label: { color: colors.ink, fontSize: 14, fontWeight: "600" },
  input: { minHeight: 50, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 14, color: colors.ink, backgroundColor: "#fff", fontSize: 15 },
  multiline: { minHeight: 86, paddingTop: 12, textAlignVertical: "top" },
});
