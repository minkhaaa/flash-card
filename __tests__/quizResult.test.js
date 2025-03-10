import React from "react";
import { render } from "@testing-library/react-native";
import QuizResultScreen from "../src/screens/QuizResultScreen";

describe("Quiz Result Screen", () => {
  test("displays correct quiz results", () => {
    const { getByText } = render(
      <QuizResultScreen
        route={{ params: { title: "Science", correctCount: 3, totalCount: 5 } }}
      />,
    );

    expect(getByText("Quiz Completed!")).toBeTruthy();
    expect(getByText("3 out of 5 correct")).toBeTruthy();
    expect(getByText("60% Score")).toBeTruthy();
  });
});
