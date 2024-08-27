import React from 'react';
import {Text, Image, Pressable, ImageBackground, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Heart from '../../assets/icons/HeartIcon.svg';
import {toggleLike} from '../../features/like/likeActions';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';

const CurationList = ({item, handleDriveCourse}) => {
  const likedItems = useSelector(state => state.like.likedItems);
  const liked = likedItems[item.id] || false;
  const dispatch = useDispatch();

  const handleLikePress = () => {
    dispatch(toggleLike(item.id));
  };

  return (
    <Pressable onPress={() => handleDriveCourse(item.id)} style={{width:227, height:243, borderRadius:10, overflow:'hidden'}}>
      <ImageBackground src={item.imagePath} style={{flex: 1}}>
        <LinearGradient
          style={{flex: 1, padding: 16}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)']}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex: 1}} />
            <Pressable onPress={handleLikePress}>
              <Heart fill={liked ? '#5168F6' : 'rgba(0, 0, 0, 0)'} />
            </Pressable>
          </View>
          <View style={{flex: 1}} />
          <Text style={[textStyles.H3, {color: colors.Gray02}]}>
            {item.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
      
    </Pressable>

  );
};

export default CurationList;
