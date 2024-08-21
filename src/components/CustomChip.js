import React from 'react';
import {Pressable, Text} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';

const CustomChip = ({item, onPressHandler, isActive = false, textStyle, chipStyle}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={[
        {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 24,
        justifyContent: 'center',
        borderColor: isActive ? colors.Blue : colors.Gray03,
        backgroundColor: isActive ? colors.Blue : null,
        marginRight: 8,
        marginBottom: 8,
      },
      chipStyle]}
    >
      <Text
        style={[
          textStyles.B4,
          {color: isActive ? colors.Light_Blue : colors.Gray10},
          textStyle,
        ]}>
        {item}
      </Text>
    </Pressable>
  );
};
export default CustomChip;
