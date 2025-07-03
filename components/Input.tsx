import InputProps from "@/types/types";
import { verticalScale } from "@/ultils/helper";
import { colors, radius, spacingX } from "@/ultils/theme";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Input({
  containerStyle,
  inputStyle,
  inputRef,
  icon,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {icon && icon}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={inputRef && inputRef}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._12,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14),
  },
});
