// reactNative version of PasswordReset.js
import React, { useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import InputTextMessage from '../../components/InputTextMessage';
const PasswordReset = () => {
  const [email, setEmail] = useState('');

  return (
    <View>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        isValid={true}
        editable={true}
      />
      <CustomButton
        title="Send Email"
        onPress={() => {}}
        disabled={false}
      />
      <InputTextMessage
        isValid={true}
        validMessage="Email has been sent"
        errorMessage="Invalid email"
      />
    </View>
  );
};

export default PasswordReset;