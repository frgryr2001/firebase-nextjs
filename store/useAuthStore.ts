import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
  signInWithGooglePopup,
  signOutUser,
} from "@/config/firebase";
import { User } from "firebase/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { signInAuthUserWithEmailAndPassword } from "../config/firebase";

type AuthStore = {
  user: User | null;
  setUser: (user: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  signInWithGooglePopup: () => Promise<void>;
  createAuthUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signInAuthUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  immer((set, get) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading: isLoading })),
    signInWithGooglePopup: async () => {
      const user = await signInWithGooglePopup();

      if (user) {
        await createUserProfileDocument(user);
      }
    },
    createAuthUserWithEmailAndPassword: async (email, password) => {
      try {
        get().setIsLoading(true);
        const user = await createAuthUserWithEmailAndPassword(email, password);

        if (user) {
          await createUserProfileDocument(user);
        }
        get().setIsLoading(false);
      } catch (error) {
        get().setIsLoading(false);
        throw error;
      }
    },
    signInAuthUserWithEmailAndPassword: async (
      email: string,
      password: string,
    ) => {
      try {
        get().setIsLoading(true);
        const user = await signInAuthUserWithEmailAndPassword(email, password);

        if (user) {
          await createUserProfileDocument(user);
        }
        get().setIsLoading(false);
      } catch (error) {
        get().setIsLoading(false);
        throw error;
      }
    },
    logout: async () => {
      await signOutUser();
    },
  })),
);
