import React, { useEffect, useState } from "react";
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

export default function EditIceCreamModal({
  visible,
  onClose,
  item,
  onUpdate,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
    }
  }, [item]);

  const handleUpdate = () => {
    if (!name.trim() || !price.trim()) return;

    onUpdate({
      ...item,
      name: name.trim(),
      price: Number(price),
    });

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
              {t("updateIceCream")}
            </Text>

            <Text style={styles.label}>
              {t("iceCreamName")}
            </Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={t("enterName")}
            />

            <Text style={styles.label}>
              {t("iceCreamPrice")}
            </Text>

            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder={t("enterPrice")}
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
                onPress={handleUpdate}
              >
                <Text style={styles.saveText}>
                  {t("update")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}