import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import Toast from "react-native-toast-message";
import { api } from "../../config";

import {
  ActivityIndicator,
  Image,
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
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuth();
  const { t } = useLanguage();

  const showErrorToast = (message) => {
    Toast.show({
      type: "error",
      text1: t("loginFailed"),
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

      if (!trimmedEmail || !password) {
        showErrorToast(t("pleaseEnterBoth"));
        return;
      }

      if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
        showErrorToast(t("validEmail"));
        return;
      }

    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", {
        email: trimmedEmail,
        password,
      });

      console.log(response.data);

      if (response.data.token) {
        await setToken(response.data.token);
      }

      setUser(response.data.user);

      Toast.show({
        type: "success",
        text1: t("loginSuccess"),
        text2: t("welcomeBack"),
      });

      setTimeout(() => {
        router.replace(redirect || "/(tabs)/home");
      }, 100);
    } catch (error) {
      alert(
        JSON.stringify({
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        }),
      );
    } finally {
      setLoading(false);
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
          <Image
            source={require("../../../assets/images/splash-icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <View style={styles.headerBlock}>
            <Text style={styles.appName}>{t("appName")}</Text>

            <Text style={styles.title}>{t("login")}</Text>

            <Text style={styles.subtitle}>{t("welcome")}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>{t("email")}</Text>

            <TextInput
              placeholder={t("email")}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <Text style={styles.label}>{t("password")}</Text>

            <TextInput
              placeholder={t("password")}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>{t("login")}</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{t("signupPrompt")}</Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={styles.signupText}>{t("signup")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
