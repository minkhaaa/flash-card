import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

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

      <View style={styles.buttonGroup}>
        <Button
          title="Restart Quiz"
          onPress={() => navigation.replace("Quiz", { title })}
        />
        <Button
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
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
});
