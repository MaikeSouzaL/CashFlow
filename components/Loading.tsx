import { colors } from "@/ultils/theme";
import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

export default function ({
  size = "large",
  color = colors.primary,
}: ActivityIndicatorProps) {
  return (
    <View
      shouldRasterizeIOS={true}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({});
