import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // ✅ Import Firestore & Auth

const DeckContext = createContext();

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState({});
  const user = auth.currentUser; // ✅ Get the logged-in user

  // ✅ Debug: Print the logged-in user
  console.log("👤 Logged-in User:", user ? user.uid : "No user logged in");

  // ✅ Function to fetch decks from Firestore
  async function fetchDecks() {
    const user = auth.currentUser; // ✅ Get the logged-in user

    if (!user) {
      console.log("🚨 No user logged in! Cannot fetch decks.");
      return;
    }

    try {
      console.log(`🔄 Fetching decks for user: ${user.uid}`);

      const userDecksRef = collection(db, "users", user.uid, "decks"); // ✅ Ensure we fetch only this user's decks
      const snapshot = await getDocs(userDecksRef);
      let fetchedDecks = {};

      snapshot.forEach((doc) => {
        fetchedDecks[doc.id] = doc.data();
      });

      console.log("🔥 Firestore Decks Fetched:", fetchedDecks); // ✅ Debugging Firestore data
      setDecks(fetchedDecks);
    } catch (error) {
      console.error("❌ Firestore Fetch Error:", error); // ✅ Print Firestore errors
    }
  }

  useEffect(() => {
    fetchDecks(); // ✅ Fetch decks when the app starts
  }, [user]);

  // ✅ Add a deck to Firestore
  async function addDeck(title) {
    const user = auth.currentUser; // ✅ Ensure we get the logged-in user
    if (!user) {
      console.log("🚨 No user logged in! Cannot add deck.");
      return;
    }

    try {
      console.log(`➕ Adding deck: ${title} for user: ${user.uid}`);

      // ✅ Store deck inside user-specific path
      const deckRef = doc(db, "users", user.uid, "decks", title);
      await setDoc(deckRef, { title: title.trim(), questions: [] });

      console.log(`✅ Deck "${title}" added successfully.`);
      fetchDecks(); // 🔥 Refresh decks from Firestore
    } catch (error) {
      console.error("❌ Firestore Add Deck Error:", error);
    }
  }

  // ✅ Add a card to a deck
  async function addCardToDeck(title, card) {
    const user = auth.currentUser;
    if (!user) {
      console.log("🚨 No user logged in! Cannot add card.");
      return;
    }

    try {
      console.log(`➕ Adding card to deck: ${title} for user: ${user.uid}`);

      // ✅ Ensure we store cards under the logged-in user's deck
      const deckRef = doc(db, "users", user.uid, "decks", title);
      const deckSnapshot = await getDocs(
        collection(db, "users", user.uid, "decks"),
      );
      const deckData = deckSnapshot.docs
        .find((doc) => doc.id === title)
        ?.data();

      if (deckData) {
        let updatedQuestions = deckData.questions || []; // ✅ Ensure it's an array
        updatedQuestions.push(card);

        await updateDoc(deckRef, { questions: updatedQuestions }); // ✅ Fix storing as array
        console.log(`✅ Card added to "${title}".`);

        fetchDecks(); // 🔥 Refresh decks from Firestore
      }
    } catch (error) {
      console.error("❌ Firestore Add Card Error:", error);
    }
  }

  // ✅ Delete a deck
  async function deleteDeck(title) {
    if (!user) {
      console.log("🚨 No user logged in! Cannot delete deck.");
      return;
    }

    try {
      console.log(`🗑 Deleting deck: ${title}`);

      const deckRef = doc(db, "users", user.uid, "decks", title);
      await deleteDoc(deckRef);

      console.log(`✅ Deck "${title}" deleted successfully.`);
      fetchDecks(); // 🔥 Refresh decks from Firestore
    } catch (error) {
      console.error("❌ Firestore Delete Deck Error:", error);
    }
  }

  return (
    <DeckContext.Provider
      value={{ decks, addDeck, addCardToDeck, deleteDeck, fetchDecks }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDecks() {
  return useContext(DeckContext);
}
