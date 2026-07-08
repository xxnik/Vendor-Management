import React from "react";
import { ScrollView, View } from "react-native";

import styles from "./style";

export default function ScreenContainer({ children, stickyHeaderIndices }) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
    >
      {children}
    </ScrollView>
  );
}
