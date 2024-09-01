import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Pressable,
  Animated,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import CheckBox from '../../assets/icons/CheckBox';
import EmptyBox from '../../assets/icons/EmptyBox';
import Check from '../../assets/icons/Check';
import {authApi} from '../../api/api';

const DriveStartSpotCuration = ({item, setCheckInfo}) => {
  const [isChecked, setChecked] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const placeId = item.id;

  const handleCheckboxPress = () => {
    setChecked(prevChecked => {
      const newChecked = !prevChecked;

      setCheckInfo(prev => {
        // 이전의 checkInfo 배열을 복사하여 업데이트
        let updatedCheckInfo = [...prev];

        if (newChecked) {
          // 체크된 경우, 추가경유지1, 추가경유지2 등 고유한 타입으로 추가
          const newAdditionalWaypoint = {
            type: `추가경유지${updatedCheckInfo.length}`,
            waypoints: [
              {
                id: placeId,
                name: item.title,
                latitude: item.latitude,
                longitude: item.longitude,
              },
            ],
          };

          // updatedCheckInfo 배열에 새로운 추가경유지 객체 추가
          updatedCheckInfo.push(newAdditionalWaypoint);
        } else {
          // 체크 해제된 경우, 해당 추가경유지 객체를 제거
          updatedCheckInfo = updatedCheckInfo.filter(
            info =>
              !(
                info.waypoints.length === 1 && info.waypoints[0].id === placeId
              ),
          );
        }

        return updatedCheckInfo;
      });

      // 애니메이션 실행
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.9,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      return newChecked;
    });
  };

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
            {item.title}
          </Text>
        </View>
        <View style={{height: 8}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          코스 시작 지점으로부터{' '}
          {Number(item.distanceFromFirstWaypoint.toFixed(1))}km
        </Text>
        <View style={{height: 2}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          코스 종료 지점으로부터{' '}
          {Number(item.distanceFromLastWaypoint.toFixed(1))}km
        </Text>
        <View style={{height: 8}} />
      </View>
      <View style={{flex: 1}} />
      {item.imagePath === null ? (
        <ImageBackground
          source={require('../../assets/image/MainLogo.png')}
          style={{width: 60, height: 65.19, borderRadius: 5.77}}
        />
      ) : (
        <Image
          source={{uri: item.imagePath}}
          style={{width: 60, height: 65.19, borderRadius: 5.77}}
        />
      )}
    </View>
  );
};

export default DriveStartSpotCuration;
