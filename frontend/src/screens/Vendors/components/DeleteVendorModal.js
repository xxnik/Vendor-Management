import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "../style";

export default function DeleteVendorModal({
  visible,
  vendor,
  onClose,
  onDelete,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.deleteModalContainer}>
          <MaterialIcons
            name="warning"
            size={60}
            color="#EF4444"
            style={{ alignSelf: "center" }}
          />

          <Text style={styles.deleteTitle}>Delete Vendor</Text>

          <Text style={styles.deleteMessage}>
            Are you sure you want to delete
          </Text>

          <Text style={styles.deleteVendorName}>
            🏪 {vendor?.name}
          </Text>

          <Text style={styles.deleteWarning}>
            This action cannot be undone.
          </Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteConfirmButton}
              onPress={onDelete}
            >
              <Text style={styles.deleteConfirmText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
