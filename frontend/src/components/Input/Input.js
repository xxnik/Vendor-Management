import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7A8FA3"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.input,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 16,
    color: Colors.text,
  },
});