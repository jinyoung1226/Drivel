import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
const InputTextMessage = ({isValid, validMessage, errorMessage}) => {
  return (
    <View style={{height: 24}}>
      {isValid ? (
        <Text style={[textStyles.H6, {color:colors.Blue}]}>{validMessage}</Text>
      ) : (
        <Text style={[textStyles.H6, {color:colors.red}]}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputTextMessage;
