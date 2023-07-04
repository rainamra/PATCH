import { StyleSheet, View, TextInput, Text } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, useAnimatedProps, runOnJS } from "react-native-reanimated";

const RangeSlider = ({ sliderWidth, min, max, step, onValueChange, title, enableDesc = false, descText, enableLabel = false, frontLabelText = "", endLabelText = "" }) => {
  const position = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position.value;
    },
    onActive: (e, ctx) => {
      opacity.value = 1;
      if (ctx.startX + e.translationX < 0) {
        position.value = 0;
      } else if (ctx.startX + e.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else {
        position.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step,
        max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
      });
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position2.value;
    },
    onActive: (e, ctx) => {
      opacity2.value = 1;
      if (ctx.startX + e.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (ctx.startX + e.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step,
        max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    zIndex: zIndex.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }],
    zIndex: zIndex2.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: position2.value - position.value,
  }));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const minLabelText = useAnimatedProps(() => {
    return {
      text: `${frontLabelText}${min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step}${endLabelText}`,
    };
  });
  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `${frontLabelText}${min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step}${endLabelText}`,
    };
  });
  const minMaxDescText = useAnimatedProps(() => {
    const tempText = {
      text: `Between ${min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step} to ${min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step} ${descText}`,
    };

    return tempText;
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "#9C5C2B" }}>{title}</Text>
      <View style={[styles.sliderContainer, { width: sliderWidth }]}>
        <View style={[styles.sliderBack, { width: sliderWidth }]} />
        <Animated.View style={[sliderStyle, styles.sliderFront]} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[animatedStyle, styles.thumb]}>
            {enableLabel && (
              <Animated.View style={[opacityStyle, styles.label]}>
                <AnimatedTextInput style={styles.labelText} animatedProps={minLabelText} editable={false} />
              </Animated.View>
            )}
          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandler2}>
          <Animated.View style={[animatedStyle2, styles.thumb]}>
            {enableLabel && (
              <Animated.View style={[opacityStyle2, styles.label]}>
                <AnimatedTextInput style={styles.labelText} animatedProps={maxLabelText} editable={false} />
              </Animated.View>
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
      {enableDesc && (
        <Animated.View>
          <AnimatedTextInput style={{ color: "#F0AE5E" }} animatedProps={minMaxDescText} editable={false} multiline />
        </Animated.View>
      )}
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  sliderContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
  },
  sliderBack: {
    height: 5,
    backgroundColor: "#F5E6B6",
    borderRadius: 20,
  },
  sliderFront: {
    height: 5,
    backgroundColor: "#F0AE5E",
    borderRadius: 20,
    position: "absolute",
  },
  thumb: {
    left: -6,
    width: 12,
    height: 12,
    position: "absolute",
    backgroundColor: "#F0AE5E",
    borderRadius: 10,
  },
  label: {
    position: "absolute",
    top: -40,
    bottom: 20,
    backgroundColor: "black",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },
});
