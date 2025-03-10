import { createStackNavigator } from "@react-navigation/stack";
import DeckListScreen from "../screens/DeckListScreen";
import DeckDetailScreen from "../screens/DeckDetailScreen";
import QuizScreen from "../screens/QuizScreen";
import AddCardScreen from "../screens/AddCardScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import QuizResultScreen from "../screens/QuizResultScreen";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditDeckScreen from "../screens/EditDeckScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTitle: ({ children }) => (
          <View>
            <Text style={styles.titleText}>{children}</Text>
          </View>
        ),
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color="#007AFF" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="DeckList"
        component={DeckListScreen}
        options={{ title: "Decks", headerLeft: () => null }}
      />
      <Stack.Screen
        name="DeckDetail"
        component={DeckDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: "Quiz Time" }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: "Add a Card" }}
      />
      <Stack.Screen
        name="AddDeck"
        component={AddDeckScreen}
        options={{ title: "Create a Deck" }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ title: "Results" }}
      />
      <Stack.Screen
        name="EditDeck"
        component={EditDeckScreen}
        options={{ title: "Edit Deck" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E3F2FD",
    elevation: 5,
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
  backButton: {
    marginLeft: 15,
    padding: 10,
  },
});
