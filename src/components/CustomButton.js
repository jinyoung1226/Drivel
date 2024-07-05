import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
const CustomButton = ({title, onPress, disabled}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          height: 50,
          backgroundColor: disabled
            ? '#EEF0FE'
            : pressed
            ? '#4153C5'
            : '#5168F6',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
      ]}
      disabled={disabled}
      onPress={onPress}>
      {({pressed}) => (
        <Text
          style={[
            textStyles.H4,
            {color: disabled ? '#9FABF2' : colors.Light_Blue},
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

