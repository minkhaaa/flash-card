import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

export default function CardStack({
  question,
  answer,
  nextQuestion,
  isFlipped,
  onFlip,
  onSwipe,
}) {
  return (
    <View style={styles.container}>
      {/* Next card (peeking underneath) */}
      {nextQuestion && (
        <View style={styles.nextCard}>
          <Card
            key={`next-${nextQuestion}`}
            question={nextQuestion}
            answer=""
            isFlipped={false}
            swipeable={false}
          />
        </View>
      )}

      {/* Current active card */}
      <Card
        key={`current-${question}`}
        question={question}
        answer={answer}
        isFlipped={isFlipped}
        onFlip={onFlip}
        onSwipe={onSwipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  nextCard: {
    position: "absolute",
    top: 15,
    opacity: 0.15,
    zIndex: 0,
  },
});
