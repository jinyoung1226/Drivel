import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
import BackIcon from '../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {authApi} from '../api/api';
import MainLogo from '../assets/icons/MainLogo';
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
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          marginTop: 24,
          width: width,
          paddingHorizontal: 16,
        }}>
        <Text style={[textStyles.H3, {color: colors.Gray10}]}>
          {festivalInfo.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>날짜</Text>
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            {festivalInfo.startDate && formatDate(festivalInfo.startDate)} -{' '}
            {festivalInfo.endDate && formatShortDate(festivalInfo.endDate)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingTop: 16,
            gap: 16,
          }}>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>주소</Text>
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            {festivalInfo.firstAddress}
          </Text>
        </View>
      </View>
      <View style={{height: 24}} />
      {festivalInfo.imagePath == '' || festivalInfo.imagePath == null ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MainLogo />
          <View style={{height: 32}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            페스티벌 관련 이미지가 존재하지 않습니다.
          </Text>
        </View>
      ) : (
        <Image
          src={festivalInfo.imagePath}
          style={{flex: 1, resizeMode: 'contain'}}
        />
      )}
    </View>
  );
};

export default FestivalInfo;
