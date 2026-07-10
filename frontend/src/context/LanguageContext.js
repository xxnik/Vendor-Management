import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import i18n from "../i18n/config";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => i18n.off("languageChanged", handleLanguageChanged);
  }, []);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, []);

  const t = useCallback((key) => i18n.t(key), []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
