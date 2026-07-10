import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { formatDisplayDate } from "../../../utils/date";
import { useLanguage } from "../../../context/LanguageContext";
import InitialStockCard from "./InitialStockCard";
import LeftoverStockCard from "./LeftoverStockCard";
import SummaryCard from "./SummaryCard";
import styles from "./style";

export default function DailyHistoryDashboard({
  date,
  reports,
  loading = false,
}) {
  const { t } = useLanguage();
  return (
    <>
      <View style={styles.section}>
        <View style={styles.summaryHeader}>
          <MaterialIcons
            name="history"
            size={26}
            color="#EC5AA7"
          />

          <Text style={styles.summaryTitle}>
            {t("history")}
          </Text>
        </View>

        <Text style={styles.infoText}>
          {t("date")} : {formatDisplayDate(date)}
        </Text>

        <Text style={styles.historyBadge}>
          {t("readOnlyDailyRecords")}
        </Text>
      </View>

      {loading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#EC5AA7" />
        </View>
      ) : reports.length === 0 ? (
        <Text style={styles.emptyText}>{t("noReportsFoundForThisDate")}</Text>
      ) : (
        reports.map((report) => (
          <View key={report.vendor.id}>
            <Text style={styles.historyVendorTitle}>
              {report.vendor.name}
            </Text>

            <InitialStockCard
              vendor={report.vendor}
              stock={report.initialStock}
              readOnly
            />

            <LeftoverStockCard
              vendor={report.vendor}
              initialStock={report.initialStock}
              stock={report.leftoverStock}
              readOnly
            />

            <SummaryCard
              vendor={report.vendor}
              date={formatDisplayDate(date)}
              initialStock={report.initialStock}
              leftoverStock={report.leftoverStock}
              commission={30}
            />
          </View>
        ))
      )}
    </>
  );
}
