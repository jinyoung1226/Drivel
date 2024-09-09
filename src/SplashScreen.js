import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import MainLogo from './assets/icons/MainLogo';
import MainText from './assets/icons/MainText';
import colors from './styles/colors';
const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BG,
      }}>
      <View style={{flex: 1}} />
      <MainLogo />
      <View style={{flex: 1}}>
        <MainText />
      </View>
    </View>
  );
};

export default SplashScreen;
