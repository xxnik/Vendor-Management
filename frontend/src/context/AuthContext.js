import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const USER_KEY = "@ict_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(USER_KEY);
        if (isMounted && stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.log("Auth restore error:", e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const setUserWithStorage = (userData) => {
    setUser(userData);
    AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)).catch((e) =>
      console.log("Auth storage error:", e),
    );
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser: setUserWithStorage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}