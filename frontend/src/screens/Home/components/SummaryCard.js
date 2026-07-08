import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";

import styles from "./style";

export default function SummaryCard({
  vendor,
  date,
  initialStock,
  leftoverStock,
  commission = 30,
}) {
  const [iceCreams, setIceCreams] = useState([]);
  const [loading, setLoading] = useState(true);

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
          `http://localhost:5000/api/icecream/user/${vendor.userId}`,
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

  let totalSale = 0;

  const items = iceCreams.map((item) => {
    const initial = Number(initialStock[item.id] || 0);

    const left = Number(leftoverStock[item.id] || 0);

    const sold = initial - left;

    const amount = sold * item.price;

    totalSale += amount;

    return {
      ...item,
      sold,
      amount,
    };
  });

  const vendorCommission =
    (totalSale * commission) / 100;

  const companyProfit =
    totalSale - vendorCommission;

  return (
    <View style={styles.section}>
      <View style={styles.summaryHeader}>
        <MaterialIcons
          name="analytics"
          size={26}
          color="#EC5AA7"
        />

        <Text style={styles.summaryTitle}>
          Daily Sales Summary
        </Text>
      </View>

      <Text style={styles.infoText}>
        Date : {date}
      </Text>

      <Text style={styles.infoText}>
        Vendor : {vendor?.name}
      </Text>

      {loading ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color="#EC5AA7" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text
                style={[
                  styles.headerText,
                  { flex: 2 },
                ]}
              >
                Item
              </Text>

              <Text
                style={[
                  styles.headerText,
                  { flex: 1 },
                ]}
              >
                Sold
              </Text>

              <Text
                style={[
                  styles.headerText,
                  { flex: 2 },
                ]}
              >
                Calculation
              </Text>

              <Text
                style={[
                  styles.headerText,
                  { flex: 1 },
                ]}
              >
                Amount
              </Text>
            </View>

            {items.map((item) => (
              <View
                key={item.id}
                style={styles.tableRow}
              >
                <Text
                  style={[
                    styles.rowText,
                    { flex: 2 },
                  ]}
                >
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.rowText,
                    { flex: 1 },
                  ]}
                >
                  {item.sold}
                </Text>

                <Text
                  style={[
                    styles.rowText,
                    { flex: 2 },
                  ]}
                >
                  {item.price} × {item.sold}
                </Text>

                <Text
                  style={[
                    styles.rowText,
                    { flex: 1 },
                  ]}
                >
                  ₹{item.amount}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Total Sale
        </Text>

        <Text style={styles.totalValue}>
          ₹{totalSale}
        </Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Vendor Commission ({commission}%)
        </Text>

        <Text style={styles.totalValue}>
          ₹{vendorCommission.toFixed(2)}
        </Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Company Profit
        </Text>

        <Text style={styles.totalValue}>
          ₹{companyProfit.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}