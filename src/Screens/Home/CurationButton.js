import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const CourseButton = ({item, activeButton, handleButtonPress}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 7.5,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#DDDDDE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: activeButton === item ? '#151618' : 'transparent',
      }}
      onPress={() => handleButtonPress(item)}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'SUIT-SemiBold',
          color: activeButton === item ? '#ffffff' : '#000000',
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default CourseButton;
