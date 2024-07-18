import RenderingHand from '../assets/icons/RenderingHand.svg';
import {View, Text} from 'react-native';
import React from 'react';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';

const RenderingPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <RenderingHand />
      <Text style={[textStyles.H2, {color: colors.Blue, marginTop: 24}]}>
        잠시만 기다려주세요
      </Text>
      <Text style={[textStyles.B2, {color: colors.Gray05, marginTop: 8}]}>
        해당 페이지로 이동중입니다
      </Text>
    </View>
  );
};

export default RenderingPage;
