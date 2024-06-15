import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { textStyles } from '../styles/textStyles';

const CustomButton = ({
  title,
  onPress,
  disabled
}) => {
  return (
    <Pressable
    style={({pressed}) => [{height:50, backgroundColor: disabled ? '#DDDDDE' : pressed ? '#5168F6' : '#EEF0FE', justifyContent:'center', alignItems: 'center', borderRadius:10 }]} 
    disabled={disabled}
    onPress={onPress}
    >
      {({pressed}) => (<Text style={[textStyles.H4, disabled? textStyles.White : pressed ? textStyles.Light_Blue  : textStyles.Blue]}>
        {title}
      </Text>)}
    </Pressable>
  )
};

export default CustomButton;