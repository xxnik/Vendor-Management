import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";
import { toDateKey } from "../../../utils/date";
import Toast from "react-native-toast-message";

import styles from "./style";

export default function InitialStockCard({
  vendor,
  date,
  userId,
  stock,
  setStock,
  onSaved,
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

  useEffect(() => {
    if (!vendor?.userId) {
      setIceCreams([]);
      setLoading(false);
      return;
    }

    const fetchIceCreams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://10.210.94.213:5000/api/icecream/user/${vendor.userId}`,
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

    const fetchInitialStock = async () => {
      try {
        const dateKey = toDateKey(date);
        const response = await axios.get(
          `http://10.210.94.213:5000/api/initial-stock/vendor/${vendor.id}/date/${dateKey}`,
        );
        if (response.data?.success && response.data?.initialStock) {
          const savedStocks = response.data.initialStock.stocks || {};
          setStock(savedStocks);
          setHasSaved(true);
        } else {
          setHasSaved(false);
        }
      } catch (error) {
        console.log("Error fetching initial stock:", error.response?.data || error.message);
        setHasSaved(false);
      }
    };

    fetchInitialStock();
  }, [vendor?.id, userId, date]);

  const handleSave = async () => {
    if (!vendor?.id || !userId || !date) return;

    setSaving(true);
    try {
      await axios.post(
        "http://10.210.94.213:5000/api/initial-stock",
        {
          vendorId: vendor.id,
          userId,
          date: toDateKey(date),
          stocks: stock,
        },
      );
      Toast?.show?.({
        type: "success",
        text1: "Initial stock saved",
        position: "top",
        visibilityTime: 2500,
      });
      setHasSaved(true);
      if (onSaved) onSaved(stock);
    } catch (error) {
      console.log("Save Error:", error.response?.data || error.message);
      Toast?.show?.({
        type: "error",
        text1: "Save failed",
        text2: "Could not save initial stock. Try again.",
        position: "top",
        visibilityTime: 2500,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.initialStockCard}>
      <Text style={styles.initialStockTitle}>
        Initial Stock
      </Text>

      <Text style={styles.initialStockSubtitle}>
        For vendor: {vendor.name}. Record quantities provided.
      </Text>

      {loading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#EC5AA7" />
        </View>
      ) : iceCreams.length === 0 ? (
        <Text style={styles.emptyText}>No ice creams available.</Text>
      ) : (
        iceCreams.map((item) => (
          <View
            key={item.id}
            style={styles.initialStockItem}
          >
            <View style={styles.initialStockItemHeader}>
              <View style={styles.initialStockNameWrap}>
                <MaterialCommunityIcons
                  name="cup"
                  size={23}
                  color="#FF5BA8"
                />

                <Text style={styles.initialStockItemName}>
                  {item.name}
                </Text>
              </View>

              <Text style={styles.initialStockPrice}>
                Price (₹): {item.price}
              </Text>
            </View>

            {readOnly ? (
              <Text style={styles.initialStockReadOnlyValue}>
                {stock[item.id] || 0}
              </Text>
            ) : (
              <TextInput
                value={stock[item.id] || ""}
                keyboardType="numeric"
                onChangeText={(text) => handleChange(item.id, text)}
                placeholder="Enter quantity"
                placeholderTextColor="#6B7B8C"
                style={styles.initialStockQtyInput}
              />
            )}
          </View>
        ))
      )}

      {!readOnly && !loading && iceCreams.length > 0 && (
        <TouchableOpacity
          style={styles.initialStockButton}
          onPress={handleSave}
          disabled={saving}
        >
          <MaterialCommunityIcons
            name="pencil-box-outline"
            size={17}
            color="#FFFFFF"
          />

          <Text style={styles.initialStockButtonText}>
            {saving ? (hasSaved ? "Updating..." : "Saving...") : (hasSaved ? "Update" : "Save")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
