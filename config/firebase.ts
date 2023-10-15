// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAIAIOP1FUFjzlFfjkqCrpqJcrre5vlSNc",
  authDomain: "learning-353a2.firebaseapp.com",
  projectId: "learning-353a2",
  storageBucket: "learning-353a2.appspot.com",
  messagingSenderId: "295695066019",
  appId: "1:295695066019:web:69508acdaf5609f40bf016",
  measurementId: "G-TBTQ43G1H3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) {
    return;
  }
  //   check email exist and provide
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length !== 0) {
    throw new Error("Email already exist");
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserProfileDocument = async (
  userAuth: UserCredential,
  additionalData: {
    fullName?: string;
    address?: string;
    authProvider: string;
  } = {
    fullName: "",
    address: "",
    authProvider: "email",
  },
) => {
  const user = userAuth.user;
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const { displayName, email, photoURL, phoneNumber } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        phoneNumber,
        createdAt,
        ...additionalData,
        authProvider: userAuth.providerId ?? "email",
      });
    } catch (error: any) {
      console.log("error creating user", error.message);
    }
  }
};

type Product = {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const createProductDocument = async (product: Product) => {
  try {
    const productDocRef = doc(db, "products", uuidv4());
    await setDoc(productDocRef, product);
  } catch (error: any) {
    console.log("error creating product", error.message);
  }
};

export const getProducts = async () => {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id } as Product);
    });
    return products;
  } catch (error: any) {
    console.log("error fetching products", error.message);
  }
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback: () => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
export const getUserProfileDocument = async (uid: string) => {
  if (!uid) {
    return null;
  }
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    }
  } catch (error: any) {
    console.log("error fetching user", error.message);
  }
};

export const updateProfileDocument = async (uid: string, objUpdate: {}) => {
  const { address, fullName, phoneNumber, photoURL } = objUpdate as any;
  if (!uid) {
    return null;
  }
  await updateDoc(doc(db, "users", uid), {
    address,
    fullName,
    phoneNumber,
    photoURL,
  });
};
