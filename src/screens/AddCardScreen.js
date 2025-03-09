import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useDecks } from "../context/DeckContext";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";

export default function AddCardScreen({ route, navigation }) {
  const { title } = route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { addCardToDeck } = useDecks();

  const handleAddCard = async () => {
    if (question.trim() === "" || answer.trim() === "") {
      Alert.alert("Invalid Input", "Both question and answer are required.");
      return;
    }

    const newCard = { question: question.trim(), answer: answer.trim() };

    await addCardToDeck(title, newCard);

    Alert.alert("Success", "Card added!", [
      {
        text: "OK",
        onPress: () => {
          setQuestion("");
          setAnswer("");
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Add a New Card to</Text>
        <Text style={styles.deckTitle}>{title}</Text>
        <InputField
          placeholder="Enter question"
          value={question}
          onChangeText={setQuestion}
        />
        <InputField
          placeholder="Enter answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <ActionButton title="Add Card" onPress={handleAddCard} />
      </View>
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
  contentContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
    textAlign: "center",
  },
  deckTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 15,
    textAlign: "center",
  },
});
