import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyles } from '../styles/textStyles';
const CustomInput = ({ 
  value, 
  onChangeText, 
  placeholder,  
  showButton,
  onButtonPress, 
  isButtonText = true, 
  buttonText,
  buttonIcon,
  isValid,
  editable,
  buttonDisabled,
  secureTextEntry = false,
  showTimer,
  timerText
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(value.length > 0);
  }, [value]);

  return (
    <View style={{paddingVertical:8}}>
      <View style={[
        styles.inputContainer,
        { borderColor: isValid === false ? '#FF7171' : '#C5C5C6' }
      ]}>
        <TextInput
          style={[styles.input, textStyles.H5]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={"#ACACAD"}
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
        {showTimer && <Text style={[textStyles.H5, textStyles.Gray04, {marginRight:8}]}>{timerText}</Text>}
        {showButton && (isButtonText ? (
          <TouchableOpacity 
            onPress={onButtonPress} 
            style={styles.button}
            disabled={!isButtonEnabled || buttonDisabled}
          >
            <Text style={[textStyles.H5, {color: !isButtonEnabled || buttonDisabled ? '#C5C5C6': '#5168F6'}]}>{buttonText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={onButtonPress} 
            style={styles.button}
            disabled={buttonDisabled}
          >
            {buttonIcon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 47,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    boerderColor: '#DDDDDE',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,

  },
  buttonText: {
    fontSize: 14,
  },
});

export default CustomInput;