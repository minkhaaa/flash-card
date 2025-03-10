import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import ActionButton from "../components/ActionButton";

export default function AuthScreen() {
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter an email and password.");
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignUp ? "Create Account" : "Sign In"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <ActionButton
        title={isSignUp ? "Sign Up" : "Sign In"}
        onPress={handleAuth}
      />

      <Text style={styles.toggleText}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
      </Text>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleButtonText}>
          {isSignUp ? "Sign In" : "Create an Account"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  toggleText: {
    fontSize: 16,
    color: "#424242",
    marginTop: 20,
  },
  toggleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA726",
    marginTop: 5,
  },
});
