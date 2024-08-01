import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Pressable
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {toggleLike} from '../../features/like/likeActions';
import Heart from '../../assets/icons/HeartIcon.svg';
const LikedItem = ({item, goDriveDetail}) => {
  const likedItems = useSelector(state => state.like.likedItems);
  const liked = likedItems[item.id] || false;
  const dispatch = useDispatch();

  const handleLikePress = () => {
    dispatch(toggleLike(item.id));
  };
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      style={{
        width: (width - 48) / 2,
        borderRadius: 10,
        backgroundColor: colors.BG,
        height: 174,
        overflow: 'hidden',
      }}
      onPress={() => goDriveDetail(item.id)}>
      <ImageBackground src={item.imagePath} style={{flex: 1}}>
        <LinearGradient
          style={{flex: 1, padding: 16}}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.7)']}>
          <Pressable
            onPress={handleLikePress}
            style={{position: 'absolute', right: 16, top: 16}}>
            <Heart fill={liked ? '#5168F6' : 'rgba(0, 0, 0, 0)'} />
          </Pressable>
          <View style={{flex: 1}} />
          <Text style={[textStyles.H5, {color: colors.Gray02}]}>
            {item.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default LikedItem;
