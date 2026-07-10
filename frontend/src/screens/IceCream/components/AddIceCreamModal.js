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

export default function AddIceCreamModal({
  visible,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { t } = useLanguage();

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;

    onSave({
      name: name.trim(),
      price: Number(price),
    });

    setName("");
    setPrice("");

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
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
              {t("addIceCream")}
            </Text>

            <Text style={styles.label}>
              {t("iceCreamName")}
            </Text>

            <TextInput
              placeholder={t("enterName")}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>
              {t("iceCreamPrice")}
            </Text>

            <TextInput
              placeholder={t("enterPrice")}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>
                  {t("cancel")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveText}>
                  {t("save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}