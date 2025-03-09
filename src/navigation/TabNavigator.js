import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckStackNavigator from "./StackNavigator";
import AddDeckScreen from "../screens/AddDeckScreen";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar, // Apply transparent styling
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeckScreen}
        options={{
          title: "Create a Deck", // ✅ Sets the header title correctly
          headerShown: true,
          headerStyle: styles.header, // ✅ Apply the copied header style
          headerTitleAlign: "center", // ✅ Center the title
          headerTitleStyle: styles.titleText, // ✅ Apply consistent title style
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: 70,
    borderTopWidth: 0,
    elevation: 0,
  },
  header: {
    backgroundColor: "#E3F2FD", // Matches tab theme
    elevation: 5, // Adds soft shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 120,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
  },
});
