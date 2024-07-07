import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authApi} from '../../api/api';
import colors from '../../styles/colors';
import TopTab from '../../components/TopTab';
import TabScreens from '../../components/TabScreens';
import MeetInfo from './MeetInfo';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
const MeetDetail = ({route, navigation}) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const meetingId = route.params.meetingId;
  const courseId = route.params.courseId;
  const tabName = ['모임 정보', '코스 정보', '게시판'];
  const tabScreens = [
    <MeetInfo item={meetingInfo} />,
    <View>
      <Text>222222</Text>
    </View>,
    <View>
      <Text>33333</Text>
    </View>,
  ];
  const getDriveCourseInfo = async () => {
    try {
      const response = await authApi.get(`course/${courseId}`);
      if (response.status == 200) {
        console.log(response.data, 'course');
        setCourseInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };
  const getMeetingInfo = async () => {
    try {
      const response = await authApi.get(`meeting/${meetingId}`);
      if (response.status == 200) {
        console.log(response.data, 'meeting');
        setMeetingInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };
  useEffect(() => {
    getDriveCourseInfo();
    getMeetingInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MeetMain');
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.white} />
        </TouchableOpacity>
      ),
      headerBackground: () => (
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}></View>
      ),
    });
  }, [navigation]);

  const formatDateString = dateString => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  return (
    <View style={{backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
        {courseInfo !== null && (
          <ImageBackground
            style={{width: '100%', aspectRatio: 1}}
            src={courseInfo.courseInfo.imagePath}>
            <LinearGradient
              style={{width: '100%', aspectRatio: 1}}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}>
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
                  {formatDateString(meetingInfo.meetingInfo.date)} 모임
                </Text>
              </View>
              {/* {courseInfo.waypoints.map(
                item => (
                  <Text>
                    {item.name}
                  </Text>
                  )
                )
              } */}
            </LinearGradient>
          </ImageBackground>
        )}
        {meetingInfo !== null && (
          <TabScreens tabName={tabName} tabScreens={tabScreens} />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};
export default MeetDetail;
