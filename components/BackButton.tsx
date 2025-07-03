import { BackButtonProps } from "@/types/types";
import { verticalScale } from "@/ultils/helper";
import { colors, radius } from "@/ultils/theme";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function BackButton({
  style,
  iconSize = 26,
  ...props
}: BackButtonProps) {
  const router = useRouter();

  function handleNavigate() {
    if (props.onPress) {
      router.back();
    } else {
      router.push("/welcome");
    }
  }
  return (
    <TouchableOpacity
      {...props}
      onPress={handleNavigate}
      style={[styles.button, style]}
    >
      <CaretLeft
        size={verticalScale(iconSize)}
        color={colors.primary}
        weight="bold"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    padding: 5,
    borderCurve: "continuous",
  },
});
