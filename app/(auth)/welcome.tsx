import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typotext from "@/components/TypoText";
import { verticalScale } from "@/ultils/helper";
import { colors, spacingX, spacingY } from "@/ultils/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function Welcome() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/** loginButon e imagemWelcome */}
        <View>
          {/* login button */}
          <TouchableOpacity
            style={styles.loginButon}
            onPress={() => router.navigate("/(auth)/login")}
          >
            <Typotext fontWeight={"600"} color={colors.primary}>
              Entrar
            </Typotext>
          </TouchableOpacity>

          {/* Welcome image */}
          <Animated.Image
            entering={FadeIn.duration(1000)}
            style={styles.WelcomeImage}
            resizeMode="contain"
            source={require("@/assets/images/welcome.png")}
          />
        </View>

        {/** footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(10)}
            style={{ alignItems: "center" }}
          >
            <Typotext
              size={30}
              fontWeight={"800"}
              style={{ textAlign: "center" }}
              color={colors.white}
            >
              Assume o controle de suas despesas!
            </Typotext>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(10)}
          >
            <Typotext
              size={16}
              color={colors.textLight}
              style={{ textAlign: "center", paddingHorizontal: spacingX._20 }}
            >
              Crie uma conta e comece a gerenciar suas finanças de forma simples
              e eficiente.
            </Typotext>
          </Animated.View>

          {/* Button to start */}
          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(10)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typotext size={22} fontWeight={"600"} color={colors.neutral900}>
                Começar agora
              </Typotext>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  WelcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButon: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    // Sombra para cima
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: -10, // valor negativo para sombra para cima
    },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
