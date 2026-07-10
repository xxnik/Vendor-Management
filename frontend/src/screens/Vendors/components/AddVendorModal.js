import React, { useState } from "react";
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

import { useLanguage } from "../../../context/LanguageContext";

import styles from "../style";

export default function AddVendorModal({ visible, onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { t } = useLanguage();

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      phone: phone.trim(),
    });

    setName("");
    setPhone("");
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.modalOverlay}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("addVendor")}</Text>

            <TextInput
              placeholder={t("vendorName")}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder={t("vendorPhoneNumberLabel")}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelText}>{t("cancel")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>{t("save")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
