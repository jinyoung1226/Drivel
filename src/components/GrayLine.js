import {Dimensions} from 'react-native';
import {View} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const GrayLine = () => {
  return (
    <View
      style={{
        width: width,
        height: 10,
        backgroundColor: '#F6F6F7',
        marginTop: 24,
      }}></View>
  );
};

export default GrayLine;
