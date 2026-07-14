import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n/config";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

const LANGUAGE_KEY = "@ict_language";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(i18n.language || "en");

  useEffect(() => {
    let isMounted = true;

    const loadLanguage = async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (saved && saved !== i18n.language) {
          i18n.changeLanguage(saved);
        }
      } catch (e) {
        console.log("Language load error:", e);
      } finally {
        if (isMounted) {
          setLanguageState(i18n.language || "en");
        }
      }
    };

    loadLanguage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLanguageState(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => i18n.off("languageChanged", handleLanguageChanged);
  }, []);

  const changeLanguage = useCallback((lang) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    try {
      AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.log("Language save error:", e);
    }
  }, []);

  const t = useCallback((key) => i18n.t(key), []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
