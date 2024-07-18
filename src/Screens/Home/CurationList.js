import React from 'react';
import {TouchableOpacity, Text, Image, Pressable} from 'react-native';
import Heart from '../../assets/icons/HeartIcon.svg';

const CurationList = ({item, handleDriveCourse}) => {
  return (
    <Pressable onPress={() => handleDriveCourse(item.id)}>
      <Image
        src={item.imagePath}
        style={{width: 227, height: 243, borderRadius: 10}}
      />
      <Heart style={{position: 'absolute', right: 16, top: 16}} />
      <Text
        style={{
          position: 'absolute',
          fontFamily: 'SUIT-Bold',
          fontSize: 14,
          color: '#ffffff',
          bottom: 51,
          left: 17,
        }}>
        {item.id}
      </Text>
      <Text
        style={{
          position: 'absolute',
          fontFamily: 'SUIT-Bold',
          fontSize: 18,
          color: '#ffffff',
          bottom: 25,
          left: 17,
        }}>
        {item.title}
      </Text>
    </Pressable>
  );
};

export default CurationList;
