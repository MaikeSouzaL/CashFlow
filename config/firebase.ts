import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx9IlgD4YAOwIi3yl3YXx5TMD2gp-89UU",
  authDomain: "cashflow-efb27.firebaseapp.com",
  projectId: "cashflow-efb27",
  storageBucket: "cashflow-efb27.firebasestorage.app",
  messagingSenderId: "541556628752",
  appId: "1:541556628752:web:3bfe5a1b8a2d0f37f09995",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firebase = getFirestore(app);

export { app, auth, firebase };
