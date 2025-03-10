import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDecks } from "../context/DeckContext";
import ActionButton from "../components/ActionButton";

export default function DeckDetailScreen({ route, navigation }) {
  const { title } = route.params; // Get deck title from navigation params
  const { decks } = useDecks(); // Access all decks from context
  const deck = decks[title]; // Get the specific deck

  if (!deck) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Deck not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.subtitle}>{deck.questions.length} cards</Text>

      <View style={styles.buttonContainer}>
        <ActionButton
          title="Add Card"
          onPress={() => navigation.navigate("AddCard", { title: deck.title })}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ActionButton
          title="Start Quiz"
          onPress={() => {
            if (deck.questions.length === 0) {
              alert("No cards in this deck yet! Add some cards first.");
            } else {
              navigation.navigate("Quiz", { title: deck.title });
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          title="Edit Deck"
          onPress={() => navigation.navigate("EditDeck", { title })}
          backgroundColor="#FFA726"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F2FD", // Matches app theme
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
