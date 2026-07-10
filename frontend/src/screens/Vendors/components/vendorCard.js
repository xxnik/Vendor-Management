import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useLanguage } from "../../../context/LanguageContext";

import styles from "../style";

export default function VendorCard({
  item,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.vendorName}>
          👨‍💼 {item.name}
        </Text>

        {item.phone && (
          <Text style={styles.phone}>
            📞 {item.phone}
          </Text>
        )}
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
            {t("edit")}
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
            {t("delete")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}