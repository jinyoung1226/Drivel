import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {authApi} from '../../api/api';
import BackIcon from '../../assets/icons/BackIcon';
import GrayLine from '../../components/GrayLine';
import DriveInfo from './DriveInfo';
import DriveReview from './DriveReview';
import DriveTourSpot from './DriveTourSpot';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Tabs from '../../components/Tabs';
import RenderingPage from '../../components/RenderingPage';
import BorderBlueHeart from '../../assets/icons/BorderBlueHeart.svg';
import {toggleLike} from '../../features/like/likeActions';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';

const {width} = Dimensions.get('window');

const DriveDetail = ({route, navigation}) => {
  const driveId = route.params.id;
  const [courseInfo, setCourseInfo] = useState(null);
  const [heightUntilGrayLine, setHeightUntilGrayLine] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const tabName = ['상세정보', '리뷰', '관광정보'];
  const [activeTab, setActiveTab] = useState(0);

  const likedItems = useSelector(state => state.like.likedItems);
  const userId = useSelector(state => state.auth.userId);
  const liked = likedItems[driveId] || false;
  const dispatch = useDispatch();

  const handleLikePress = () => {
    dispatch(toggleLike(driveId));
  };

  const goDriveStart = () => {
    navigation.navigate('DriveStart', {courseInfo: courseInfo});
  };

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

  useEffect(() => {
    setHeightUntilGrayLine(imageHeight + titleHeight);
  }, [imageHeight, titleHeight]);

  const updateCourseInfo = async () => {
    try {
      const response = await authApi.get(`course/${driveId}`);
      if (response.status === 200) {
        setCourseInfo(response.data);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@")
      }
    } catch (error) {
      console.error('Error fetching updated course info:', error);
    }
  };

  useEffect(() => {
    const getDriveInfo = async () => {
      try {
        const response = await authApi.get(`course/${driveId}`);
        if (response.status === 200) {
          setCourseInfo(response.data);
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
    getDriveInfo();
  }, [driveId]);

  useEffect(() => {
    if (scrollViewRef.current && scrollOffset > heightUntilGrayLine + 60) {
      // 원하는 위치로 스크롤
      scrollViewRef.current.scrollToPosition(0, heightUntilGrayLine + 60, true);
    }
  }, [activeTab]); // activeTab 변경 시 스크롤

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
  };

  if (!courseInfo) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return <RenderingPage />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        stickyHeaderIndices={[3]}>
        <Image
          src={courseInfo.courseInfo.imagePath}
          style={{width: width, aspectRatio: 1.8}}
          onLayout={event => setImageHeight(event.nativeEvent.layout.height)}
        />
        <View
          style={{paddingHorizontal: 16, marginTop: 16}}
          onLayout={event => setTitleHeight(event.nativeEvent.layout.height)}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            {courseInfo.courseInfo.title}
          </Text>
          <View style={{height: 8}} />
          <Text style={[textStyles.M14, {color: colors.Gray07}]}>
            {courseInfo.courseInfo.description}
          </Text>
        </View>
        <GrayLine />
        {courseInfo !== null && (
          <Tabs
            tabName={tabName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        {courseInfo !== null && (
          <View>
            {activeTab === 0 && (
              <DriveInfo item={courseInfo} driveId={driveId} />
            )}
            {activeTab === 1 && (
              <DriveReview
                item={courseInfo}
                updateCourseInfo={updateCourseInfo}
                userId={userId}
              />
            )}
            <View style={{display: activeTab === 2 ? 'flex' : 'none'}}>
              <DriveTourSpot item={courseInfo} />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Pressable onPress={handleLikePress}>
            <BorderBlueHeart fill={liked ? '#5168F6' : 'rgba(0, 0, 0, 0)'} />
          </Pressable>
        </View>
        <View style={{width: 16}} />
        <View style={{flex: 1}}>
          <CustomButton title={'드라이브 시작하기'} onPress={goDriveStart}  />
        </View>
      </View>
    </View>
  );
};

export default DriveDetail;
