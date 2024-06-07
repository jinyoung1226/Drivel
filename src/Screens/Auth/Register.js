import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { api } from '../../api/api'
const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('')
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/;
    return regex.test(password);
  };

  const signUp = async () => {
    if (password !== passwordCheck) {
      Alert.alert("passwordCheckFailed");
      return;
    }
    // if (!isPasswordValid(password)) {
    //   Alert.alert("passwordCheckFailed");
    //   return;
    // }
    try {
      const response = await api.post('/auth/signUp', { email, password, nickname });
      if (response.status === 200) {
        Alert.alert("signup Complete");
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response.status === 400) {
        Alert.alert(error.response.data.message);
      } else {
        Alert.alert("서버접속오류");
      }
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
      placeholder="Password"
      value={passwordCheck}
      onChangeText={setPasswordCheck}
      secureTextEntry
      />
      <TextInput
      placeholder="Nickname"
      value={nickname}
      onChangeText={setNickname}
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="go Login" onPress={()=> navigation.navigate('Login')} />
    </View>
  );
}
export default Register;