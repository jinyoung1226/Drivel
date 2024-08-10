import React, {useEffect, useState, useLayoutEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {authApi} from '../../api/api';
import BackIcon from '../../assets/icons/BackIcon';
import GrayLine from '../../components/GrayLine';
import CustomButton from '../../components/CustomButton';
import {fetchRoute} from '../../utils/fetchRoute';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import DriveStartRestaurantCuration from './DriveStartRestaurantCuration';

const DriveStart = ({route, navigation}) => {
  const driveCourseInfo = route.params.courseInfo;
  const placeInfo = driveCourseInfo.places;
  const [visibleItems, setVisibleItems] = useState(3);
  const nickname = useSelector(state => state.auth.nickname);

  const [htmlContent, setHtmlContent] = useState('');

  const center = {
    lat: driveCourseInfo.waypoints[0].latitude,
    lng: driveCourseInfo.waypoints[0].longitude,
  };

  useEffect(() => {
    fetchRoute(driveCourseInfo, setHtmlContent, center);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '경유지 추가',
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
      headerStyle: {
        elevation: 0, // 안드로이드에서 그림자 제거
        shadowOpacity: 0, // iOS에서 그림자 제거
      },
    });
  }, [navigation]);

  const handleShowMore = () => {
    setVisibleItems(prev => prev + 3);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <ScrollView>
        <View style={{height: 150, width: '100%'}}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            style={{flex: 1, borderRadius: 5}}
          />
        </View>
        <View style={{height: 24}} />
        <View style={{paddingHorizontal: 16}}>
          <View>
            <Text style={[textStyles.H3, {color: colors.Gray10}]}>
              드라이브코스 순서를 변경하고
            </Text>
            <View style={{height: 4}} />
            <Text style={[textStyles.H3, {color: colors.Gray10}]}>
              네비게이션으로 연결해보세요
            </Text>
            <View style={{height: 8}} />
            <Text style={[textStyles.B4, {color: colors.Blue}]}>
              * 상위 5개 경유지만 네비게이션으로 연결됩니다
            </Text>
          </View>
        </View>
        <GrayLine />
        <View style={{paddingHorizontal: 16, marginTop: 24}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            {'🥣 '} {nickname}님께 딱 맞는 맛집도 추천해드릴게요!
          </Text>
          <View style={{height: 24}} />
          <View>
            <FlatList
              data={placeInfo.slice(0, visibleItems)}
              renderItem={({item}) => (
                <DriveStartRestaurantCuration item={item} />
              )}
              scrollEnabled={false}
            />
            {visibleItems < placeInfo.length && (
              <>
                <View style={{height: 8}} />
                <TouchableOpacity
                  onPress={handleShowMore}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1.3,
                    borderColor: colors.Gray02,
                  }}>
                  <Text style={[textStyles.C4, {color: colors.Gray06}]}>
                    더보기
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <GrayLine />
      </ScrollView>
    </View>
  );
};

export default DriveStart;
