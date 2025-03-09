import React, { useRef, useEffect, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

export default function Card({
  question,
  answer,
  isFlipped,
  onSwipe,
  swipeable = true,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;
  const hasTriggeredHaptic = useRef(false);

  const [swipeFeedback, setSwipeFeedback] = useState(null);

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: false },
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && swipeable) {
      const movedFarEnough =
        Math.abs(nativeEvent.translationX) > SWIPE_THRESHOLD;

      if (movedFarEnough) {
        const isCorrect = nativeEvent.translationX > 0;
        onSwipe(isCorrect);
      }

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      setSwipeFeedback(null);
      hasTriggeredHaptic.current = false;
    }
  };

  useEffect(() => {
    const listener = translateX.addListener(({ value }) => {
      const isBeyondThreshold = Math.abs(value) > SWIPE_THRESHOLD;

      if (isBeyondThreshold && !hasTriggeredHaptic.current) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        hasTriggeredHaptic.current = true;

        setSwipeFeedback(value > 0 ? "correct" : "incorrect");
      } else if (!isBeyondThreshold) {
        setSwipeFeedback(null);
        hasTriggeredHaptic.current = false;
      }
    });

    return () => translateX.removeListener(listener);
  }, []);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const tilt = translateX.interpolate({
    inputRange: [-width, width],
    outputRange: ["-10deg", "10deg"],
  });

  return (
    <PanGestureHandler
      enabled={swipeable}
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX },
              { translateY },
              { rotate: tilt },
              { perspective: 1000 }, // Add perspective to create depth
            ],
          },
        ]}
      >
        <View style={styles.inner}>
          {swipeFeedback && (
            <View
              style={[
                styles.feedbackOverlay,
                swipeFeedback === "correct"
                  ? styles.correctOverlay
                  : styles.incorrectOverlay,
              ]}
            >
              <Text style={styles.feedbackText}>
                {swipeFeedback === "correct" ? "Correct" : "Incorrect"}
              </Text>
            </View>
          )}

          {/* Front Side */}
          <Animated.View
            style={[
              styles.face,
              styles.questionFace,
              { transform: [{ rotateY: frontRotate }] },
            ]}
          >
            <Text style={styles.text}>{question}</Text>
            <Text style={styles.hint}>Swipe or press Show Answer</Text>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[
              styles.face,
              styles.answerFace,
              { transform: [{ rotateY: backRotate }] },
            ]}
          >
            <Text style={styles.text}>{answer}</Text>
            <Text style={styles.hint}>Swipe to mark Correct/Incorrect</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 220,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  inner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  questionFace: {
    backgroundColor: "#E3F2FD",
  },
  answerFace: {
    backgroundColor: "#FFF8E1",
    transform: [{ rotateY: "180deg" }],
  },
  feedbackOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    opacity: 0.9,
    borderRadius: 15,
  },
  correctOverlay: {
    backgroundColor: "rgba(76, 175, 80, 0.8)", // Green
  },
  incorrectOverlay: {
    backgroundColor: "rgba(244, 67, 54, 0.8)", // Red
  },
  feedbackText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#424242",
  },
  hint: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
});
