import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDecks } from "../context/DeckContext";
import CardStack from "../components/CardStack";
import ActionButton from "../components/ActionButton";

export default function QuizScreen({ route, navigation }) {
  const { title } = route.params;
  const { decks } = useDecks();
  const deck = decks[title];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (currentIndex + 1 < deck.questions.length) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      navigation.replace("QuizResult", {
        title,
        correctCount: isCorrect ? correctCount + 1 : correctCount,
        totalCount: deck.questions.length,
      });
    }
  };
  const onFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const currentCard = deck.questions[currentIndex];
  const nextCard = deck.questions[currentIndex + 1] ?? null;

  return (
    <View style={styles.container}>
      <CardStack
        key={currentIndex}
        question={currentCard.question}
        answer={currentCard.answer}
        nextQuestion={nextCard?.question}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        onSwipe={handleAnswer}
      />

      <ActionButton
        style={{ marginTop: 30 }}
        title={isFlipped ? "Show Question" : "Show Answer"}
        onPress={onFlip}
        backgroundColor={isFlipped ? "#FF7043" : "#007AFF"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F2FD", // Matches app theme

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
