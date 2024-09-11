import React from 'react';
import {Text, Pressable, ImageBackground, View} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import HeartIcon from '../../assets/icons/HeartIcon.svg';
// import {setLikedItem, toggleLike} from '../../features/like/likeActions';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {useNavigation} from '@react-navigation/native';

const CurationListItem = ({item}) => {
  // const {likedItem} = useSelector(state => state.like);
  // const [liked, setLiked] = useState(item.liked);
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setLiked(likedItem.includes(item.id));
  //   console.log('likedItem');
  // }, [likedItem]);

  // const handleLikePress = () => {
  //   dispatch(setLikedItem(item.id));
  //   dispatch(toggleLike(item.id));
  // };

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('DriveDetail', {id: item.id, liked: item.liked})
        }
        style={{width: 227, height: 243, borderRadius: 10, overflow: 'hidden'}}>
        <ImageBackground src={item.imagePath} style={{flex: 1}}>
          <LinearGradient
            style={{flex: 1, padding: 16}}
            colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)']}>
            {/* <View style={{flexDirection:'row'}}>
                <View style={{flex: 1}} />
                <Pressable 
                style={{padding: 8, marginRight: -8, marginTop: -8}}
                onPress={handleLikePress}>
                  <HeartIcon fill={liked ? colors.red : 'none'} color={liked ? colors.red : colors.white}/>
                </Pressable>
              </View> */}
            <View style={{flex: 1}} />
            <Text style={[textStyles.H3, {color: colors.Gray02}]}>
              {item.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

export default CurationListItem;
