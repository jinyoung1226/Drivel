import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
  Dimensions,
  Animated,
} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authApi} from '../../api/api';
import colors from '../../styles/colors';
import MeetInfo from './MeetInfo';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
import CustomButton from '../../components/CustomButton';
import formatDate from '../../utils/formatDate';
import MeetCourseInfo from './MeetCourseInfo';
import Tabs from '../../components/Tabs';
import MeetChatBoard from './MeetChatBoard';

const MeetDetail = ({route, navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [courseInfo, setCourseInfo] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [displayTabs, setDisplayTabs] = useState(false);
  const [iconColor, setIconColor] = useState(colors.white);
  const scrollViewRef = useRef(null); // ScrollView 참조
  const [scrollOffset, setScrollOffset] = useState(0);
  const meetingId = route.params.meetingId;
  const courseId = route.params.courseId;
  const meetingTitle = route.params.meetingTitle;

  const width = Dimensions.get('window').width;
  const tabName = ['모임 정보', '코스 정보', '게시판'];
  
  const getDriveCourseInfo = async () => {
    try {
      const response = await authApi.get(`course/${courseId}`);
      if (response.status == 200) {
        // console.log(response.data, 'course');
        setCourseInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  const getMeetingInfo = async () => {
    try {
      const response = await authApi.get(`meeting/${meetingId}`);
      if (response.status == 200) {
        // console.log(response.data.meetingInfo.participantsInfo.membersInfo, 'meeting', '@@@@');
        setMeetingInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  useEffect(() => {
    getDriveCourseInfo();
    getMeetingInfo();
  }, []);
  
  participateMeeting = async () => {
    try {
      const response = await authApi.post(`/meeting/join`, {id: meetingId});
      if (response.status == 200) {
        console.log(response.data, 'participate')
        Alert.alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data.message);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  useEffect(() => {
    if (scrollViewRef.current && scrollOffset > width - 56) {
      // 원하는 위치로 스크롤
      scrollViewRef.current.scrollToPosition(0, width - 56, true);
    }
  }, [activeTab]); // activeTab 변경 시 스크롤

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: meetingTitle,
      headerTitleStyle: [
        textStyles.H3,
        {
          color: scrollY.interpolate({
            inputRange: [0, width/3],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
            extrapolate: 'clamp',
          }),
        },
      ],
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={iconColor} />
        </TouchableOpacity>
      ),
      headerBackground: () => (
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: scrollY.interpolate({
              inputRange: [0, width/3],
              outputRange: ['rgba(0,0,0,0)', 'rgba(255,255,255,1)'],
              extrapolate: 'clamp',
            }),
            elevation: scrollY.interpolate({
              inputRange: [0, width/3],
              outputRange: [0, 3],
              extrapolate: 'clamp',
            }),
          }}
        />
      ),
    });
  }, [navigation, scrollY, iconColor]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MeetMain');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: false,
    })(event);
    if (offsetY > width - 56) {
      setDisplayTabs(true);
    } else if (offsetY <= width - 56) {
      setDisplayTabs(false);
    }
    if (offsetY > 5) {
      setIconColor(colors.Gray10);
    } else if (offsetY <= 5) {
      setIconColor(colors.white);
    }
  };

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabName={tabName}
        style={{
          top: 56,
          zIndex: 1,
          display: displayTabs ? 'flex' : 'none',
        }}
      />
      <KeyboardAwareScrollView
        ref={scrollViewRef} // ScrollView 참조 연결
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {courseInfo !== null && meetingInfo !== null && (
          <ImageBackground
            style={{width: width, aspectRatio: 1}}
            src={courseInfo.courseInfo.imagePath}>
            <LinearGradient
              style={{width: '100%', aspectRatio: 1}}
              colors={[
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0.7)',
              ]}>
              <View style={{flex: 1, padding: 16}}>
                <View style={{flex: 1}} />
                <Text style={[textStyles.H1, {color: colors.white}]}>
                  {meetingInfo.meetingInfo.title}
                </Text>
                <View style={{height: 8}} />
                <Text style={[textStyles.B3, {color: colors.Gray02}]}>
                  {courseInfo.courseInfo.title}
                </Text>
                <View style={{height: 4}} />
                <Text style={[textStyles.B3, {color: colors.Gray02}]}>
                  {formatDate(meetingInfo.meetingInfo.date)} 모임
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
        {meetingInfo !== null && courseInfo !== null && displayTabs == false ? (
          <Tabs
            tabName={tabName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <View style={{height: 52}} />
        )}
        {meetingInfo !== null && courseInfo !== null && (
          <View>
            {activeTab === 0 && <MeetInfo item={meetingInfo} />}
            {activeTab === 1 && <MeetCourseInfo item={courseInfo} />}
            {activeTab === 2 && <MeetChatBoard/>}
          </View>
        )}
      </KeyboardAwareScrollView>
      <View
        style={{
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
        }}>
        <CustomButton
          title={'참여하기'}
          onPress={() => {
            participateMeeting();
          }}
        />
      </View>
    </View>
  );
};

export default MeetDetail;
