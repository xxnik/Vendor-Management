import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import MainLayout from "../../layouts/MainLayout";
import ScreenContainer from "../../components/ScreenContainer";

import styles from "./style";

import IceCreamCard from "./components/IceCreamCard";
import AddIceCreamModal from "./components/AddIceCreamModal";
import EditIceCreamModal from "./components/EditIceCreamModal";
import DeleteIceCreamModal from "./components/DeleteIceCreamModal";

import { BackHandler } from "react-native";
import { useFocusEffect, useRouter, usePathname } from "expo-router";
import Toast from "react-native-toast-message";

import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function IceCream() {
  const [iceCreams, setIceCreams] = useState([]);

  const [addVisible, setAddVisible] = useState(false);

  const [editVisible, setEditVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [selectedIceCream, setSelectedIceCream] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const fetchIceCreams = useCallback(async () => {
    if (!user?.id) {
      setIceCreams([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://10.210.94.213:5000/api/icecream/user/${user.id}`,
      );

      if (response.data?.success) {
        setIceCreams(response.data.icecreams || []);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)/home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      fetchIceCreams();

      return () => subscription.remove();
    }, [fetchIceCreams, router]),
  );

  const handleAdd = async (item) => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Login required",
        text2: "Please login to add ice cream.",
        position: "top",
        visibilityTime: 2500,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://10.210.94.213:5000/api/icecream/create",
        {
          ...item,
          userId: user.id,
        },
      );

      if (response.data?.success) {
        setIceCreams((prev) => [response.data.icecream, ...prev]);
        Toast.show({
          type: "success",
          text1: "Icecream added",
          text2: `${item.name} was saved successfully.`,
          position: "top",
          visibilityTime: 2500,
        });
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  const handleUpdate = async (updatedItem) => {
    console.log("update clicked");
    try {
      const response = await axios.put(
        `http://10.210.94.213:5000/api/icecream/${selectedIceCream.id}`,
        { ...updatedItem },
      );
      if (response.data?.success) {
        setIceCreams((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        );
        Toast.show({
          type: "success",
          text1: "Ice cream Updated",
          text2: `${updatedItem.name} was Updated successfully.`,
          position: "top",
          visibilityTime: 3000,
        });
      }
      console.log("Updated Item:", updatedItem);
      console.log("Current State:", iceCreams);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://10.210.94.213:5000/api/icecream/${selectedIceCream.id}`,
      );
      if (response.data?.success) {
        setIceCreams((prev) =>
          prev.filter((icecream) => icecream.id !== selectedIceCream.id),
        );
        Toast.show({
          type: "success",
          text1: "Ice cream Delete",
          text2: `${selectedIceCream.name} was deleted successfully.`,
          position: "top",
          visibilityTime: 1000,
        });
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }

    setDeleteVisible(false);
  };

  return (
    <MainLayout>
      <ScreenContainer>
        <View style={styles.header}>
          <Text style={styles.title}>🍦 Ice Cream Types</Text>

          {!user?.id ? (
            <TouchableOpacity
              style={styles.loginPromptButton}
              onPress={() =>
                router.push({
                  pathname: "/(auth)/login",
                  params: {
                    redirect: pathname,
                  },
                })
              }
            >
              <Text style={styles.loginPromptText}>Login to add ice cream</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setAddVisible(true)}
            >
              <MaterialIcons name="add" size={20} color="#fff" />

              <Text style={styles.addText}>Add Ice Cream</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={iceCreams}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <IceCreamCard
              item={item}
              onEdit={() => {
                setSelectedIceCream(item);
                setEditVisible(true);
              }}
              onDelete={() => {
                setSelectedIceCream(item);
                setDeleteVisible(true);
              }}
            />
          )}
        />

        <AddIceCreamModal
          visible={addVisible}
          onClose={() => setAddVisible(false)}
          onSave={handleAdd}
        />

        <EditIceCreamModal
          visible={editVisible}
          onClose={() => setEditVisible(false)}
          item={selectedIceCream}
          onUpdate={handleUpdate}
        />

        <DeleteIceCreamModal
          visible={deleteVisible}
          item={selectedIceCream}
          onCancel={() => setDeleteVisible(false)}
          onDelete={handleDelete}
        />
      </ScreenContainer>
    </MainLayout>
  );
}
