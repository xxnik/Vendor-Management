import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { toDateKey } from "../../../utils/date";
import { api } from "../../../config";
import Toast from "react-native-toast-message";

import styles from "./style";

export default function LeftoverStockCard({
  vendor,
  initialStock,
  stock,
  setStock,
  onSaved,
  date,
  userId,
  readOnly = false,
}) {
  const [iceCreams, setIceCreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handleChange = (id, value) => {
    const numeric = value.replace(/[^0-9]/g, "");

    if (!setStock) return;

    setStock((prev) => ({
      ...prev,
      [id]: numeric,
    }));
  };

  const availableIceCreams = iceCreams.filter((item) => (
    Number(initialStock?.[item.id] || 0) > 0
  ));

  useEffect(() => {
    if (!vendor?.userId) {
      setIceCreams([]);
      setLoading(false);
      return;
    }

    const fetchIceCreams = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/icecream/user/${vendor.userId}`,
        );
        if (response.data?.success || response.data?.icecreams) {
          setIceCreams(response.data?.icecreams || []);
        }
      } catch (error) {
        console.log("Error:", error.response?.data || error.message);
        setIceCreams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIceCreams();
  }, [vendor?.userId]);

  useEffect(() => {
    if (!vendor?.id || !userId || !date) {
      setHasSaved(false);
      return;
    }

    const fetchLeftoverStock = async () => {
      try {
        const dateKey = toDateKey(date);
        const response = await api.get(
          `/api/leftover-stock/vendor/${vendor.id}/date/${dateKey}`,
        );
        if (response.data?.success && response.data?.leftoverStock) {
          const savedStocks = response.data.leftoverStock.stocks || {};
          setStock(savedStocks);
          setHasSaved(true);
        } else {
          setHasSaved(false);
        }
      } catch (error) {
        console.log("Error fetching leftover stock:", error.response?.data || error.message);
        setHasSaved(false);
      }
    };

    fetchLeftoverStock();
  }, [vendor?.id, userId, date]);

  const handleSave = async () => {
    if (!vendor?.id || !userId || !date) return;

    setSaving(true);
    try {
        await api.post(
          "/api/leftover-stock",
        {
          vendorId: vendor.id,
          userId,
          date: toDateKey(date),
          stocks: stock,
        },
      );

      let iceCreams = [];
      let totalSale = 0;
      let vendorCommission = 0;
      let companyProfit = 0;

      try {
        const iceCreamResponse = await api.get(
          `/api/icecream/user/${vendor.userId}`,
        );
        if (iceCreamResponse.data?.icecreams) {
          iceCreams = iceCreamResponse.data.icecreams;
        }
      } catch (e) {
        console.log("Could not fetch ice creams for report");
      }

      iceCreams.forEach((item) => {
        const initial = Number(initialStock?.[item.id] || 0);
        const left = Number(stock?.[item.id] || 0);
        const sold = Math.max(initial - left, 0);
        totalSale += sold * Number(item.price || 0);
      });

      const commissionPercent = 30;
      vendorCommission = (totalSale * commissionPercent) / 100;
      companyProfit = totalSale - vendorCommission;

      setHasSaved(true);

      Toast?.show?.({
        type: "success",
        text1: "Leftover stock saved",
        position: "top",
        visibilityTime: 2500,
      });

      setTimeout(async () => {
        try {
            await api.post(
              "/api/report",
            {
              vendorId: vendor.id,
              userId,
              date: toDateKey(date),
              initialStock: initialStock || {},
              leftoverStock: stock || {},
              totalSale,
              vendorCommission,
              companyProfit,
            },
          );

          Toast?.show?.({
            type: "success",
            text1: "Report saved to database",
            position: "top",
            visibilityTime: 2500,
          });

          if (onSaved) onSaved(stock);
        } catch (error) {
          console.log("Report Save Error:", error.response?.data || error.message);
          Toast?.show?.({
            type: "error",
            text1: "Report save failed",
            text2: "Could not save report. Try again.",
            position: "top",
            visibilityTime: 2500,
          });
        }
      }, 1000);
    } catch (error) {
      console.log("Save Error:", error.response?.data || error.message);
      Toast?.show?.({
        type: "error",
        text1: "Save failed",
        text2: "Could not save leftover stock. Try again.",
        position: "top",
        visibilityTime: 2500,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.leftoverStockCard}>
      <Text style={styles.leftoverStockTitle}>
        Update Leftover Stock
      </Text>

      <Text style={styles.leftoverStockSubtitle}>
        For vendor: {vendor.name}. Record quantities remaining.
      </Text>

      {loading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#EC5AA7" />
        </View>
      ) : availableIceCreams.length === 0 ? (
        <Text style={styles.leftoverStockEmptyText}>
          {iceCreams.length === 0 ? "No ice creams available." : "No ice cream with initial stock."}
        </Text>
      ) : (
        availableIceCreams.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.leftoverStockItem,
              index > 0 && styles.leftoverStockItemWithBorder,
            ]}
          >
            <View style={styles.leftoverStockItemHeader}>
              <View style={styles.leftoverStockNameWrap}>
                <MaterialCommunityIcons
                  name={index % 2 === 0 ? "ice-cream" : "cupcake"}
                  size={22}
                  color="#FF5BA8"
                />

                <Text style={styles.leftoverStockItemName}>
                  {item.name}
                </Text>
              </View>

              <Text style={styles.leftoverStockPrice}>
                Price (₹): {item.price}
              </Text>
            </View>

            {readOnly ? (
              <Text style={styles.leftoverStockReadOnlyValue}>
                {stock[item.id] || 0}
              </Text>
            ) : (
              <TextInput
                value={stock[item.id] || ""}
                keyboardType="numeric"
                onChangeText={(text) => handleChange(item.id, text)}
                placeholder="Enter quantity"
                placeholderTextColor="#6B7B8C"
                style={styles.leftoverStockQtyInput}
              />
            )}
          </View>
        ))
      )}

      {!readOnly && !loading && availableIceCreams.length > 0 && (
        <TouchableOpacity
          style={styles.leftoverStockButton}
          onPress={handleSave}
          disabled={saving}
        >
          <MaterialCommunityIcons
            name="pencil-box-outline"
            size={17}
            color="#FFFFFF"
          />

          <Text style={styles.leftoverStockButtonText}>
            {saving ? (hasSaved ? "Updating..." : "Saving...") : (hasSaved ? "Update" : "Save")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
