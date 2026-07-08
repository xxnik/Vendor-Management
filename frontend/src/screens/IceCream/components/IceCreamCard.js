import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "../style";

export default function IceCreamCard({
  item,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.iceCreamName}>
          🍦 {item.name}
        </Text>

        <Text style={styles.price}>
          ₹ {item.price}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
        >
          <MaterialIcons
            name="edit"
            size={18}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <MaterialIcons
            name="delete"
            size={18}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}