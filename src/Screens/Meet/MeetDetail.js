import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';

const MeetDetail = ({route, navigation}) => {
  const meetingId = route.params.meetingId;
  const courseId = route.params.courseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MeetMain');
          }}
          style={{padding: 16}}>
          <BackIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>
        {meetingId}
        {courseId}
      </Text>
    </View>
  );
};
export default MeetDetail;
