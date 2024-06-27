import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CourseButton = ({item, activeButton, handleButtonPress}) => {
  return (
    <TouchableOpacity
      style={[styles.textButton, activeButton === item && styles.ButtonActive]}
      onPress={() => handleButtonPress(item)}>
      <Text
        style={[styles.buttonText, activeButton === item && styles.textActive]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDDDDE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'SUIT-SemiBold',
  },
  ButtonActive: {
    backgroundColor: '#151618',
  },
  textActive: {
    color: '#ffffff',
  },
});

export default CourseButton;
