import { ScreenWrapperProps } from "@/types/types";
import { colors } from "@/ultils/theme";
import React from "react";
import { Dimensions, Platform, StatusBar, View } from "react-native";

const { height } = Dimensions.get("window");

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 54;

  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor: colors.neutral900,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.neutral900}
        translucent={true}
      />
      {children}
    </View>
  );
}
