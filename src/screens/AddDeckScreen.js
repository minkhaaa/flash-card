import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useDecks } from "../context/DeckContext";
import ActionButton from "../components/ActionButton";
import InputField from "../components/InputField";

export default function AddDeckScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const { addDeck } = useDecks();

  const handleCreateDeck = async () => {
    if (title.trim() === "") {
      Alert.alert("Invalid Input", "Deck title cannot be empty.");
      return;
    }

    await addDeck(title.trim());

    Alert.alert("Success", `Deck "${title}" created!`, [
      {
        text: "OK",
        onPress: () => {
          setTitle(""); // Clear the input
          navigation.navigate("Decks"); // Go back to deck list
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is the title of your new deck?</Text>
      <InputField
        placeholder="Enter Deck Title"
        placeholderTextColor="#9E9E9E"
        value={title}
        onChangeText={setTitle}
      />
      <ActionButton title="Create Deck" onPress={handleCreateDeck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
    textAlign: "center",
  },
});
