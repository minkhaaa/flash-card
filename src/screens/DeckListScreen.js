import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import DeckItem from "../components/DeckItem";
import { useDecks } from "../context/DeckContext";

export default function DeckListScreen({ navigation }) {
  const { decks } = useDecks();
  const deckArray = Object.values(decks);

  if (deckArray.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          No decks available. Start by adding one!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Matches app theme
    paddingTop: 20,
    paddingBottom: 90,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
});
