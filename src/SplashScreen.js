import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
