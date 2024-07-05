import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const GrayLine = () => {
  return <View style={styles.bar}></View>;
};

const styles = StyleSheet.create({
  bar: {
    width: width,
    height: 10,
    marginTop: 24,
    backgroundColor: '#F6F6F7',
  },
});

export default GrayLine;
