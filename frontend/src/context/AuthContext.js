import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../config";

const AuthContext = createContext();

const TOKEN_KEY = "@ict_token";
const USER_KEY = "@ict_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserWithStorage = async (userData) => {
    setUser(userData);
    try {
      await Promise.all([
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData)),
      ]);
    } catch (e) {
      console.log("Auth storage error:", e);
    }
  };

  const setToken = async (token) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
      console.log("Token storage error:", e);
    }
  };

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (e) {
      console.log("Token get error:", e);
      return null;
    }
  };

  const clearAuth = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
      ]);
    } catch (e) {
      console.log("Auth clear error:", e);
    }
    setUser(null);
  };

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_KEY),
          SecureStore.getItemAsync(USER_KEY),
        ]);

        if (!isMounted) return;

        if (storedToken && storedUser) {
          try {
            const response = await api.get("/api/auth/me", {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });

            if (isMounted && response.data?.success && response.data?.user) {
              setUser(response.data.user);
              await SecureStore.setItemAsync(USER_KEY, JSON.stringify(response.data.user));
            } else {
              await clearAuth();
            }
          } catch (error) {
            if (isMounted && error.response?.status === 401) {
              await clearAuth();
            } else if (isMounted && storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }
        } else if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (isMounted) {
          setLoading(false);
        }
      } catch (e) {
        console.log("Auth restore error:", e);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser: setUserWithStorage, setToken, getToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
