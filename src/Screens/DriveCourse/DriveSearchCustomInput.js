import React, { forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';

const DriveSearchCustomInput = forwardRef((props, ref) => {
  const {
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
    containerStyle,
    multiline,
    autoFocus
  } = props;

  return (
    <View
      style={[
        {
          height: 41,
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 1000,
          borderColor: isValid === false ? colors.red : colors.Gray02,
          paddingHorizontal: 16,
          backgroundColor: colors.Gray02,
        },
        containerStyle,
      ]}
    >
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        style={[
          {
            flex: 1,
            height: 41,
            color: colors.Gray10,
          },
          textStyles.B3,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.Gray06}
        editable={editable}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        keyboardType={keyboardType}
        inputMode={inputMode}
        multiline={multiline}
      />
      {showTimer && (
        <Text
          style={[
            textStyles.H5,
            { marginRight: 8, color: colors.Gray04, alignSelf: 'center' },
          ]}
        >
          {timerText}
        </Text>
      )}
      {showButton && (
        <TouchableOpacity
          onPress={onButtonPress}
          style={{ alignSelf: 'center' }}
          disabled={buttonDisabled}
        >
          {typeof buttonIcon === 'function'
            ? buttonIcon({ buttonDisabled })
            : buttonIcon}
        </TouchableOpacity>
      )}
    </View>
  );
});

export default DriveSearchCustomInput;
