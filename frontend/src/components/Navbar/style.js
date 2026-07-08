import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  /* ==========================
     DESKTOP NAVBAR
  ========================== */

  container: {
    position: "relative",
    zIndex: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: COLORS.card,

    marginHorizontal: 16,
    marginTop: -18,
    marginBottom: 15,

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 18,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  leftMenu: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: COLORS.primary,
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
  },

  activeText: {
    color: "#fff",
  },

  navAddButton: {
    backgroundColor: "#EC5AA7",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },

  /* ==========================
     LOGIN / SIGNUP
  ========================== */

  authButtons: {
    flexDirection: "row",
    alignItems: "center",
  },

  loginText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
    marginRight: 20,
  },

  signupButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  signupText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },

  /* ==========================
     PROFILE
  ========================== */

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileMenu: {
    position: "relative",
    zIndex: 60,
    elevation: 10,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2C3E50",
    marginRight: 5,
  },

  userRole: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  dropdown: {
    position: "absolute",
    zIndex: 1000,

    right: 0,
    top: 55,

    width: 180,

    backgroundColor: "#fff",

    borderRadius: 14,

    elevation: 12,

    paddingVertical: 8,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  dropdownText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
  },

  /* ==========================
     MOBILE
  ========================== */

  mobileHeader: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: -18,
    marginBottom: 15,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: "row",
    alignItems: "center",

    elevation: 5,
  },

  logoContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
  },

  mobileAddButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  drawer: {
    position: "absolute",

    left: 0,
    top: 0,
    bottom: 0,

    width: 290,

    backgroundColor: "#FFF7D1",

    paddingTop: 16,

    paddingHorizontal: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 8,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 30,

    backgroundColor: "#C5DDEC",

    borderRadius: 14,

    padding: 12,

    borderWidth: 1,

    borderColor: "#B8D6E7",
  },

  userNameBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
  },

  drawerText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2C3E50",

    marginLeft: 18,
  },

  drawerAddButton: {
    backgroundColor: "#EC5AA7",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: "auto",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
});
