import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  headerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontWeight: "500",
  },

  languageCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  languageTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 14,
  },

  languageOptions: {
    flexDirection: "row",
    gap: 12,
  },

  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  languageButtonActive: {
    backgroundColor: "#EC5AA7",
    borderColor: "#EC5AA7",
  },

  languageButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2C3E50",
  },

  languageButtonTextActive: {
    color: "#FFFFFF",
  },
});
