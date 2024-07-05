import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { authApi } from '../../api/api';
import colors from '../../styles/colors';
import TabScreen from '../../components/TabScreen';

const MeetDetail = ({route, navigation}) => {
  const [courseInfo, setCourseInfo] = useState(null)
  const [meetingInfo, setMeetingInfo] = useState(null)
  const meetingId = route.params.meetingId;
  const courseId = route.params.courseId;
  const getDriveCourseInfo = async() => {
    try {
      const response = await authApi.get(`course/${courseId}`);
      if (response.status == 200) {
        console.log(response.data, 'course');
        setCourseInfo(response.data)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  }
  const getMeetingInfo = async() => {
    try {
      const response = await authApi.get(`meeting/${meetingId}`);
      if (response.status == 200) {
        console.log(response.data, 'meeting');
        setMeetingInfo(response.data)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  }
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
          <BackIcon color ={colors.white}/>
        </TouchableOpacity>
      ),
      headerBackground: () => (<View style={{flex:1, backgroundColor: 'rgba(0,0,0,0)'}}></View>),
    });
  }, [navigation]);

  return (
    <View>
      <KeyboardAwareScrollView>
        {courseInfo !== null && 
        <ImageBackground style={{width:'100%', aspectRatio:1}} src={courseInfo.courseInfo.imagePath}>
          
        </ImageBackground>}
        <TabScreen menus={['모임정보', '코스정보', '게시판']}  contents={[(<View><Text>화면1</Text></View>), (<View><Text>화면2</Text></View>), (<View><Text>화면3</Text></View>)]} />
        <Text>
          {meetingId}
          {courseId}
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default MeetDetail;
