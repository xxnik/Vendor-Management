import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E50",
    flexShrink: 1,
  },

  addButton: {
    backgroundColor: COLORS.primary,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,

    paddingVertical: 12,

    borderRadius: 12,
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },

  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyStateText: {
    color: "#7F8C8D",
    fontSize: 15,
    fontWeight: "600",
  },

  loginPromptButton: {
    backgroundColor: "#FCE7F3",
    borderColor: "#EC5AA7",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },

  loginPromptText: {
    color: "#EC5AA7",
    fontWeight: "700",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    padding: 18,

    marginBottom: 16,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardLeft: {
    marginBottom: 15,
  },

  iceCreamName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
  },

  price: {
    marginTop: 8,

    fontSize: 16,

    color: "#666",

    fontWeight: "600",
  },

  actionContainer: {
    flexDirection: "row",

    justifyContent: "flex-end",
  },

  editButton: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F59E0B",

    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 10,

    marginRight: 10,
  },

  deleteButton: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#EF4444",

    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",

    fontWeight: "700",

    marginLeft: 6,
  },

  /* Modal */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    maxWidth: 420,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 22,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",

    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",

    color: "#555",

    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",

    borderRadius: 12,

    paddingHorizontal: 15,

    height: 50,

    marginBottom: 18,

    backgroundColor: "#FAFAFA",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,

    marginRight: 10,
  },

  cancelText: {
    fontWeight: "700",
    color: "#666",
  },

  saveButton: {
    backgroundColor: "#EC5AA7",

    paddingHorizontal: 22,

    paddingVertical: 10,

    borderRadius: 10,
  },

  saveText: {
    color: "#FFF",
    fontWeight: "700",
  },

  deleteModalContainer: {
    width: "90%",
    maxWidth: 420,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 25,
  },

  deleteTitle: {
    fontSize: 22,

    fontWeight: "700",

    color: "#EF4444",

    textAlign: "center",

    marginTop: 12,
  },

  deleteMessage: {
    textAlign: "center",

    fontSize: 16,

    color: "#555",

    marginTop: 18,
  },

  deleteIceCreamName: {
    textAlign: "center",

    fontSize: 22,

    fontWeight: "700",

    color: "#2C3E50",

    marginVertical: 18,
  },

  deleteWarning: {
    textAlign: "center",

    color: "#888",

    marginBottom: 25,
  },

  deleteConfirmButton: {
    backgroundColor: "#EF4444",

    paddingHorizontal: 22,

    paddingVertical: 10,

    borderRadius: 10,
  },

  deleteConfirmText: {
    color: "#fff",

    fontWeight: "700",
  },
});
