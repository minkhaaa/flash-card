import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabNavigator from "./src/navigation/TabNavigator";
import { DeckProvider } from "./src/context/DeckContext";

export default function App() {
  return (
    <DeckProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </DeckProvider>
  );
}
