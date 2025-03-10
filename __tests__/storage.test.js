import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
  clearDecks,
} from "../src/storage/storage";

describe("AsyncStorage Deck Management", () => {
  beforeEach(async () => {
    await clearDecks(); // Clear storage before each test
  });

  test("should save and retrieve decks", async () => {
    await saveDeckTitle("Science");
    const decks = await getDecks();
    expect(decks).toHaveProperty("Science");
    expect(decks["Science"].title).toBe("Science");
    expect(decks["Science"].questions).toEqual([]); // New deck starts empty
  });

  test("should add a card to a deck", async () => {
    await saveDeckTitle("Math");
    await addCardToDeck("Math", { question: "What is 2+2?", answer: "4" });

    const decks = await getDecks();
    expect(decks["Math"].questions.length).toBe(1);
    expect(decks["Math"].questions[0].question).toBe("What is 2+2?");
    expect(decks["Math"].questions[0].answer).toBe("4");
  });

  test("should clear all decks", async () => {
    await saveDeckTitle("History");
    await clearDecks();
    const decks = await getDecks();
    expect(Object.keys(decks).length).toBe(0);
  });
});
