import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import LikeIcon from '../../assets/icons/LikeIcon.svg';
import LikedIcon from '../../assets/icons/LikedIcon.svg';
const MeetListItem = ({
  item,
  goMeetDetail,
  setModalVisible,
  setSelectedMeet,
}) => (
  <TouchableOpacity
    style={{
      flex: 1,
      elevation: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: colors.BG,
      marginHorizontal: 16,
      marginVertical: 8,
      height: 136,
    }}
    onPress={() => goMeetDetail(item)}
    onLongPress={() => {
      setModalVisible(true);
      setSelectedMeet(item);
    }}>
    <View
      style={{
        width: 104,
        height: 104,
        backgroundColor: 'grey',
        borderRadius: 10,
        margin: 16,
        overflow: 'hidden',
      }}>
      <ImageBackground
        src={item.meetingImageAddress}
        style={{flex: 1, alignItems: 'flex-end', padding: 7}}>
        {/* <TouchableOpacity 
          onPress={() => {likeMeet(item.id)}}
          style={{width:18, height:18}}
        >
          {isLike ? <LikeIcon/> : <LikedIcon/>}
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={[textStyles.H4, {color: colors.Gray10}]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[textStyles.B3, {color: colors.Gray10}]}>
        {item.course.start}-{item.course.midPoint1}-{item.course.end}
      </Text>
      <Text style={[textStyles.B3, {color: colors.Gray08}]} numberOfLines={1}>
        {item.location}
      </Text>
      <Text style={[textStyles.B3, {color: colors.Gray08}]} numberOfLines={1}>
        {item.participants}/{item.capacity}
        {item.age[0]}
      </Text>
    </View>
  </TouchableOpacity>
);

export default MeetListItem;
