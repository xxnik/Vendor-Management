import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,
  },
});