import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useLanguage } from "../../../context/LanguageContext";

import styles from "./style";

export default function ReportSavedModal({
  visible,
  report,
  onClose,
  onDownload,
  onShare,
}) {
  const { t } = useLanguage();

  if (!report) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.reportModal}>
          <MaterialIcons
            name="check-circle"
            size={70}
            color="#22C55E"
          />

          <Text style={styles.reportTitle}>
            {t("reportSavedSuccessfully")}
          </Text>

          <View style={styles.reportInfo}>
            <Text style={styles.reportText}>
              {t("date")} : {report.date}
            </Text>

            <Text style={styles.reportText}>
              {t("vendor")} : {report.vendor}
            </Text>

            <Text style={styles.reportText}>
              {t("totalSale")} : ₹{report.totalSale}
            </Text>

            <Text style={styles.reportText}>
              {t("commission")} : ₹{report.commission}
            </Text>

            <Text style={styles.reportText}>
              {t("companyProfit")} : ₹{report.profit}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={onDownload}
          >
            <Text style={styles.downloadButtonText}>
              {t("downloadPdf")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
          >
            <Text style={styles.shareButtonText}>
              {t("shareReport")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onClose}
          >
            <Text style={styles.doneButtonText}>
              {t("done")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}