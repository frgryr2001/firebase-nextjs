"use client";

import { auth } from "@/config/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { User, onAuthStateChanged } from "firebase/auth";

import { useContext, useEffect, createContext } from "react";
import Cookies from "js-cookie";

type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser, isLoading, setIsLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        userAuth.getIdToken().then((token) => {
          Cookies.set("token", token, { expires: 7 });
        });
      } else {
        setUser(null);
        Cookies.remove("token");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
