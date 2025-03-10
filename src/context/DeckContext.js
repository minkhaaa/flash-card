import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; //  Import Firestore & Auth

const DeckContext = createContext();

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState({});
  const user = auth.currentUser; //  Get the logged-in user

  //  Debug: Print the logged-in user

  //  Function to fetch decks from Firestore
  async function fetchDecks() {
    const user = auth.currentUser; //  Get the logged-in user

    if (!user) {
      return;
    }

    try {
      const userDecksRef = collection(db, "users", user.uid, "decks"); //  Ensure  fetch only this user's decks
      const snapshot = await getDocs(userDecksRef);
      let fetchedDecks = {};

      snapshot.forEach((doc) => {
        fetchedDecks[doc.id] = doc.data();
      });

      setDecks(fetchedDecks);
    } catch (error) {}
  }

  useEffect(() => {
    fetchDecks(); //  Fetch decks when the app starts
  }, [user]);

  //  Add a deck to Firestore
  async function addDeck(title) {
    const user = auth.currentUser; //  Ensure  get the logged-in user
    if (!user) {
      return;
    }

    try {
      //  Store deck inside user-specific path
      const deckRef = doc(db, "users", user.uid, "decks", title);
      await setDoc(deckRef, { title: title.trim(), questions: [] });

      fetchDecks(); //  Refresh decks from Firestore
    } catch (error) {}
  }

  //  Add a card to a deck
  async function addCardToDeck(title, card) {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    try {
      //  Ensure  store cards under the logged-in user's deck
      const deckRef = doc(db, "users", user.uid, "decks", title);
      const deckSnapshot = await getDocs(
        collection(db, "users", user.uid, "decks"),
      );
      const deckData = deckSnapshot.docs
        .find((doc) => doc.id === title)
        ?.data();

      if (deckData) {
        let updatedQuestions = deckData.questions || []; //  Ensure it's an array
        updatedQuestions.push(card);

        await updateDoc(deckRef, { questions: updatedQuestions }); //  Fix storing as array

        fetchDecks(); //  Refresh decks from Firestore
      }
    } catch (error) {}
  }
  async function deleteCard(deckTitle, cardIndex) {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const deckRef = doc(db, "users", user.uid, "decks", deckTitle);
      const deckSnapshot = await getDoc(deckRef);

      if (deckSnapshot.exists()) {
        let deckData = deckSnapshot.data();
        let updatedQuestions = deckData.questions || [];

        if (cardIndex >= 0 && cardIndex < updatedQuestions.length) {
          updatedQuestions.splice(cardIndex, 1); // Remove the card at the given index
        }

        await updateDoc(deckRef, { questions: updatedQuestions });
        fetchDecks(); // Refresh UI
      }
    } catch (error) {}
  }
  // Delete a deck
  async function deleteDeck(title) {
    if (!user) {
      return;
    }

    try {
      const deckRef = doc(db, "users", user.uid, "decks", title);
      await deleteDoc(deckRef);

      fetchDecks(); //  Refresh decks from Firestore
    } catch (error) {}
  }

  return (
    <DeckContext.Provider
      value={{
        decks,
        addDeck,
        addCardToDeck,
        deleteDeck,
        deleteCard,
        fetchDecks,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDecks() {
  return useContext(DeckContext);
}
