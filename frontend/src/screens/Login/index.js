import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "./style";

export default function Login() {
  const router = useRouter();
  const { redirect } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const showErrorToast = (message) => {
    Toast.show({
      type: "error",
      text1: "Login Failed",
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      showErrorToast("Please enter both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      showErrorToast("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: trimmedEmail,
          password,
        },
      );

      console.log(response);
      setUser(response.data.user);

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      setTimeout(() => {
        router.replace(redirect || "/(tabs)/home");
      }, 100);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Something went wrong.");
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

            <Text style={styles.title}>Login</Text>

            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{"Don't have an account?"}</Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
