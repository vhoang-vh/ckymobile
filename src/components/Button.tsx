import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "./theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = "primary", disabled, loading, style }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={variant === "primary" ? "#fff" : colors.teal} /> : (
        <Text style={[styles.label, variant === "outline" && styles.outlineLabel]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 50, borderRadius: 16, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  primary: { backgroundColor: colors.teal },
  secondary: { backgroundColor: colors.peach },
  outline: { borderWidth: 1, borderColor: colors.teal, backgroundColor: "#fff" },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  label: { color: "#fff", fontSize: 15, fontWeight: "700" },
  outlineLabel: { color: colors.teal },
});
