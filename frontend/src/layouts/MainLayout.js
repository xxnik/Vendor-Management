import React from "react";
import { SafeAreaView, View } from "react-native";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

import COLORS from "../constants/colors";

export default function MainLayout({ children, onAddVendor }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 720,
          alignSelf: "center",
        }}
      >
        <Header />

        <Navbar onAddVendor={onAddVendor} />

        <View
          style={{
            flex: 1,
          }}
        >
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}