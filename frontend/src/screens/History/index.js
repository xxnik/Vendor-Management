import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { formatDisplayDate, toDateKey } from "../../utils/date";
import Toast from "react-native-toast-message";

import MainLayout from "../../layouts/MainLayout";
import ScreenContainer from "../../components/ScreenContainer";

import styles from "./style";

function getDateRange(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);
  return { start, end };
}

export default function History() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reportsByVendor, setReportsByVendor] = useState([]);
  const [overallTotals, setOverallTotals] = useState({
    totalSale: 0,
    totalVendorCommission: 0,
    totalCompanyProfit: 0,
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const generateDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const generateMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push({
        value: i,
        label: new Date(currentYear, i, 1).toLocaleString("default", { month: "long" }),
      });
    }
    return months;
  };

  const generateYears = () => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i);
    }
    return years;
  };

  const [selectedStartYear, setSelectedStartYear] = useState(currentYear);
  const [selectedStartMonth, setSelectedStartMonth] = useState(currentMonth);
  const [selectedStartDay, setSelectedStartDay] = useState(currentDay);

  const [selectedEndYear, setSelectedEndYear] = useState(currentYear);
  const [selectedEndMonth, setSelectedEndMonth] = useState(currentMonth);
  const [selectedEndDay, setSelectedEndDay] = useState(currentDay);

  const handleStartDateConfirm = () => {
    const dateStr = `${selectedStartYear}-${String(selectedStartMonth + 1).padStart(2, "0")}-${String(selectedStartDay).padStart(2, "0")}`;
    setStartDate(dateStr);
    setShowStartPicker(false);
  };

  const handleEndDateConfirm = () => {
    const dateStr = `${selectedEndYear}-${String(selectedEndMonth + 1).padStart(2, "0")}-${String(selectedEndDay).padStart(2, "0")}`;
    setEndDate(dateStr);
    setShowEndPicker(false);
  };

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      Toast.show({
        type: "error",
        text1: "Please select both dates",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }

    if (startDate > endDate) {
      Toast.show({
        type: "error",
        text1: "Start date must be before end date",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }

    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Login required",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/report/range`,
        {
          params: {
            userId: user.id,
            startDate,
            endDate,
          },
        }
      );

      if (response.data?.success) {
        setReportsByVendor(response.data.reportsByVendor || []);
        setOverallTotals({
          totalSale: response.data.overallTotalSale || 0,
          totalVendorCommission: response.data.overallVendorCommission || 0,
          totalCompanyProfit: response.data.overallCompanyProfit || 0,
        });
      } else {
        setReportsByVendor([]);
        setOverallTotals({ totalSale: 0, totalVendorCommission: 0, totalCompanyProfit: 0 });
        Toast.show({
          type: "error",
          text1: response.data?.message || "Failed to fetch history",
          position: "top",
          visibilityTime: 2500,
        });
      }
    } catch (error) {
      console.log("Error fetching history:", error.response?.data || error.message);
      setReportsByVendor([]);
      setOverallTotals({ totalSale: 0, totalVendorCommission: 0, totalCompanyProfit: 0 });
      Toast.show({
        type: "error",
        text1: "Failed to fetch history",
        position: "top",
        visibilityTime: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderVendorReport = ({ item }) => (
    <View style={styles.vendorCard}>
      <View style={styles.vendorHeader}>
        <Text style={styles.vendorName}>🏪 {item.vendor.name}</Text>
      </View>

      {item.reports.map((report, index) => (
        <View key={report.id || index} style={styles.dateRow}>
          <Text style={styles.dateText}>
            {formatDisplayDate(new Date(report.date))}
          </Text>
          <View style={styles.reportRow}>
            <Text style={styles.reportText}>
              Sale: ₹{Number(report.totalSale || 0).toFixed(2)}
            </Text>
            <Text style={styles.reportText}>
              Commission: ₹{Number(report.vendorCommission || 0).toFixed(2)}
            </Text>
            <Text style={styles.reportText}>
              Profit: ₹{Number(report.companyProfit || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.vendorTotals}>
        <Text style={styles.vendorTotalLabel}>Vendor Totals:</Text>
        <Text style={styles.vendorTotalValue}>
          Sale: ₹{item.totalSale.toFixed(2)}
        </Text>
        <Text style={styles.vendorTotalValue}>
          Commission: ₹{item.totalVendorCommission.toFixed(2)}
        </Text>
        <Text style={styles.vendorTotalValue}>
          Profit: ₹{item.totalCompanyProfit.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderDatePicker = (visible, onClose, onConfirm, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, title) => {
    const days = generateDays(selectedYear, selectedMonth);
    const maxDay = Math.min(selectedDay, days.length);

    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerCard}>
            <Text style={styles.datePickerTitle}>{title}</Text>

            <View style={styles.datePickerRow}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Year</Text>
                <FlatList
                  data={generateYears()}
                  keyExtractor={(item) => String(item)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedYear === item && styles.pickerItemSelected,
                      ]}
                      onPress={() => {
                        setSelectedYear(item);
                        const newDays = generateDays(item, selectedMonth);
                        if (selectedDay > newDays.length) {
                          setSelectedDay(newDays.length);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedYear === item && styles.pickerItemTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={styles.pickerList}
                  showsVerticalScrollIndicator={true}
                />
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Month</Text>
                <FlatList
                  data={generateMonths()}
                  keyExtractor={(item) => String(item.value)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedMonth === item.value && styles.pickerItemSelected,
                      ]}
                      onPress={() => {
                        setSelectedMonth(item.value);
                        const newDays = generateDays(selectedYear, item.value);
                        if (selectedDay > newDays.length) {
                          setSelectedDay(newDays.length);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMonth === item.value && styles.pickerItemTextSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={styles.pickerList}
                  showsVerticalScrollIndicator={true}
                />
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Day</Text>
                <FlatList
                  data={days}
                  keyExtractor={(item) => String(item)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedDay === item && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedDay(item)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedDay === item && styles.pickerItemTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={styles.pickerList}
                  showsVerticalScrollIndicator={true}
                />
              </View>
            </View>

            <View style={styles.datePickerButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <MainLayout>
      <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>History</Text>
          </View>

          <View style={styles.dateRangeContainer}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowStartPicker(true)}
            >
              <MaterialIcons name="calendar-today" size={20} color="#EC5AA7" />
              <Text style={styles.dateInputText}>
                {startDate || "From Date"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.dateSeparator}>to</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowEndPicker(true)}
            >
              <MaterialIcons name="calendar-today" size={20} color="#EC5AA7" />
              <Text style={styles.dateInputText}>
                {endDate || "To Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={loading}
            >
              <MaterialIcons name="search" size={20} color="#fff" />
              <Text style={styles.searchButtonText}>
                {loading ? "Loading..." : "Search"}
              </Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={{ padding: 20, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#EC5AA7" />
            </View>
          )}

          {!loading && hasSearched && reportsByVendor.length === 0 && (
            <View style={styles.noDataContainer}>
              <MaterialIcons name="history" size={60} color="#D1D5DB" />
              <Text style={styles.noDataText}>No history found for this date range</Text>
              <Text style={styles.noDataSubtext}>
                Reports will appear here after vendors submit their stock data
              </Text>
            </View>
          )}

          {!loading && hasSearched && reportsByVendor.length > 0 && (
            <>
              <View style={styles.overallCard}>
                <Text style={styles.overallTitle}>Overall Summary</Text>
                <View style={styles.overallRow}>
                  <View style={styles.overallItem}>
                    <Text style={styles.overallLabel}>Total Vendors</Text>
                    <Text style={styles.overallValue}>
                      {reportsByVendor.length}
                    </Text>
                  </View>
                  <View style={styles.overallItem}>
                    <Text style={styles.overallLabel}>Total Reports</Text>
                    <Text style={styles.overallValue}>
                      {reportsByVendor.reduce((sum, v) => sum + v.reports.length, 0)}
                    </Text>
                  </View>
                </View>
                <View style={styles.overallRow}>
                  <View style={styles.overallItem}>
                    <Text style={styles.overallLabel}>Total Sale</Text>
                    <Text style={[styles.overallValue, { color: "#10B981" }]}>
                      ₹{overallTotals.totalSale.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.overallItem}>
                    <Text style={styles.overallLabel}>Total Commission</Text>
                    <Text style={[styles.overallValue, { color: "#F59E0B" }]}>
                      ₹{overallTotals.totalVendorCommission.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.overallItem}>
                    <Text style={styles.overallLabel}>Total Profit</Text>
                    <Text style={[styles.overallValue, { color: "#EC5AA7" }]}>
                      ₹{overallTotals.totalCompanyProfit.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>

              <FlatList
                data={reportsByVendor}
                keyExtractor={(item) => item.vendor.id}
                renderItem={renderVendorReport}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {!hasSearched && !loading && (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search" size={60} color="#D1D5DB" />
              <Text style={styles.emptyText}>
                Select a date range to view history
              </Text>
              <Text style={styles.emptySubtext}>
                Choose start and end dates, then tap Search
              </Text>
            </View>
          )}

          {renderDatePicker(
            showStartPicker,
            () => setShowStartPicker(false),
            handleStartDateConfirm,
            selectedStartYear,
            setSelectedStartYear,
            selectedStartMonth,
            setSelectedStartMonth,
            selectedStartDay,
            setSelectedStartDay,
            "Select Start Date"
          )}

          {renderDatePicker(
            showEndPicker,
            () => setShowEndPicker(false),
            handleEndDateConfirm,
            selectedEndYear,
            setSelectedEndYear,
            selectedEndMonth,
            setSelectedEndMonth,
            selectedEndDay,
            setSelectedEndDay,
            "Select End Date"
          )}
        </View>
      </ScreenContainer>
    </MainLayout>
  );
}
