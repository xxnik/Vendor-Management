import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import MainLayout from "../../layouts/MainLayout";
import ScreenContainer from "../../components/ScreenContainer";

import { useLanguage } from "../../context/LanguageContext";
import { useRouter } from "expo-router";
import styles from "./style";

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
  ];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 150);
  };

  return (
    <MainLayout>
      <ScreenContainer>
        <View style={styles.headerCard}>
          <Text style={styles.title}>{t("settings")}</Text>
          <Text style={styles.subtitle}>{t("settingsDescription")}</Text>
        </View>

        <View style={styles.languageCard}>
          <Text style={styles.languageTitle}>{t("selectLanguage")}</Text>

          <View style={styles.languageOptions}>
            {languages.map((lang) => {
              const isSelected = language === lang.code;

              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageButton,
                    isSelected && styles.languageButtonActive,
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Text
                    style={[
                      styles.languageButtonText,
                      isSelected && styles.languageButtonTextActive,
                    ]}
                  >
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScreenContainer>
    </MainLayout>
  );
}
