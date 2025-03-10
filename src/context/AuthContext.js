import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  //  Sign Up with Email & Password
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (error) {
      Alert.alert("Sign-Up Failed", error.message);
    }
  };

  //  Sign In with Email & Password
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //  Sign Out
  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

//  Custom hook to use authentication context
export function useAuth() {
  return useContext(AuthContext);
}
