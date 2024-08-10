import React, {useState, useEffect, useRef} from 'react';
import {View, Pressable, Animated, StyleSheet, Text, Image} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import CheckBox from '../../assets/icons/CheckBox';
import EmptyBox from '../../assets/icons/EmptyBox';
import Check from '../../assets/icons/Check';
import {authApi} from '../../api/api';

const DriveStartRestaurantCuration = ({item}) => {
  const [isChecked, setChecked] = useState(false);
  const [placeInfo, setPlaceInfo] = useState(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const placeId = item.id;

  const handleCheckboxPress = () => {
    setChecked(!isChecked);

    // 애니메이션 실행
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9, // 더 빠르게 반응하도록 크기 변화를 작게 설정
        duration: 50, // 짧은 시간 내에 실행
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1, // 원래 크기로 복원
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handdleCheckboxPress = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    const getPlaceInfo = async () => {
      try {
        const response = await authApi.get(`place/${placeId}`);
        if (response.status === 200) {
          setPlaceInfo(response.data);
          console.log(response.data, '@@@@');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('코스를 불러올 수 없습니다.');
          }
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getPlaceInfo();
  }, [placeId]);

  if (!placeInfo) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        height: 77,
        flexDirection: 'row',
        marginBottom: 16,
      }}>
      <Pressable onPress={handleCheckboxPress}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          {!isChecked ? (
            <EmptyBox />
          ) : (
            <View>
              <CheckBox />
              <View style={{position: 'absolute', top: 6, left: 5}}>
                <Check />
              </View>
            </View>
          )}
        </Animated.View>
      </Pressable>
      <View style={{flexDirection: 'column', marginLeft: 16}}>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Text style={[textStyles.H5, {color: colors.Gray10}]}>
            {placeInfo.name}
          </Text>
          <Text style={[textStyles.B4, {color: colors.Gray04}]}>
            {placeInfo.category}
          </Text>
        </View>
        <View style={{height: 8}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          코스 시작 지점으로부터 {Number(item.distance.toFixed(1))}km
        </Text>
        <View style={{height: 2}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          코스 종료 지점으로부터 {Number(item.distance.toFixed(1))}km
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          {placeInfo.phoneNumber}
        </Text>
      </View>
      <View style={{flex: 1}} />
      <Image
        src={placeInfo.imagePath}
        style={{width: 60, height: 65.19, borderRadius: 5.77}}
      />
    </View>
  );
};

export default DriveStartRestaurantCuration;
