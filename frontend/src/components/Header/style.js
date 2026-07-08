import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 30,

    borderBottomLeftRadius: 28,

    borderBottomRightRadius: 28,

    elevation: 8,

    shadowColor: "#000",

    shadowOpacity: 0.2,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  title: {
    marginTop: 8,

    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "700",
  },

  subtitle: {
    marginTop: 5,

    color: "#FFE9F6",

    fontSize: 16,

    fontWeight: "500",
  },
});