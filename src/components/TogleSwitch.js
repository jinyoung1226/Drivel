import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';

const ToggleSwitch = ({onPress, isOn}) => {
  const translateX = useRef(new Animated.Value(isOn ? 18 : 4)).current; // Initialize based on isOn

  useEffect(() => {
    // Update the translateX value when isOn changes
    Animated.timing(translateX, {
      toValue: isOn ? 18 : 4,
      duration: 0, // No animation for initial render
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    Animated.timing(translateX, {
      toValue: isOn ? 4 : 18, // Toggle to the opposite position
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onPress) {
        onPress(); // Call the onPress callback after animation completes
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <View
        style={[
          styles.switchContainer,
          {backgroundColor: isOn ? colors.Blue : colors.Gray04},
        ]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{translateX}],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 24,
    borderRadius: 15,
    justifyContent: 'center',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    elevation: 2,
  },
});

export default ToggleSwitch;
