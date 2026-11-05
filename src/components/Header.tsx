import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: { icon: keyof typeof MaterialCommunityIcons.glyphMap; onPress: () => void };
}

export function Header({ title, subtitle, onBack, rightAction }: HeaderProps) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.iconButton} accessibilityLabel="Quay lại">
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.ink} />
        </Pressable>
      ) : null}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightAction ? (
        <Pressable onPress={rightAction.onPress} style={styles.iconButton} accessibilityLabel={rightAction.icon}>
          <MaterialCommunityIcons name={rightAction.icon} size={22} color={colors.ink} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  copy: { flex: 1 },
  title: { color: colors.ink, fontSize: 24, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 4 },
  iconButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
});
