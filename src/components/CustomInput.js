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
const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  showButton,
  onButtonPress,
  buttonIcon,
  isValid,
  editable,
  buttonDisabled,
  secureTextEntry = false,
  showTimer,
  timerText,
  maxLength,
  keyboardType,
  inputMode,
}) => {
  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          {borderColor: isValid === false ? colors.red : colors.Gray03},
        ]}>
        <TextInput
          style={[styles.input, textStyles.H5]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.Gray04}
          editable={editable}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          keyboardType={keyboardType}
          inputMode={inputMode}
        />
        {showTimer && (
          <Text
            style={[
              textStyles.H5,
              {marginRight: 8, color: colors.Gray04, alignSelf: 'center'},
            ]}>
            {timerText}
          </Text>
        )}
        {showButton && (
          <TouchableOpacity
            onPress={onButtonPress}
            style={{alignSelf: 'center'}}
            disabled={buttonDisabled}>
            {typeof buttonIcon === 'function'
              ? buttonIcon({buttonDisabled})
              : buttonIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 47,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.Gray03,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 47,
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default CustomInput;
