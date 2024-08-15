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
const CustomButton = ({title, onPress, disabled, style, textStyle}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          height: 50,
          backgroundColor: disabled
            ? colors.Gray02
            : pressed
            ? '#4153C5'
            : colors.Blue,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }, style
      ]}
      disabled={disabled}
      onPress={onPress}>
      {({pressed}) => (
        <Text
          style={[
            textStyles.H4,
            {color: disabled ? colors.Gray07 : colors.Light_Blue},
            textStyle
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
