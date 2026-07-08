import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import { toDateKey } from "../../../utils/date";
import { useAuth } from "../../../context/AuthContext";
import Toast from "react-native-toast-message";

export default function SaveReportButton({
  vendor,
  date,
  userId,
  initialStock,
  leftoverStock,
  onSave,
}) {
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const handleSave = async () => {
    if (!vendor?.id || !user?.id || !date) {
      Toast.show({
        type: "error",
        text1: "Missing data",
        text2: "Please select vendor and date.",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }

    setSaving(true);
    try {
      let iceCreams = [];
      let totalSale = 0;
      let vendorCommission = 0;
      let companyProfit = 0;

      try {
        const iceCreamResponse = await axios.get(
          `http://localhost:5000/api/icecream/user/${vendor.userId}`,
        );
        if (iceCreamResponse.data?.icecreams) {
          iceCreams = iceCreamResponse.data.icecreams;
        }
      } catch (e) {
        console.log("Could not fetch ice creams for report");
      }

      iceCreams.forEach((item) => {
        const initial = Number(initialStock?.[item.id] || 0);
        const left = Number(leftoverStock?.[item.id] || 0);
        const sold = Math.max(initial - left, 0);
        totalSale += sold * Number(item.price || 0);
      });

      const commissionPercent = 30;
      vendorCommission = (totalSale * commissionPercent) / 100;
      companyProfit = totalSale - vendorCommission;

      await axios.post(
        "http://localhost:5000/api/report",
        {
          vendorId: vendor.id,
          userId: user.id,
          date: toDateKey(date),
          initialStock: initialStock || {},
          leftoverStock: leftoverStock || {},
          totalSale,
          vendorCommission,
          companyProfit,
        },
      );

      Toast.show({
        type: "success",
        text1: "Report saved successfully",
        position: "top",
        visibilityTime: 2500,
      });

      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.log("Save Report Error:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: "Could not save report. Try again.",
        position: "top",
        visibilityTime: 2500,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSave}
      disabled={saving}
      style={{
        backgroundColor: saving ? "#6B7280" : "#198754",
        padding: 16,
        borderRadius: 10,
        marginBottom: 30,
        opacity: saving ? 0.7 : 1,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "700",
          fontSize: 17,
        }}
      >
        {saving ? "Saving..." : "Save Report"}
      </Text>
    </TouchableOpacity>
  );
}
