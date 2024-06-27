import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Heart from '../../assets/Icon/heart.svg';

const CurationList = ({item, handleDriveCourse}) => {
  return (
    <Pressable onPress={() => handleDriveCourse(item.id)}>
      <Image source={{url: item.imagePath}} style={styles.preferenceImage} />
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
        {item.title1}
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
        {item.title2}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  preferenceImage: {
    width: 227,
    height: 243,
    borderRadius: 10,
  },
});

export default CurationList;
