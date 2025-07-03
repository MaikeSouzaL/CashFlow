import { TypoProps } from "@/types/types";
import { verticalScale } from "@/ultils/helper";
import { colors } from "@/ultils/theme";
import React from "react";
import { Text } from "react-native";

export default function Typotext({
  children,
  color,
  fontWeight,
  size,
  style,
  textProps,
}: TypoProps) {
  const textStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color: color || colors.textLight,
    fontWeight,
  };

  return (
    <Text {...textProps} style={[textStyle, style]}>
      {children}
    </Text>
  );
}
