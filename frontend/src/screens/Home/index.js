import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import MainLayout from "../../layouts/MainLayout";
import ScreenContainer from "../../components/ScreenContainer";

import DateSelector from "./components/DateSelector";
import VendorSelector from "./components/VendorSelector";
import InitialStockCard from "./components/InitialStockCard";
import LeftoverStockCard from "./components/LeftoverStockCard";
import SummaryCard from "./components/SummaryCard";
import DailyHistoryDashboard from "./components/DailyHistoryDashboard";

import {
  formatDisplayDate,
  isPastDate,
  toDateKey,
} from "../../utils/date";

import { useAuth } from "../../context/AuthContext";
import { useNavbar } from "../../context/NavbarContext";
import axios from "axios";

export default function Home() {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [initialStock, setInitialStock] = useState({});

  const [leftoverStock, setLeftoverStock] = useState({});

  const [frozenInitialStock, setFrozenInitialStock] = useState({});

  const [frozenLeftoverStock, setFrozenLeftoverStock] = useState({});

  const [leftoverStockSaved, setLeftoverStockSaved] = useState(false);

  const [historyReports, setHistoryReports] = useState([]);

  const [loadingReports, setLoadingReports] = useState(false);

  const { user } = useAuth();
  const { setNavbarTitle } = useNavbar();

  const isHistoryDate = isPastDate(selectedDate);

  useEffect(() => {
    if (!isHistoryDate || !user?.id) {
      setHistoryReports([]);
      return;
    }

    const fetchReports = async () => {
      setLoadingReports(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/report/date/${toDateKey(selectedDate)}`,
          {
            params: { userId: user.id },
          },
        );
        if (response.data?.success && response.data?.reports) {
          const formatted = response.data.reports.map((report) => ({
            vendor: report.vendor,
            initialStock: report.initialStock || {},
            leftoverStock: report.leftoverStock || {},
            totalSale: report.totalSale,
            vendorCommission: report.vendorCommission,
            companyProfit: report.companyProfit,
          }));
          setHistoryReports(formatted);
        } else {
          setHistoryReports([]);
        }
      } catch (error) {
        console.log("Error fetching reports:", error.response?.data || error.message);
        setHistoryReports([]);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReports();
  }, [isHistoryDate, user?.id, selectedDate]);

  useEffect(() => {
    if (!selectedVendor?.id || !user?.id || !selectedDate || isHistoryDate) {
      return;
    }

    const checkExistingReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/report/date/${toDateKey(selectedDate)}`,
          {
            params: { userId: user.id },
          },
        );
        if (response.data?.success && response.data?.reports) {
          const existingReport = response.data.reports.find(
            (report) => report.vendorId === selectedVendor.id,
          );
          setLeftoverStockSaved(!!existingReport);
          if (existingReport) {
            setFrozenInitialStock(existingReport.initialStock || {});
            setFrozenLeftoverStock(existingReport.leftoverStock || {});
          }
        } else {
          setLeftoverStockSaved(false);
          setFrozenInitialStock({});
          setFrozenLeftoverStock({});
        }
      } catch (error) {
        console.log("Error checking existing report:", error.response?.data || error.message);
        setLeftoverStockSaved(false);
        setFrozenInitialStock({});
        setFrozenLeftoverStock({});
      }
    };

    checkExistingReport();
  }, [selectedVendor?.id, user?.id, selectedDate, isHistoryDate]);

  useEffect(() => {
    if (isHistoryDate) {
      setNavbarTitle(null);
      return;
    }

    setNavbarTitle(selectedVendor ? selectedVendor.name : null);

    return () => setNavbarTitle(null);
  }, [selectedVendor, isHistoryDate, setNavbarTitle]);

  const handleDateChange = (date) => {
    if (toDateKey(date) > toDateKey(new Date())) return;

    setSelectedDate(date);
    setSelectedVendor(null);
    setInitialStock({});
    setLeftoverStock({});
    setFrozenInitialStock({});
    setFrozenLeftoverStock({});
    setLeftoverStockSaved(false);
  };

  const handleInitialStockSaved = (savedStock) => {
    setFrozenInitialStock(savedStock);
  };

  const handleLeftoverStockSaved = (savedStock) => {
    setFrozenLeftoverStock(savedStock);
    setLeftoverStockSaved(true);
  };

  return (
    <MainLayout>
      <ScreenContainer
        stickyHeaderIndices={
          isHistoryDate ? undefined : selectedVendor ? [2] : [1]
        }
      >
        <DateSelector
          date={selectedDate}
          setDate={handleDateChange}
        />

        {isHistoryDate ? (
          <DailyHistoryDashboard
            date={selectedDate}
            reports={historyReports}
            loading={loadingReports}
          />
        ) : (
          <>
            <View>
              <VendorSelector
                selectedVendor={selectedVendor}
                setSelectedVendor={(vendor) => {
                  setSelectedVendor(vendor);
                  setInitialStock({});
                  setLeftoverStock({});
                  setFrozenInitialStock({});
                  setFrozenLeftoverStock({});
                  setLeftoverStockSaved(false);
                }}
              />
            </View>

            {selectedVendor && (
              <View
                style={{
                  backgroundColor: "#FFE3F1",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  marginBottom: 14,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#EC5AA7",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#2C3E50",
                  }}
                >
                  Vendor: {selectedVendor.name}
                </Text>
              </View>
            )}

            <View>
              {selectedVendor && (
                <InitialStockCard
                  key={`initial-${selectedVendor.id}`}
                  vendor={selectedVendor}
                  date={selectedDate}
                  userId={user?.id}
                  stock={initialStock}
                  setStock={setInitialStock}
                  onSaved={handleInitialStockSaved}
                />
              )}

              {selectedVendor && (
                <LeftoverStockCard
                  key={`leftover-${selectedVendor.id}`}
                  vendor={selectedVendor}
                  initialStock={initialStock}
                  stock={leftoverStock}
                  setStock={setLeftoverStock}
                  date={selectedDate}
                  userId={user?.id}
                  onSaved={handleLeftoverStockSaved}
                />
              )}

              {selectedVendor && leftoverStockSaved && (
                <SummaryCard
                  key={`summary-${selectedVendor.id}`}
                  vendor={selectedVendor}
                  date={formatDisplayDate(selectedDate)}
                  initialStock={frozenInitialStock}
                  leftoverStock={frozenLeftoverStock}
                  commission={30}
                />
              )}
            </View>
          </>
        )}
      </ScreenContainer>
    </MainLayout>
  );
}
