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
    padding: 20,
  },

  authPanel: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  logoImage: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 18,
  },

  logo: {
    fontSize: 52,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    letterSpacing: 2,
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
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#FFE9F6",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 0,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 22,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 18,
  },

  loginButton: {
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,

    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  footerText: {
    fontSize: 15,
    color: COLORS.subtitle,
  },

  signupText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    marginLeft: 6,
  },
});
