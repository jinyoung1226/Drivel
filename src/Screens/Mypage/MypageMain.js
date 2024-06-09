import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
const MyPage = () => {
  const nickname = useSelector(state => state.auth.nickname);
  return (
    <View>
      <Text>{nickname}</Text>
      <Text>My Page</Text>
    </View>
  );
}
export default MyPage;