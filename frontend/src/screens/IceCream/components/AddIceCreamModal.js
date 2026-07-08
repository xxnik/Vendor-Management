import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "../style";

export default function AddIceCreamModal({
  visible,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Add Ice Cream
          </Text>

          <Text style={styles.label}>
            Ice Cream Name
          </Text>

          <TextInput
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>
            Price
          </Text>

          <TextInput
            placeholder="Enter price"
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
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}