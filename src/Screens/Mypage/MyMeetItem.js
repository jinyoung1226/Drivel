import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import formatDate from '../../utils/formatDate';
import { useNavigation } from '@react-navigation/native';
const MyMeetItem = ({item}) => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      style={{
        width: (width - 48) / 2,
        backgroundColor: colors.BG,
        overflow: 'hidden',
      }}
      onPress={() => {navigation.navigate('MeetDetail', {
        meetingId: item.meetingId,
        courseId: item.courseId,
        meetingTitle: item.title,
      })}}>
    
      <Image src={item.imagePath} style={{width:'100%', aspectRatio:1.4, borderRadius: 10}}/>
      <View style={{height: 10}} />
      <Text style={[textStyles.B3, {color: colors.Gray10}]} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={{height: 4}} />
      <Text style={[textStyles.B4, {color: colors.Gray05}]}>
        {formatDate(item.date)}
      </Text>
    </TouchableOpacity>
  );
};

export default MyMeetItem;
