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
import DriveStartSpotCuration from './DriveStartSpotCuration';
import {DragSortableView} from 'react-native-drag-sort';
import Drag from '../../assets/icons/Drag';
import {Linking} from 'react-native';
import NoItemScreen from '../../components/NoItemScreen';
import MapIcon from '../../assets/icons/MapIcon';
import ShopIcon from '../../assets/icons/ShopIcon';
const {width} = Dimensions.get('window');

const DriveStart = ({route, navigation}) => {
  const driveCourseInfo = route.params.courseInfo;
  const spotInfo = driveCourseInfo.spots;
  const placeInfo = route.params.courseInfo.places;
  const [placeVisibleItems, setPlaceVisibleItems] = useState(3);
  const [spotVisibleItems, setSpotVisibleItems] = useState(3);
  const nickname = useSelector(state => state.auth.nickname);
  const [checkInfo, setCheckInfo] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true); // 스크롤 가능 여부 상태
  console.log(checkInfo);

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

  const handleShowPlaceMore = () => {
    setPlaceVisibleItems(prev => prev + 3);
  };

  const handleShowSpotMore = () => {
    setSpotVisibleItems(prev => prev + 3);
  };

  const renderItem = item => {
    const waypointNames = item.waypoints.map(wp => wp.name).join('-');

    return (
      <View
        style={{
          height: 60,
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
            ]}
            numberOfLines={1}>
            {waypointNames}
          </Text>
        </View>
        {item.type !== '기본경유지' && <Drag />}
      </View>
    );
  };

  const driveStartPress = () => {
    const collectedWaypoints = [];
    let count = 0;

    // waypoints 수집
    for (const item of checkInfo) {
      for (const waypoint of item.waypoints) {
        collectedWaypoints.push({
          name: waypoint.name,
          x: waypoint.longitude,
          y: waypoint.latitude,
        });
        count++;
        if (count === 4) {
          break;
        }
      }
      if (count === 4) {
        break;
      }
    }

    console.log(collectedWaypoints);

    // 빈 params 객체를 생성
    const params = {};

    // 마지막으로 수집된 waypoints를 목적지로 설정
    const destination = collectedWaypoints.pop(); // 배열의 마지막 요소를 제거하고 반환
    params['name3'] = destination.name;
    params['x3'] = destination.x;
    params['y3'] = destination.y;

    // 나머지 경유지 설정
    collectedWaypoints.forEach((waypoint, index) => {
      params[`name${index}`] = waypoint.name;
      params[`x${index}`] = waypoint.x;
      params[`y${index}`] = waypoint.y;
    });
    console.log(params, '@@@');
    const url = `https://main--kakaonavi.netlify.app/?name0=${encodeURIComponent(
      params.name0,
    )}&x0=${params.x0}&y0=${params.y0}&name1=${encodeURIComponent(
      params.name1,
    )}&x1=${params.x1}&y1=${params.y1}&name2=${encodeURIComponent(
      params.name2,
    )}&x2=${params.x2}&y2=${params.y2}&name3=${encodeURIComponent(
      params.name3,
    )}&x3=${params.x3}&y3=${params.y3}`;

    console.log(url);
    // 웹사이트로 이동
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={{height: 150, width: '100%'}}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            style={{flex: 1, borderRadius: 5}}
          />
        </View>
        <View style={{height: 24}} />
        <View style={{paddingHorizontal: 16}}>
          {spotInfo.length == 0 && placeInfo.length == 0 ?
            <View>
              <Text style={[textStyles.H3, {color: colors.Gray10}]}>
                추가할 수 있는 경유지가 없어요 🥲
              </Text>
              <Text style={[textStyles.H3, {color: colors.Gray10}]}>
                바로 내비게이션으로 이동해보세요
              </Text>
              <View style={{height: 8}} />
            </View>
            :
            <View>
              <Text style={[textStyles.H3, {color: colors.Gray10}]}>
                원하는 경유지를 추가하고
              </Text>
              <Text style={[textStyles.H3, {color: colors.Gray10}]}>
                네비게이션으로 연결해보세요
              </Text>
              <View style={{height: 8}} />
              <Text style={[textStyles.C4, {color: colors.Gray06}]}>
                {'하단에서 관광지와 카페, 맛집 등의 경유지를 추가하고\n드라이브코스 순서를 마음대로 변경할 수 있습니다'}
              </Text>
              <View style={{height: 8}} />
              <Text style={[textStyles.B4, {color: colors.Blue}]}>
                * 상위 4개 경유지만 네비게이션으로 연결됩니다
              </Text>
            </View>}
          <View style={{height: 8}} />
          <DragSortableView
            dataSource={checkInfo}
            childrenHeight={72}
            childrenWidth={width - 32}
            renderItem={renderItem}
            onDataChange={newData => {
              setCheckInfo(newData);
            }}
            onDragStart={() => setScrollEnabled(false)} // 드래그 시작 시 스크롤 비활성화
            onDragEnd={() => setScrollEnabled(true)}
          />
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 24}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            {'🏡 '} 근처에 이런 관광지가 있어요!
          </Text>
          <View style={{height: 24}} />
          {spotInfo.length == 0 ? (
            <NoItemScreen
              text={'주변에 등록된 관광지가 없어요!'}
              icon={<MapIcon />}
            />
          ) : (
            <View>
              <FlatList
                data={spotInfo.slice(0, spotVisibleItems)}
                renderItem={({item}) => (
                  <DriveStartSpotCuration
                    item={item}
                    setCheckInfo={setCheckInfo}
                  />
                )}
                scrollEnabled={false}
              />
              {spotVisibleItems < spotInfo.length && (
                <>
                  <View style={{height: 8}} />
                  <TouchableOpacity
                    onPress={handleShowSpotMore}
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
          )}
        </View>
        <GrayLine />
        <View style={{paddingHorizontal: 16, marginTop: 24}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            {'🥣 '} {nickname}님께 딱 맞는 맛집도 추천해드릴게요!
          </Text>
          <View style={{height: 24}} />
          {placeInfo.length == 0 ? (
            <NoItemScreen
              text={'주변에 등록된 맛집이 없어요'}
              icon={<ShopIcon />}
            />
          ) : (
            <View>
              <FlatList
                data={placeInfo.slice(0, placeVisibleItems)}
                renderItem={({item}) => (
                  <DriveStartRestaurantCuration
                    item={item}
                    setCheckInfo={setCheckInfo}
                  />
                )}
                scrollEnabled={false}
              />
              {placeVisibleItems < placeInfo.length && (
                <>
                  <View style={{height: 8}} />
                  <TouchableOpacity
                    onPress={handleShowPlaceMore}
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
          )}
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
          <CustomButton title={'드라이브 시작'} onPress={driveStartPress} />
        </View>
      </View>
    </View>
  );
};

export default DriveStart;
