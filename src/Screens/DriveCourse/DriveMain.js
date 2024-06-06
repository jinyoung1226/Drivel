import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DriveMain = ({navigation}) => {
  return (
    <View>
      <Text>DriveMain</Text>
      <Button title='Detail' onPress={() => navigation.navigate("DriveDetail")}/>
    </View>
  );
}
export default DriveMain;