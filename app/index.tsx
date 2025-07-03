import { colors } from "@/ultils/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  // const route = useRouter();

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   route.push("/(auth)/welcome");
  //   //   // route.push("/(auth)/login");
  //   //   // route.push("/(auth)/login");
  //   //   // route.push("/(auth)/register");
  //   // }, 1000);
  // }, [route]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("@/assets/images/splashImage.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
