import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,

    borderRadius: 18,

    padding: 22,

    elevation: 6,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 8,

    width: "100%",
  },
});