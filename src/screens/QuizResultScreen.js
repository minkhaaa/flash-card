import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";

export default function QuizResultScreen({ route, navigation }) {
  const { title, correctCount, totalCount } = route.params;

  const percentage = ((correctCount / totalCount) * 100).toFixed(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>

      <Text style={styles.result}>
        {correctCount} out of {totalCount} correct
      </Text>

      <Text style={styles.percentage}>{percentage}% Score</Text>

      <View style={styles.buttonContainer}>
        <ActionButton
          title="Restart Quiz"
          onPress={() => navigation.replace("Quiz", { title })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          backgroundColor="#FFA726"
          title="Back to Deck"
          onPress={() => {
            navigation.reset({
              index: 1, // Ensures DeckDetail is the top screen
              routes: [
                { name: "DeckList" }, // Root screen
                { name: "DeckDetail", params: { title } }, // Target screen
              ],
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F2FD", // Matches app theme
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  result: {
    fontSize: 18,
    marginBottom: 8,
  },
  percentage: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "green",
  },
  buttonContainer: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
