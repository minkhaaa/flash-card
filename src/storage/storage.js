import AsyncStorage from "@react-native-async-storage/async-storage";

// Key used to store everything in AsyncStorage
const STORAGE_KEY = "MobileFlashcards:decks";

// Fetch all decks
export async function getDecks() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// Fetch a single deck by title
export async function getDeck(title) {
  const decks = await getDecks();
  return decks[title];
}

// Create a new deck
export async function saveDeckTitle(title) {
  const decks = await getDecks();
  decks[title] = { title, questions: [] };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// Add a new card to a specific deck
export async function addCardToDeck(title, card) {
  const decks = await getDecks();
  decks[title].questions.push(card);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

//  Remove an entire deck
export async function removeDeck(title) {
  const decks = await getDecks();
  delete decks[title]; // Remove the deck
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

//  Remove a specific card from a deck
export async function removeCard(title, cardIndex) {
  const decks = await getDecks();
  if (decks[title] && decks[title].questions.length > cardIndex) {
    decks[title].questions.splice(cardIndex, 1); // Remove the card
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

// (Optional) Clear all decks - Useful for debugging
export async function clearDecks() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
