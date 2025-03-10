import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DeckProvider } from "./src/context/DeckContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import TabNavigator from "./src/navigation/TabNavigator";
import AuthScreen from "./src/screens/AuthScreen";

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null; //  Prevent flicker during authentication check

  return user ? <TabNavigator /> : <AuthScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <DeckProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </DeckProvider>
    </AuthProvider>
  );
}
