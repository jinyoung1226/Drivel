import React from 'react';
import {View, Text} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';

const NoItemScreen = ({text, icon}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {icon}
      <Text
        style={[
          textStyles.C4,
          {color: '#64748B', marginTop: 30, textAlign: 'center'},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default NoItemScreen;
