import Button from "@/components/Button";
import Typotext from "@/components/TypoText";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

import { useAuth } from "@/context/authContext";
import { colors } from "@/ultils/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  
  const { user } = useAuth();
  console.log("User:", user);

  const handlerLogout = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handlerLogout}>
        <Typotext color={colors.black}>Sair</Typotext>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
