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
  Platform,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ImageComponent = ({src}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 원본 이미지의 크기 가져오기
    Image.getSize(
      src,
      (width, height) => {
        setImageSize({width, height});
      },
      error => {
        console.error('Failed to get image size:', error);
      },
    );
  }, [src]);

  // 이미지 크기 계산
  const imageHeight = width * (imageSize.height / imageSize.width);

  return (
    <View>
      {(imageSize.width > 0 && imageSize.height > 0) || !loading ? (
        <View
          style={{width: width, height: imageHeight}}
        >
          <Image
            style={{flex:1}}
            src={src}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
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
  const body = route.params.body;
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
            }),
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
        scrollEventThrottle={16}>
        {Platform.OS === 'ios' && <View style={{height: 44}} />}
        <ImageComponent src={body} />
      </ScrollView>
    </View>
  );
};

export default MagazineInfo;
