import React from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDecks } from "../context/DeckContext";
import ActionButton from "../components/ActionButton";

export default function EditDeckScreen({ route, navigation }) {
  const { title } = route.params;
  const { decks, deleteDeck, deleteCard } = useDecks();
  const deck = decks[title];

  if (!deck) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Deck not found.</Text>
      </View>
    );
  }

  //  Confirm & Delete Card
  const handleDeleteCard = (index) => {
    Alert.alert("Delete Card", "Are you sure you want to remove this card?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          deleteCard(title, index);
        },
      },
    ]);
  };

  //  Confirm & Delete Deck (and navigate back to Deck List)
  const handleDeleteDeck = () => {
    Alert.alert("Delete Deck", `Are you sure you want to delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          deleteDeck(title);
          navigation.navigate("DeckList");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Deck: {deck.title}</Text>
      <Text style={styles.subtitle}>{deck.questions.length} cards</Text>

      {/*  FlatList for questions */}
      <FlatList
        data={deck.questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cardItem}>
            <Text style={styles.cardText}>{item.question}</Text>
            <TouchableOpacity onPress={() => handleDeleteCard(index)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/*  Delete Deck Button (Visible Above Bottom Nav) */}
      <View style={styles.footer}>
        <ActionButton
          title="Delete Deck"
          onPress={handleDeleteDeck}
          backgroundColor="#FF3B30"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F2FD",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 150,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
  },
  footer: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    marginBottom: -20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
