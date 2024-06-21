import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DriveMain = ({navigation}) => {
  return (
    <View>
      <Text>Drive Main Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('DriveDetail')}
      />
    </View>
  );
};

export default DriveMain;
