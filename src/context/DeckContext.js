import React, { createContext, useContext, useState, useEffect } from "react";
import { getDecks, saveDeckTitle, addCardToDeck } from "../storage/storage";

// Create Context
const DeckContext = createContext();

// Provider Component
export function DeckProvider({ children }) {
  const [decks, setDecks] = useState({});

  // Load all decks from AsyncStorage when the app starts
  useEffect(() => {
    async function loadInitialDecks() {
      const storedDecks = await getDecks();
      setDecks(storedDecks); // Fill initial state
    }
    loadInitialDecks();
  }, []);

  // Add a new deck (updates both AsyncStorage and Context)
  async function addDeck(title) {
    await saveDeckTitle(title); // Save to storage
    const updatedDecks = await getDecks(); // Reload all decks
    setDecks(updatedDecks); // Update context state
  }

  // Add a new card to a deck (updates both AsyncStorage and Context)
  async function addCardToDeckContext(title, card) {
    await addCardToDeck(title, card); // Save to storage
    const updatedDecks = await getDecks(); // Reload all decks
    setDecks(updatedDecks); // Update context state
  }

  return (
    <DeckContext.Provider
      value={{ decks, addDeck, addCardToDeck: addCardToDeckContext }}
    >
      {children}
    </DeckContext.Provider>
  );
}

// Hook for accessing decks anywhere in the app
export function useDecks() {
  return useContext(DeckContext);
}
