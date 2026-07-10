import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../../config";
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

import { useLanguage } from "../../context/LanguageContext";

import styles from "./style";

export default function Signup() {
  const router = useRouter();
  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await api.post(
        "/api/auth/signup",
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
        text1: t("signupSuccess"),
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
        text1: error.response?.data?.message || t("signupFailed"),
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
            <Text style={styles.appName}>{t("appName")}</Text>

            <Text style={styles.title}>{t("signup")}</Text>

            <Text style={styles.subtitle}>{t("accountCreated")}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>{t("nameRequired")}</Text>

            <TextInput
              placeholder={t("vendorName")}
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />

            <Text style={styles.label}>{t("email")}</Text>

            <TextInput
              placeholder={t("email")}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <Text style={styles.label}>{t("phoneRequired")}</Text>

            <TextInput
              placeholder={t("phone")}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
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

            <Text style={styles.label}>{t("confirmPassword")}</Text>

            <TextInput
              placeholder={t("confirmPassword")}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>{t("signup")}</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{t("signupPrompt")}</Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.loginText}>{t("login")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
