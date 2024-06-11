import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  errorMessage, 
  showButton, 
  onButtonPress, 
  buttonText,
  isValid,
  editable,
  buttonDisabled,
  secureTextEntry = false

}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(value.length > 0);
  }, [value]);

  const buttonDisabledStatus = () => {
    return !isButtonEnabled || buttonDisabled;
  }

  return (
    <View>
      <View style={[
        styles.inputContainer,
        { borderColor: isValid === false ? '#FF7171' : '#C5C5C6' }
      ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
        {showButton && (
          <TouchableOpacity 
          onPress={onButtonPress} 
          style={styles.button}
          disabled={buttonDisabledStatus()}>
            <Text style={[styles.buttonText, {color: buttonDisabledStatus() ? '#C5C5C6': '#5168F6'}]}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
      {isValid === false && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomInput;