import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDecks } from "../context/DeckContext";
import DeckItem from "../components/DeckItem";

export default function DeckListScreen({ navigation }) {
  const { decks, fetchDecks } = useDecks(); //  Ensure we use Firestore data
  const deckArray = Object.values(decks); //  Convert object to array

  //  Ensure decks refresh when screen is focused
  useEffect(() => {
    fetchDecks(); //  Force Firestore data refresh
  }, []);

  if (!deckArray.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No decks available. Start by adding one!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={deckArray}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <DeckItem
          deck={item}
          onPress={() =>
            navigation.navigate("DeckDetail", { title: item.title })
          }
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Matches app theme
    paddingBottom: 90,
  },
  message: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 70,
  },
});
