import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

export default StyleSheet.create({
  headerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.subtitle,
    lineHeight: 20,
  },

  summaryRow: {
    flexDirection: "row",
    marginHorizontal: -5,
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 5,
    elevation: 4,
  },

  summaryLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.subtitle,
    marginBottom: 8,
  },

  summaryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.primary,
  },

  section: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },

  vendorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },

  vendorInfo: {
    flex: 1,
  },

  vendorName: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 4,
  },

  vendorMeta: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.subtitle,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.success,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 8,
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

  emptyText: {
    textAlign: "center",
    color: "#7F8C8D",
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 24,
  },

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

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },

  modalButtons: {
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

  deleteVendorName: {
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

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
