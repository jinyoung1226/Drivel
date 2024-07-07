import React from 'react';
import {View, Text} from 'react-native';
import CustomInput from '../../components/CustomInput';

const PasswordReset = () => {
  return (
    <View style={{flex: 1}}>
      <CustomInput placeholder={'이메일'} />
      <Text>이메일 주소가 올바르지 않습니다</Text>
    </View>
  );
};

export default PasswordReset;
