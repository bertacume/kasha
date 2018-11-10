import { Animated, Easing } from "react-native";
import React from 'react';

export const animateRotation = (duration) => {

  this.state = { spinValue: new Animated.Value(0) }

  Animated.loop(
    Animated.timing(
      this.state.spinValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })).start()

  // Second interplate beginning and end values (in this case 0 and 1)
  return this.state.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
}

const spinA = animateRotation(7000);
const spinB = animateRotation(9500);
const spinC = animateRotation(6000);
const spinD = animateRotation(4000);
const spinE = animateRotation(9500);
const spinF = animateRotation(10000);

export const renderAnimatedSpinners = () => {
  return ([
    <Animated.Image key={0} style={{
      transform: [{ rotate: spinA }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/1.png')} />,
    <Animated.Image key={1} style={{
      transform: [{ rotate: spinB }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/2.png')} />,
    <Animated.Image key={2} style={{
      transform: [{ rotate: spinC }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/3.png')} />,
    <Animated.Image key={3} style={{
      transform: [{ rotate: spinD }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/4.png')} />,
    <Animated.Image key={4} style={{
      transform: [{ rotate: spinE }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/5.png')} />,
    <Animated.Image key={5} style={{
      transform: [{ rotate: spinF }], resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }} source={require('../assets/spinner/6.png')} />
  ]);
}
