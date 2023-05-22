import { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

export function MovePosAnimation(translation) {
    Animated.timing(translation, {
      toValue: 1.5,
      duration:200,
      useNativeDriver: true
    }).start();
  }

export function MoveNegAnimation(translation) {
  Animated.timing(translation, {
    toValue: -1.5,
    duration:200,
    useNativeDriver: true
  }).start();
}
