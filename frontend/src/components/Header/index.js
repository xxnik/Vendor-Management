import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./style";

export default function Header() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="ice-cream"
        size={42}
        color="#ffffff"
      />

      <Text style={styles.title}>
        Ice Cream Tracker
      </Text>

      <Text style={styles.subtitle}>
        Vendor Management System
      </Text>
    </View>
  );
}