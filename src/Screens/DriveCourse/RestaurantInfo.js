import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import {
  Text,
  Image,
  View,
  Alert,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {authApi} from '../../api/api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Tabs from '../../components/Tabs';
import RestaurantInfoTab from './RestaurantInfoTab';
import DriveReview from './DriveReview';
import GrayLine from '../../components/GrayLine';
import RestaurantReviewTab from './RestaurantReviewTab';
import RenderingPage from '../../components/RenderingPage';
import { setCafeBlogReviewList } from '../../features/drive/driveActions';
import { useDispatch } from 'react-redux';

const {width} = Dimensions.get('window');

const RestaurantInfo = ({route}) => {
  const navigation = useNavigation();
  const placeId = route.params.restaurantId;

  const [placeInfo, setPlaceInfo] = useState(null);
  const [heightUntilGrayLine, setHeightUntilGrayLine] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const tabName = ['상세정보', '블로그 리뷰'];
  const [activeTab, setActiveTab] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  const [contentHeight, setContentHeight] = useState(0);
  const dispatch = useDispatch();

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
    return () => {
      dispatch(setCafeBlogReviewList(null));
    }
  }, []);

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

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
    console.log("Content height:", height);
  };  

  const scrollToTab = () => {
    scrollViewRef.current.scrollToPosition(0, contentHeight, true);
  };  

  if (!placeInfo) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return <RenderingPage />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[1]}
        scrollIndicatorInsets={{right: 0.1}}
        >
        <View onLayout={handleLayout}>
          <Image
            src={placeInfo.imagePath}
            style={{width: width, aspectRatio: 1.8}}
          />
          <View
            style={{paddingHorizontal: 16, marginTop: 16}}
          >
            <Text style={[textStyles.H1, {color: colors.Gray10}]}>
              {placeInfo.name}
            </Text>
            <View style={{height: 8}} />
            <Text style={[textStyles.M14, {color: colors.Gray07}]}>
              {placeInfo.category}
            </Text>
          </View>
          <GrayLine />
        </View>
        {placeInfo !== null && (
          <Tabs
            tabName={tabName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scrollToTab={scrollToTab}
          />
        )}
        {placeInfo !== null && (
          <View>
            {activeTab === 0 && <RestaurantInfoTab item={placeInfo} />}
            {activeTab === 1 && <RestaurantReviewTab placeInfo={placeInfo} />}
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RestaurantInfo;
