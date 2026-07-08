import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
  },
});