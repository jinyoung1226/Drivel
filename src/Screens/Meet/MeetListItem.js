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
import CarIcon from '../../assets/icons/CarIcon.svg';
import PersonIcon from '../../assets/icons/PersonIcon.svg';
import PinIcon from '../../assets/icons/PinIcon.svg';
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
      height: 148,
      borderWidth: 1,
      borderColor: colors.Gray01,
      padding: 16,
    }}
    onPress={() => goMeetDetail(item)}
    onLongPress={() => {
      setSelectedMeet(item);
    }}>
    <View
      style={{
        width: 104,
        height: 113,
        backgroundColor: 'grey',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <ImageBackground
        src={item.imagePath}
        style={{flex: 1, alignItems: 'flex-end', padding: 7}}>
        {/* <TouchableOpacity 
          onPress={() => {likeMeet(item.id)}}
          style={{width:18, height:18}}
        >
          {isLike ? <LikeIcon/> : <LikedIcon/>}
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
    <View style={{width: 16}} />
    <View style={{flex: 1, justifyContent: 'center', paddingRight: 8}}>
      <Text style={[textStyles.H4, {color: colors.Gray10}]} numberOfLines={1}>
        {item.meetingTitle}
      </Text>
      <View style={{height: 4}} />
      <Text style={[textStyles.B3, {color: colors.Gray08, backgroundColor: colors.Gray02, padding:4, borderRadius:3}]} numberOfLines={1}>{item.courseTitle}</Text>
      <View style={{height: 8}} />
      <View style={{flexDirection: 'row'}}>
        <PinIcon marginTop={2} />
        <Text
          style={[textStyles.B3, {color: colors.Gray08, marginLeft: 4}]}
          numberOfLines={1}>
          {item.meetingPoint}
        </Text>
      </View>
      <View style={{height: 8}} />
      <View style={{flexDirection: 'row'}}>
        <PersonIcon marginTop={1.5} />
        <Text
          style={[textStyles.B3, {color: colors.Gray08, marginLeft: 4}]}
          numberOfLines={1}>
          {item.participantsCount}/{item.capacity}
          {item.startAge == null && item.endAge == null ? null : ' · '}
          {item.startAge == null && item.endAge == null
            ? null
            : `${item.startAge}-${item.endAge}세`}
          {item.gender == null ? null : ' · '}
          {item.gender == null ? null : item.gender}
        </Text>
      </View>
      <View style={{height: 8}} />
      {(item.minCarCareer !== null || item.carModel !== null) &&  
      <View style={{flexDirection: 'row'}}>
        <CarIcon marginTop={1.5} />
        <Text
          style={[textStyles.B3, {color: colors.Gray08, marginLeft: 4}]}
          numberOfLines={1}>
          {item.minCarCareer == null
            ? null
            : `운전경력 ${item.minCarCareer}년 이상`}
          {item.minCarCareer == null || item.carModel == null ? null : ' · '}
          {item.carModel == null ? null : item.carModel}
        </Text>
      </View>}
    </View>
  </TouchableOpacity>
);

export default MeetListItem;
