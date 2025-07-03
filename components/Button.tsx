import { CustomButtonProps } from "@/types/types";
import { verticalScale } from "@/ultils/helper";
import { colors, radius } from "@/ultils/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";

export default function Button({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) {
  if (loading) {
    return (
      <View style={[style, styles.button, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    alignItems: "center",
    justifyContent: "center",
  },
});
