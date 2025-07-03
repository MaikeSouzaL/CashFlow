import { auth, firebase } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName,
          image: firebaseUser?.photoURL,
        });
        // Update user data in Firestore
        updateUserData(firebaseUser.uid);
        
        router.replace("/(tabs)/home");
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Senha errada. Por favor, verifique e tente novamente.";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "E-mail  inválida. Por favor, verifique e tente novamente.";
      }

      return { success: false, msg: msg };
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
     
      await setDoc(doc(firebase, `users/${response.user.uid}`), {
        email: email,
        name: name,
        uid: response?.user?.uid,
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "E-mail já cadastrado. Por favor, tente outro.";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "E-mail inválido. Por favor, verifique e tente novamente.";
      }
      if (msg.includes("(auth/weak-password)")) {
        msg = "Senha muito fraca. Por favor, crie uma senha mais forte.";
      }
      return { success: false, msg: msg };
    }
  }

  async function updateUserData(uid: string) {
    try {
      const docRef = doc(firebase, `users`, uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };

        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      console.log("Error updating user data:", msg);
      // return { success: false, msg: msg };
    }
  }
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
