import Button from "@/components/Button";
import Typotext from "@/components/TypoText";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/ultils/theme";
import React from "react";
import { StyleSheet } from "react-native";

export default function Home() {
  const handlerLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper>
      <Button onPress={handlerLogout}>
        <Typotext color={colors.black}>Sair</Typotext>
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
