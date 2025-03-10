import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnOOzq_Vl0MlUhLOD4DxTmrjix6er2IRY",
  authDomain: "flash-card-87b56.firebaseapp.com",
  projectId: "flash-card-87b56",
  storageBucket: "flash-card-87b56.appspot.com",
  messagingSenderId: "509760370306",
  appId: "1:509760370306:web:87f79fe9b8339dfc7b269b",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth with Persistent Login
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Firestore Database
const db = getFirestore(app);

export { auth, db };
