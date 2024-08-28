import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import { magazineList } from '../../assets/magazineData/magazineData';
import GrayLine from '../../components/GrayLine';

const {width} = Dimensions.get('window');

const ImageComponent = ({imageUri}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 원본 이미지의 크기 가져오기
    Image.getSize(
      imageUri,
      (width, height) => {
        setImageSize({width, height});
      },
      error => {
        console.error('Failed to get image size:', error);
      },
    );
  }, [imageUri]);

  // 이미지 크기 계산
  const imageHeight = width * (imageSize.height / imageSize.width);

  return (
    <View>
      {imageSize.width > 0 && imageSize.height > 0 || !loading ? (
        <Image
          style={{width: width, height: imageHeight}}
          source={{uri: imageUri}}
          resizeMode="contain"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      ) : (
      <View style={{justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colors.Gray07} />
      </View>
    )}
    </View>
  );
};

const MagazineInfo = ({route}) => {

  const navigation = useNavigation();
  const id = route.params.id;
  const magazineData = magazineList[id-1];
  const scrollRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [iconColor, setIconColor] = useState(colors.Gray10);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: false,
    })(event);
    if (offsetY > 20) {
      setIconColor(colors.white);
    } else if (offsetY <= 20) {
      setIconColor(colors.Gray10);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: scrollY.interpolate({
              inputRange: [0, 52],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
              extrapolate: 'clamp',
            })
          }}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={iconColor} />
        </TouchableOpacity>
      ),
    });
  }, [iconColor, navigation]);

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <ScrollView
      ref={scrollRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      >
        <View style={{paddingHorizontal: 16}}>
          <View style={{height: 60}} />
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            {magazineData.title}
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.B2, {color: colors.Gray07}]}>
            {magazineData.subTitle}
          </Text>
          <View style={{height: 32}} />
        </View>
        <ImageComponent imageUri={magazineData.titleImage} />
        <Text style={[textStyles.B5, {color: colors.Gray07, alignSelf:'flex-end', paddingHorizontal:8}]}>
          {magazineData.imageFrom}
        </Text>
        <View style={{height: 32}} />
        <View style={{paddingHorizontal: 16}}>
          <Text style={[textStyles.B3, {color: colors.Gray10, lineHeight:24}]}>
            {magazineData.titleContent}
          </Text>
        </View>
        <GrayLine />
        {magazineData.content.map((content, index) => (
          <View key={index}>
            <View style={{paddingHorizontal: 16}}>
              <View style={{height: 32}} />
              <Text style={[textStyles.H2, {color: colors.Gray10}]}>
                {content.title}
              </Text>
              <View style={{height: 8}} />
              <Text style={[textStyles.B3, {color: colors.Blue}]}>
                {content.subTitle}
              </Text>
              <View style={{height: 32}} />
              <Text style={[textStyles.B3, {color: colors.Gray10, lineHeight:24}]}>
                {content.content}
              </Text>
            </View>
            {content.imagePath !== null &&
            <View>
              <View style={{height: 32}} />
              <ImageComponent imageUri={content.imagePath} />
            </View>}
            <Text style={[textStyles.B5, {color: colors.Gray07, alignSelf:'flex-end', paddingHorizontal:8}]}>
              {content.imageFrom}
            </Text>
            
            {content.content2 !== null ?
            <View style={{paddingHorizontal: 16}}>
              <View style={{height: 32}} />
              <Text style={[textStyles.B3, {color: colors.Gray10, lineHeight:24}]}>
                {content.content2}
              </Text>
            </View> : <View style={{height: 16}} />}
            {content.imagePath2 !== null &&
            <View>
              <View style={{height: 32}} />
              <ImageComponent imageUri={content.imagePath2} />
            </View>}
            {content.imageFrom2 !== null &&
            <Text style={[textStyles.B5, {color: colors.Gray07, alignSelf:'flex-end', paddingHorizontal:8}]}>
              {content.imageFrom2}
            </Text>}
            {content.content3 !== null &&
            <View style={{paddingHorizontal: 16}}>
              <View style={{height: 32}} />
              <Text style={[textStyles.B3, {color: colors.Gray10, lineHeight:24}]}>
                {content.content3}
              </Text>
            </View>}
            {magazineData.content.length == index + 1 ? 
            <View style={{height: 32}} />
            :
            <GrayLine />}
          </View>  
        ))}
        <Text style={{fontFamily: 'YdestreetB', color:colors.Gray08, fontSize:10, textAlign:'center'}}>ⓒ 2024 Drivel</Text>
        <View style={{height: 32}} />
      </ScrollView>
    </View>
  );
};

export default MagazineInfo;
