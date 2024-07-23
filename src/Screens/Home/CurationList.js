import React, {useState} from 'react';
import {TouchableOpacity, Text, Image, Pressable, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Heart from '../../assets/icons/HeartIcon.svg';
import {authApi} from '../../api/api';
import {isPrefixUnaryExpression} from 'typescript';
import {toggleLike} from '../../features/like/likeActions';

const CurationList = ({item, handleDriveCourse}) => {
  const likedItems = useSelector(state => state.like.likedItems);
  const liked = likedItems[item.id] || false;
  const dispatch = useDispatch();

  const handleLikePress = () => {
    dispatch(toggleLike(item.id));
  };

  return (
    <Pressable onPress={() => handleDriveCourse(item.id)}>
      <Image
        src={item.imagePath}
        style={{width: 227, height: 243, borderRadius: 10}}
      />
      <Pressable
        onPress={handleLikePress}
        style={{position: 'absolute', right: 16, top: 16}}>
        <Heart fill={liked ? '#5168F6' : 'rgba(0, 0, 0, 0)'} />
      </Pressable>
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
