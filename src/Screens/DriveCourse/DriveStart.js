import React, {useEffect, useState, useLayoutEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon';
import GrayLine from '../../components/GrayLine';
import CustomButton from '../../components/CustomButton';
import {fetchRoute} from '../../utils/fetchRoute';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import DriveStartRestaurantCuration from './DriveStartRestaurantCuration';
import {DragSortableView} from 'react-native-drag-sort';
import Drag from '../../assets/icons/Drag';

const {width} = Dimensions.get('window');

const DriveStart = ({route, navigation}) => {
  const driveCourseInfo = route.params.courseInfo;
  const placeInfo = driveCourseInfo.places;
  const [visibleItems, setVisibleItems] = useState(3);
  const nickname = useSelector(state => state.auth.nickname);
  const [checkInfo, setCheckInfo] = useState([]);
  console.log(checkInfo, ' sdaadds');
  const [data, setData] = useState(null);

  // initCheckInfo 초기화 (기본 경유지 추가)
  const initCheckInfo = {
    type: '기본경유지',
    waypoints: [],
  };

  for (let i = 0; i < driveCourseInfo.waypoints.length; i++) {
    const {name, latitude, longitude} = driveCourseInfo.waypoints[i];
    initCheckInfo.waypoints.push({id: i, name, latitude, longitude});
  }

  useEffect(() => {
    setCheckInfo([initCheckInfo]);
  }, [driveCourseInfo]);

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

  const renderItem = item => {
    const waypointNames = item.waypoints.map(wp => wp.name).join('-');

    return (
      <View
        style={{
          height: 'auto',
          width: width - 32,
          backgroundColor: colors.Gray02,
          borderRadius: 8,
          borderColor: colors.Gray03,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            flex: 1,
          }}>
          {item.type === '기본경유지' && <Text>📌</Text>}
          <Text
            style={[
              textStyles.B3,
              {color: colors.Gray10, flexWrap: 'wrap', flex: 1},
            ]}>
            {waypointNames}
          </Text>
        </View>
        {item.type !== '기본경유지' && <Drag />}
      </View>
    );
  };

  // const driveStartPress = () => {};

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
          <View style={{height: 24}} />
          <DragSortableView
            dataSource={checkInfo}
            childrenHeight={60}
            childrenWidth={width - 32}
            renderItem={renderItem}
            onDataChange={newData => {
              setCheckInfo(newData);
            }}
          />
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
                <DriveStartRestaurantCuration
                  item={item}
                  setCheckInfo={setCheckInfo}
                />
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
      </ScrollView>
      <View
        style={{
          position: 'fixed',
          flexDirection: 'row',
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}>
        <View style={{flex: 1}}>
          <CustomButton title={'드라이브 시작'} />
        </View>
      </View>
    </View>
  );
};

export default DriveStart;
