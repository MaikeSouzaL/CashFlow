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

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function hendleSubmit() {
    if (!email || !password || !name) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos obrigatórios."
      );
      return;
    }
    setIsLoading(true);
    const response = await register(email, password, name);
    console.log("response", response);
    if (!response.success) {
      Alert.alert("Erro ao criar conta", response.msg);
      setIsLoading(false);
      return;
    }
    Alert.alert("Sucesso", "Conta criada com sucesso!");
    setIsLoading(false);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/**botao de voltar */}
        <BackButton iconSize={28} />

        {/**texto de boas vindas */}
        <View style={{ gap: 5, marginTop: spacingY._10 }}>
          <Typotext size={30}>Vamos lá,</Typotext>
          <Typotext size={30}>Crie sua conta</Typotext>
        </View>

        {/*fomulário de login */}
        <View style={styles.form}>
          <Typotext size={16} color={colors.textLight}>
            Crie sua conta e comece a controlar suas finanças hoje mesmo!
          </Typotext>
          <Input
            onChangeText={setName}
            placeholder="Entre com seu nome"
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
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

          <Button loading={isLoading} onPress={hendleSubmit}>
            <Typotext fontWeight={"700"} color={colors.black} size={21}>
              Criar conta
            </Typotext>
          </Button>
        </View>

        {/**footer */}
        <View style={styles.footer}>
          <Typotext style={styles.footertext} size={15}>
            já possui uma conta?
          </Typotext>
          <Pressable
            onPress={() => router.navigate("/(auth)/login")}
            style={{ padding: spacingX._3 }}
          >
            <Typotext fontWeight={"700"} color={colors.primary} size={15}>
              Entre
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
