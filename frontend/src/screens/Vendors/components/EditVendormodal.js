import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import styles from "../style";

export default function EditVendorModal({
  visible,
  vendor,
  onClose,
  onUpdate,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (vendor) {
      setName(vendor.name);
      setPhone(vendor.phone || "");
    }
  }, [vendor]);

  const handleUpdate = async () => {
    if (!name.trim()) return;

    await onUpdate({
      ...vendor,
      name: name.trim(),
      phone: phone.trim(),
    });

    onClose();
  };

  return (
    <Modal
      key={vendor?.id}
      visible={visible}
      transparent
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.modalOverlay}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Edit Vendor
            </Text>

          <TextInput
            style={styles.input}
            placeholder="Vendor Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number (optional)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdate}
            >
              <Text style={styles.saveText}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
}
