import React from 'react';
import {Pressable, Text} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';

const CustomChip = ({item, onPressHandler, isActive = false}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={{
        alignSelf: 'flex-start',
        height: 35,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 24,
        justifyContent: 'center',
        borderColor: isActive ? colors.Blue : colors.Gray03,
        backgroundColor: isActive ? colors.Blue : null,
        marginRight: 8,
        marginBottom: 8,
      }}>
      <Text
        style={[
          textStyles.B4,
          {height: 15, color: isActive ? colors.Light_Blue : colors.Gray10},
        ]}>
        {item}
      </Text>
    </Pressable>
  );
};
export default CustomChip;
