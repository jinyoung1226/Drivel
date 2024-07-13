import React from 'react';
import {View} from 'react-native';
import colors from '../styles/colors';

const ProgressBar = ({step, stepCount}) => (
  <View
    style={{
      backgroundColor: colors.Gray02,
      height: 5,
      flexDirection: 'row',
      marginHorizontal: 16,
      borderRadius: 100,
    }}>
    <View
      style={{flex: step, backgroundColor: colors.Blue, borderRadius: 100}}
    />
    <View style={{flex: stepCount - step}} />
  </View>
);

export default ProgressBar;
