import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
import BackIcon from '../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {authApi} from '../api/api';
import MainLogo from '../assets/icons/MainLogo';
import { ScrollView } from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');

const formatDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const formatShortDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

const ImageComponent = ({imageUri}) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [loading, setLoading] = useState(true);

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
      {(imageSize.width > 0 && imageSize.height > 0) || !loading ? (
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

const FestivalInfo = ({route}) => {
  const navigation = useNavigation();
  const festivalId = route.params.festivalId;
  const [festivalInfo, setFestivalInfo] = useState({});

  useEffect(() => {
    const fetchFestivalInfo = async () => {
      try {
        const response = await authApi.get(`festival/${festivalId}`);
        console.log(response.data);
        setFestivalInfo(response.data);
      } catch (error) {
        console.error('Error fetching festival info:', error);
      }
    };

    fetchFestivalInfo();
  }, [festivalId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '상세정보',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      {festivalInfo.imagePath == '' || festivalInfo.imagePath == null ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MainLogo />
          <View style={{height: 32}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            페스티벌 관련 이미지가 존재하지 않습니다.
          </Text>
        </View>
      ) : (
        <ImageComponent
          imageUri={festivalInfo.imagePath}
        />
      )}
      <View
        style={{
          marginTop: 24,
          width: width,
          paddingHorizontal: 16,
        }}>
        <Text style={[textStyles.H3, {color: colors.Gray10}]}>
          {festivalInfo.title}
        </Text>
        {festivalInfo.sponsor !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>주최자</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.sponsor}
            </Text>
          </View>
        </View>}
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>날짜</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.startDate && formatDate(festivalInfo.startDate)} -{' '}
              {festivalInfo.endDate && formatShortDate(festivalInfo.endDate)}
            </Text>
          </View>
        </View>
        {festivalInfo.playTime !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>운영시간</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.playTime?.replace(/<br\s*\/?>/g, '\n')}
            </Text>
          </View>
        </View>}
        {festivalInfo.firstAddress !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>주소</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.firstAddress}
            </Text>
          </View>
        </View>}
        
        {festivalInfo.eventPlace !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>장소</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.eventPlace}
            </Text>
          </View>
        </View>}
        {festivalInfo.eventHomepage !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>링크</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.eventHomepage}
            </Text>
          </View>
        </View>}
        {festivalInfo.bookingPlace !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>예약</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.bookingPlace}
            </Text>
          </View>
        </View>}
        {festivalInfo.description !== '' &&
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>설명</Text>
          <View style={{flex:1}}>
            <Text style={[textStyles.B3, {color: colors.Gray10}]}>
              {festivalInfo.description?.replace(/<br\s*\/?>/g, '\n')}
            </Text>
          </View>
        </View>}
      </View>
      <View style={{height: 24}} />
    </ScrollView>
  );
};

export default FestivalInfo;
