import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Carteira",
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "Estatísticas",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}

