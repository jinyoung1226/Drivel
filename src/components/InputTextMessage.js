import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyles } from '../styles/textStyles';
const InputTextMessage = ({
  isValid,
  validMessage,
  errorMessage
}) => {
  return (
    <View style={{height:20}}>
      {isValid ? (
        <Text style={[textStyles.H6, textStyles.Blue]}>{validMessage}</Text>        
      ) : (
        <Text style={[textStyles.H6, textStyles.Red]}>{errorMessage}</Text>
      )}
    </View>
  )
};

export default InputTextMessage;