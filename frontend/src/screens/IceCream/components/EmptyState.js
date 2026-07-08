import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "../style";

export default function EmptyState({ onAdd }) {
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="ice-cream"
        size={80}
        color="#EC5AA7"
      />

      <Text style={styles.emptyTitle}>
        No Ice Cream Added
      </Text>

      <Text style={styles.emptySubtitle}>
        Add your first ice cream to start creating daily reports.
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
      >
        <Text style={styles.addText}>
          + Add Ice Cream
        </Text>
      </TouchableOpacity>
    </View>
  );
}