import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function DeckItem({ deck, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deckContainer}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.count}>{deck.questions.length} cards</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    position: "relative",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#424242",
  },
  count: {
    fontSize: 16,
    color: "#757575",
    marginTop: 5,
  },
});
