import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typotext from "@/components/TypoText";
import { useAuth } from "@/context/authContext";
import { verticalScale } from "@/ultils/helper";
import { colors, spacingX, spacingY } from "@/ultils/theme";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  async function hendleSubmit() {
    if (!email || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos obrigatórios."
      );
      return;
    }
    setIsLoading(true);
    const response = await login(email, password);
    setIsLoading(false);
    if (response.success) {
      router.replace("/(tabs)/home");
    } else {
      Alert.alert("Login", response.msg || "Ocorreu um erro ao fazer login.");
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/**botao de voltar */}
        <BackButton iconSize={28} onPress={() => router.push("/welcome")} />

        {/**texto de boas vindas */}
        <View style={{ gap: 5, marginTop: spacingY._10 }}>
          <Typotext size={30}>Olá,</Typotext>
          <Typotext size={30}>Seja bem vindo de volta</Typotext>
        </View>

        {/*fomulário de login */}
        <View style={styles.form}>
          <Typotext size={16} color={colors.textLight}>
            Entre para monitorar todas as suas despesas
          </Typotext>
          <Input
            onChangeText={setEmail}
            placeholder="Entre com seu e-mail"
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            onChangeText={setPassword}
            placeholder="Entre com sua senha"
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Typotext
            size={14}
            color={colors.white}
            style={{ alignSelf: "flex-end" }}
          >
            Esqueceu sua senha?
          </Typotext>

          <Button loading={isLoading} onPress={hendleSubmit}>
            <Typotext fontWeight={"700"} color={colors.black} size={21}>
              Entrar
            </Typotext>
          </Button>
        </View>

        {/**footer */}
        <View style={styles.footer}>
          <Typotext style={styles.footertext} size={15}>
            Não tem uma conta?
          </Typotext>
          <Pressable
            onPress={() => router.push("/(auth)/register")}
            style={{ padding: spacingX._3 }}
          >
            <Typotext fontWeight={"700"} color={colors.primary} size={15}>
              Inscreva-se
            </Typotext>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(24),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacingX._3,
  },
  footertext: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
