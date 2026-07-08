import React, { useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./style";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          fullName,
          email,
          phone,
          password,
        },
      );

      console.log(response.data);
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: response.data.message,
      });

      setTimeout(() => {
        router.replace("/(auth)/login");
      }, 150);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Signup Failed",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.authPanel}>
          <View style={styles.headerBlock}>
            <Text style={styles.appName}>Ice Cream Tracker</Text>

            <Text style={styles.title}>Create Manager Account</Text>

            <Text style={styles.subtitle}>Create your account to continue</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>

            <TextInput
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <Text style={styles.label}>Phone Number (Optional)</Text>

            <TextInput
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            <Text style={styles.label}>Password</Text>

            <TextInput
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              placeholder="Confirm password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
