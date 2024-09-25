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
import HeartIcon from '../../assets/icons/HeartIcon.svg';
import {toggleLike} from '../../features/like/likeActions';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import {getDriveReviewList, setBlogReviewList} from '../../features/drive/driveActions';

const {width} = Dimensions.get('window');

const DriveDetail = ({route, navigation}) => {
  const driveId = route.params.id;
  const [liked, setLiked] = useState(route.params.liked);
  const [courseInfo, setCourseInfo] = useState(null);
  const scrollViewRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const tabName = ['상세정보', '리뷰', '관광정보'];
  const [activeTab, setActiveTab] = useState(0);
  const userId = useSelector(state => state.auth.userId);
  const [numOfLines, setNumOfLines] = useState(5);
  const [showMoreButton, setShowMoreButton] = useState(null);
  const dispatch = useDispatch();
  const {initialPage} = useSelector(state => state.drive);
  const [contentHeight, setContentHeight] = useState(null);
  const [buttonHeight, setButtonHeight] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [tabHeight, setTabHeight] = useState(null);
  const [textHeight, setTextHeight] = useState(0);
  const [fullTextHeight, setFullTextHeight] = useState(0);

  useEffect(() => {
    if (textHeight && fullTextHeight) {
      if (fullTextHeight > textHeight || numOfLines === null) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [textHeight, fullTextHeight]);

  useEffect(() => {
    dispatch(getDriveReviewList({
      id: driveId,
      page: initialPage,
      size: 10,
    }));
    console.log(driveId, '코스 아이디')
  }, []);

  const handleLikePress = () => {
    // dispatch(setLikedItem(driveId));
    setLiked(!liked);
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

  const updateCourseInfo = async () => {
    try {
      const response = await authApi.get(`course/${driveId}`);
      if (response.status === 200) {
        setCourseInfo(response.data);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@');
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
          // console.log(response.data, '@@@@');
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          Alert.alert('코스를 불러올 수 없습니다.');
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getDriveInfo();
    return () => {
      dispatch(setBlogReviewList(null));
    };
  }, []);

  const handleLayout = (event, setHeight) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
    console.log('Content height:', height);
  };

  const scrollToTab = () => {
    scrollViewRef.current.scrollToPosition(0, contentHeight, true);
  };

  const openDescription = () => {
    if (numOfLines === 5) {
      setNumOfLines(null);
    } else {
      setNumOfLines(5);
    }
  };


  if (!courseInfo) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return <RenderingPage />;
  }

  return (
    <View
      style={{flex: 1, backgroundColor: colors.BG}}
      onLayout={e => handleLayout(e, setContainerHeight)}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[1]}
        scrollEnabled={scrollEnabled}>
        <View onLayout={e => handleLayout(e, setContentHeight)}>
          <Image
            src={courseInfo.courseInfo.imagePath}
            style={{width: width, aspectRatio: 1.8}}
          />
          <View style={{paddingHorizontal: 16, marginTop: 16}}>
            <Text style={[textStyles.H1, {color: colors.Gray10}]}>
              {courseInfo.courseInfo.title}
            </Text>
            <View style={{height: 8}} />
            <View>
              <Text
                style={[textStyles.M14, {color: colors.Gray07}]}
                numberOfLines={numOfLines}
                onLayout={(event) => {
                  setTextHeight(event.nativeEvent.layout.height);
                }}
              >
                {courseInfo.courseInfo.description}
              </Text>
              <Text
                style={[
                  textStyles.M14,
                  {
                    color: colors.Gray07,
                    position: 'absolute',
                    opacity: 0,
                    zIndex: -1,
                    left: -1000, // 화면 밖으로 이동
                  },
                ]}
                onLayout={(event) => {
                  setFullTextHeight(event.nativeEvent.layout.height);
                }}
              >
                {courseInfo.courseInfo.description}
              </Text>
              <View style={{height: 8}} />
              {showMoreButton &&
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  openDescription();
                }}>
                <Text style={[textStyles.B3, {color: colors.Gray04}]}>
                  {numOfLines == null ? '접기' : '더보기'}
                </Text>
                <Text
                  style={{
                    color: colors.Gray04,
                    fontFamily: 'SUIT-Medium',
                    fontSize: 12,
                  }}>
                  {numOfLines == null ? null : '  >'}
                </Text>
              </TouchableOpacity>}
            </View>
          </View>
          <GrayLine />
        </View>
        <View onLayout={e => handleLayout(e, setTabHeight)}>
          {courseInfo !== null && (
            <Tabs
              tabName={tabName}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              scrollToTab={scrollToTab}
            />
          )}
        </View>
        {courseInfo !== null && (
          <View>
            {activeTab === 0 && (
              <DriveInfo
                item={courseInfo}
                driveId={driveId}
                minHeight={containerHeight - tabHeight - buttonHeight}
                setScrollEnabled={setScrollEnabled}
              />
            )}
            {activeTab === 1 && (
              <DriveReview
                item={courseInfo}
                updateCourseInfo={updateCourseInfo}
                userId={userId}
                scrollToTab={scrollToTab}
                minHeight={containerHeight - tabHeight - buttonHeight}
              />
            )}
            <View style={{display: activeTab === 2 ? 'flex' : 'none'}}>
              <DriveTourSpot
                item={courseInfo}
                minHeight={containerHeight - tabHeight - buttonHeight}
                setScrollEnabled={setScrollEnabled}
              />
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
        }}
        onLayout={e => handleLayout(e, setButtonHeight)}>
        <View style={{justifyContent: 'center'}}>
          <Pressable onPress={handleLikePress}>
            <HeartIcon
              fill={liked ? colors.red : 'rgba(0, 0, 0, 0)'}
              color={liked ? colors.red : colors.Blue}
              width={30}
              height={30}
            />
          </Pressable>
        </View>
        <View style={{width: 16}} />
        <View style={{flex: 1}}>
          <CustomButton title={'드라이브 시작하기'} onPress={goDriveStart} />
        </View>
      </View>
    </View>
  );
};

export default DriveDetail;
