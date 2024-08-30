import React, {useEffect, useState} from 'react';
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
import {setLikedItem, toggleLike} from '../../features/like/likeActions';
import HeartIcon from '../../assets/icons/HeartIcon.svg';
import { useNavigation } from '@react-navigation/native';

const LikedItem = ({item}) => {
  const [liked, setLiked] = useState(item.liked);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLikePress = () => {
    setLiked(!liked);
    dispatch(toggleLike(item.id));
  };

  const width = Dimensions.get('window').width;

  return (
    <TouchableOpacity
      style={{
        width: (width - 48) / 2,
        borderRadius: 10,
        backgroundColor: colors.BG,
        aspectRatio: 1,
        overflow: 'hidden',
      }}
      onPress={() => navigation.navigate('DriveDetail', {id: item.id, liked:liked})}>
      <ImageBackground src={item.imagePath} style={{flex: 1}}>
        <LinearGradient
          style={{flex: 1, padding: 16}}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.7)']}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex: 1}} />
            <Pressable 
              style={{padding: 8, marginRight: -8, marginTop: -8}}
              onPress={handleLikePress}>
                <HeartIcon fill={liked ? colors.red : 'none'} color={liked ? colors.red : colors.white}/>
            </Pressable>
          </View>
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
