import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { api } from "../../../config";
import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";

import styles from "./style";

export default function VendorSelector({
  selectedVendor,
  setSelectedVendor,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  const fetchVendors = async () => {
    if (!user?.id) {
      setVendors([]);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(
        `/api/vendor/user/${user.id}`,
      );
      if (response.data?.success) {
        setVendors(response.data?.vendor || []);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      fetchVendors();
    }
  }, [modalVisible]);

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.title}>
          {t("vendor")}
        </Text>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.inputText}>
            {selectedVendor
              ? selectedVendor.name
              : t("selectVendorPlaceholder")}
          </Text>

          <MaterialIcons
            name="keyboard-arrow-down"
            size={26}
            color="#EC5AA7"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {t("selectVendor")}
            </Text>

            <FlatList
              data={vendors}
              keyExtractor={(item) =>
                item.id.toString()
              }
              ListEmptyComponent={
                loading ? (
                  <View style={{ padding: 20, alignItems: "center" }}>
                    <ActivityIndicator size="small" color="#EC5AA7" />
                  </View>
                ) : (
                  <Text style={styles.emptyText}>
                    {t("noVendorsAvailable")}
                  </Text>
                )
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.vendorItem}
                  onPress={() => {
                    setSelectedVendor(item);
                    setModalVisible(false);
                  }}
                >
                  <MaterialIcons
                    name="person"
                    size={22}
                    color="#EC5AA7"
                  />

                  <Text
                    style={styles.vendorName}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={styles.closeButtonText}
              >
                {t("close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
