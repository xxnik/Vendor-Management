import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, BackHandler, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect, usePathname } from "expo-router";
import Toast from "react-native-toast-message";

import MainLayout from "../../layouts/MainLayout";
import ScreenContainer from "../../components/ScreenContainer";
import AddVendorModal from "./components/AddVendorModal";
import EditVendorModal from "./components/EditVendormodal";
import DeleteVendorModal from "./components/DeleteVendorModal";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../config";

import styles from "./style";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Vendors() {
  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();

  const isLoggedIn = Boolean(user);

  const fetchVendor = useCallback(async () => {
    if (!user?.id) {
      setVendorList([]);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(
        `/api/vendor/user/${user.id}`,
      );
      if (response.data?.success) {
        setVendorList(response.data?.vendor || []);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleAdd = async (vendor) => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: t("loginRequired"),
        text2: "Please login to add ice cream.",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }
    try {
      const response = await api.post(
        "/api/vendor/create",
        {
          ...vendor,
          userId: user.id,
        },
      );
      if (response.data?.success) {
        fetchVendor();
        Toast.show({
          type: "success",
          text1: "Vendor added",
          text2: `${vendor.name || "Vendor"} was saved successfully.`,
          position: "top",
          visibilityTime: 2500,
        });
      }
    } catch (error) {
      console.log("Backend Error:", error.response?.data);
      console.log("Status:", error.response?.status);
    } finally {
      setAddVisible(false);
    }
  };

  const handleUpdate = async (updatedVendor) => {
    try {
      await api.put(
        `/api/vendor/${updatedVendor.id}`,
        {
          name: updatedVendor.name,
          phone: updatedVendor.phone,
        },
      );
      setEditVisible(false);
      setSelectedVendor(null);
      fetchVendor();

      Toast.show({
        type: "success",
        text1: "Vendor updated",
        text2: `${updatedVendor.name} was updated successfully.`,
        position: "top",
        visibilityTime: 2500,
      });
    } catch (error) {
      console.log("Update Error:", error.response?.data || error.message);
        Toast.show({
          type: "error",
          text1: t("updateFailed"),
          text2: "Could not update vendor. Try again.",
          position: "top",
          visibilityTime: 2500,
        });
    }
  };

  const handleDelete = async () => {
    if (!selectedVendor) return;
    try {
      await api.delete(
        `/api/vendor/${selectedVendor.id}`,
      );
      setDeleteVisible(false);
      setSelectedVendor(null);
      fetchVendor();

      Toast.show({
        type: "success",
        text1: "Vendor deleted",
        text2: `${selectedVendor.name} was deleted successfully.`,
        position: "top",
        visibilityTime: 2500,
      });
    } catch (error) {
      console.log("Delete Error:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Delete failed",
        text2: "Could not delete vendor. Try again.",
        position: "top",
        visibilityTime: 2500,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)/home");
        return true;
      };

      fetchVendor();

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [router, fetchVendor]),
  );

  return (
    <MainLayout
      onAddVendor={isLoggedIn ? () => setAddVisible(true) : undefined}
    >
      <ScreenContainer>
        <View style={styles.header}>
          <Text style={styles.title}>{t("vendors")}</Text>

          {!isLoggedIn ? (
            <TouchableOpacity
              style={styles.loginPromptButton}
              onPress={() =>
                router.push({
                  pathname: "/(auth)/login",
                  params: { redirect: pathname },
                })
              }
            >
              <Text style={styles.loginPromptText}>{t("loginToAddVendor")}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setAddVisible(true)}
            >
              <MaterialIcons name="add" size={20} color="#fff" />

              <Text style={styles.addText}>{t("addVendor")}</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#EC5AA7" />
          </View>
        ) : vendorList.length === 0 ? (
          <Text style={styles.emptyText}>{t("noVendors")}</Text>
        ) : (
          vendorList.map((vendor) => (
            <View key={vendor.id} style={styles.vendorCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getInitials(vendor.name)}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}
              >
                <Text style={styles.vendorName}>{vendor.name}</Text>

                {vendor.phone ? (
                  <Text style={styles.vendorMeta}>{vendor.phone}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSelectedVendor(vendor);
                  setEditVisible(true);
                }}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="edit" size={24} color="#EC5AA7" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedVendor(vendor);
                  setDeleteVisible(true);
                }}
              >
                <MaterialIcons name="delete" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))
        )}

        <AddVendorModal
          visible={addVisible}
          onClose={() => setAddVisible(false)}
          onSave={handleAdd}
        />

        <EditVendorModal
          visible={editVisible}
          vendor={selectedVendor}
          onClose={() => setEditVisible(false)}
          onUpdate={handleUpdate}
        />

        <DeleteVendorModal
          visible={deleteVisible}
          vendor={selectedVendor}
          onClose={() => setDeleteVisible(false)}
          onDelete={handleDelete}
        />
      </ScreenContainer>
    </MainLayout>
  );
}
