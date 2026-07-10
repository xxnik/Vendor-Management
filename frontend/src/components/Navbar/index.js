import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavbar } from "../../context/NavbarContext";
import { useLanguage } from "../../context/LanguageContext";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./style";

export default function Navbar({ onAddVendor }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearAuth } = useAuth();
  const { navbarTitle } = useNavbar();
  const { width } = useWindowDimensions();
  const { t } = useLanguage();

  const isMobile = width < 768;

  const isLoggedIn = Boolean(user);

  const showAddVendor = pathname === "/(tabs)/vendors" && onAddVendor && isLoggedIn;

  const displayUser = {
    username: user?.username || user?.name || user?.fullName || "Guest",
  };

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const handleLogout = async () => {
    await clearAuth();
    setDrawerVisible(false);
    setProfileVisible(false);

    Toast.show({
      type: "success",
      text1: t("loggedOutSuccessfully"),
      text2: t("youHaveBeenSignedOut"),
    });

    setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 1000);
  };

  const menus = [
    {
      title: t("home"),
      icon: "home",
      route: "/(tabs)/home",
    },
    {
      title: t("iceCream"),
      icon: "ice-cream",
      route: "/(tabs)/icecream",
      community: true,
    },
    {
      title: t("vendors"),
      icon: "storefront",
      route: "/(tabs)/vendors",
    },
    {
      title: t("history"),
      icon: "history",
      route: "/(tabs)/history",
    },
    {
      title: t("settings"),
      icon: "settings",
      route: "/(tabs)/settings",
    },
  ];

  if (isMobile) {
    return (
      <>
        <View style={styles.mobileHeader}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <MaterialIcons name="menu" size={30} color="#2C3E50" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              {navbarTitle ? navbarTitle : "🍦 ICT"}
            </Text>
          </View>

          {showAddVendor && (
            <TouchableOpacity
              style={styles.mobileAddButton}
              onPress={onAddVendor}
            >
              <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <Modal visible={drawerVisible} transparent animationType="slide">
          <Pressable
            style={styles.overlay}
            onPress={() => setDrawerVisible(false)}
          />

          <View style={styles.drawer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDrawerVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>

            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {displayUser.username.charAt(0)}
                </Text>
              </View>

              <View style={styles.userNameBox}>
                <Text style={styles.userName}>{displayUser.username}</Text>
              </View>
            </View>

            {menus.map((menu) => (
              <TouchableOpacity
                key={menu.title}
                style={styles.drawerItem}
                onPress={() => {
                  router.push(menu.route);
                  setDrawerVisible(false);
                }}
              >
                {menu.community ? (
                  <MaterialCommunityIcons
                    name={menu.icon}
                    size={22}
                    color="#EC5AA7"
                  />
                ) : (
                  <MaterialIcons name={menu.icon} size={22} color="#EC5AA7" />
                )}

                <Text style={styles.drawerText}>{menu.title}</Text>

                {showAddVendor && menu.title === "Vendors" && (
                  <TouchableOpacity
                    style={styles.drawerAddButton}
                    onPress={() => {
                      onAddVendor();
                      setDrawerVisible(false);
                    }}
                  >
                    <MaterialIcons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            {isLoggedIn ? (
              <>
                <TouchableOpacity
                  style={styles.drawerItem}
                  onPress={handleLogout}
                >
                  <MaterialIcons name="logout" size={22} color="red" />
                  <Text style={styles.drawerText}>{t("logout")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerItem}
                  onPress={() => {
                    router.push("/(tabs)/settings");
                    setDrawerVisible(false);
                  }}
                >
                  <MaterialIcons name="settings" size={22} color="#EC5AA7" />
                  <Text style={styles.drawerText}>{t("settings")}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.drawerItem}
                  onPress={() => {
                    router.push("/(auth)/login");
                    setDrawerVisible(false);
                  }}
                >
                  <MaterialIcons name="login" size={22} color="#EC5AA7" />
                  <Text style={styles.drawerText}>{t("login")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.drawerItem}
                  onPress={() => {
                    router.push("/(auth)/signup");
                    setDrawerVisible(false);
                  }}
                >
                  <MaterialIcons name="person-add" size={22} color="#EC5AA7" />
                  <Text style={styles.drawerText}>{t("signup")}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftMenu}>
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.title}
            style={[
              styles.menuButton,
              pathname === menu.route && styles.activeButton,
            ]}
            onPress={() => router.replace(menu.route)}
          >
            <Text
              style={[
                styles.menuText,
                pathname === menu.route && styles.activeText,
              ]}
            >
              {menu.title}
            </Text>

            {showAddVendor && menu.title === "Vendors" && (
              <TouchableOpacity
                style={styles.navAddButton}
                onPress={onAddVendor}
              >
                <MaterialIcons name="add" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {!isLoggedIn ? (
        <View style={styles.authButtons}>
          <View style={styles.profileButton}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {displayUser.username.charAt(0)}
              </Text>
            </View>

            <Text style={styles.userName}>{displayUser.username}</Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push("/(auth)/signup")}
          >
            <MaterialIcons name="person-add" size={18} color="#fff" />
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileMenu}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setProfileVisible((visible) => !visible)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {displayUser.username.charAt(0)}
              </Text>
            </View>

            <Text style={styles.userName}>{displayUser.username}</Text>

            <MaterialIcons name="arrow-drop-down" size={24} />
          </TouchableOpacity>

          {profileVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  router.push("/(tabs)/settings");
                  setProfileVisible(false);
                }}
              >
                <MaterialIcons name="settings" size={20} color="#EC5AA7" />
                <Text style={styles.dropdownText}>{t("settings")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleLogout}
              >
                <MaterialIcons name="logout" size={20} color="red" />
                <Text style={styles.dropdownText}>{t("logout")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
