import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  authPanel: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    marginBottom: 18,
    overflow: "hidden",
  },

  headerBlock: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginBottom: 18,
  },

  appName: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 0,
    textAlign: "center",
    color: "#FFE9F6",
    fontSize: 15,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,

    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 14,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },

  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,

    shadowColor: COLORS.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  signupButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  footerText: {
    color: COLORS.subtitle,
    fontSize: 15,
  },

  loginText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 5,
  },
});
