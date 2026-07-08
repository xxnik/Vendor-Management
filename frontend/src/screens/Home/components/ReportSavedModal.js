import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import styles from "./style";

export default function ReportSavedModal({
  visible,
  report,
  onClose,
  onDownload,
  onShare,
}) {
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
            Report Saved Successfully
          </Text>

          <View style={styles.reportInfo}>
            <Text style={styles.reportText}>
              Date : {report.date}
            </Text>

            <Text style={styles.reportText}>
              Vendor : {report.vendor}
            </Text>

            <Text style={styles.reportText}>
              Total Sale : ₹{report.totalSale}
            </Text>

            <Text style={styles.reportText}>
              Commission : ₹{report.commission}
            </Text>

            <Text style={styles.reportText}>
              Company Profit : ₹{report.profit}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={onDownload}
          >
            <Text style={styles.downloadButtonText}>
              Download PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
          >
            <Text style={styles.shareButtonText}>
              Share Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onClose}
          >
            <Text style={styles.doneButtonText}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}