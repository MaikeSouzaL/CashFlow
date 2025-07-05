import { verticalScale } from "@/ultils/helper";
import { colors } from "@/ultils/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Typotext from "./TypoText";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const tabbarIcons: any = {
            home: (isFocused: boolean) => (
              <Icons.House
                size={30}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.primary : colors.neutral300}
              />
            ),
            statistics: (isFocused: boolean) => (
              <Icons.ChartBar
                size={30}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.primary : colors.neutral300}
              />
            ),
            wallet: (isFocused: boolean) => (
              <Icons.Wallet
                size={30}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.primary : colors.neutral300}
              />
            ),
            profile: (isFocused: boolean) => (
              <Icons.User
                size={30}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? colors.primary : colors.neutral300}
              />
            ),
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={styles.tabItem}>
                {tabbarIcons[route.name]
                  ? tabbarIcons[route.name](isFocused)
                  : null}

                <Typotext
                  style={StyleSheet.flatten([
                    styles.tabLabel,
                    { color: isFocused ? colors.primary : colors.neutral300 },
                  ])}
                >
                  {label}
                </Typotext>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 25 : 15,
  },
  container: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? verticalScale(65) : verticalScale(70),
    backgroundColor: colors.neutral800,
    width: "100%",
    borderRadius: 50,
    paddingBottom: 0,
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabIndicator: {
    position: "absolute",
    top: -10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
  },
});

export default CustomTabBar;
