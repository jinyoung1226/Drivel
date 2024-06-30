import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import CarIcon from '../../assets/icons/CarIcon.svg';
import PersonIcon from '../../assets/icons/PersonIcon.svg';
import PinIcon from '../../assets/icons/PinIcon.svg';
const MeetListItem = ({ item, goMeetDetail, setModalVisible, setSelectedMeet }) => (
  <TouchableOpacity
    style={{flex:1, elevation:10, flexDirection: "row", alignItems: "center",borderRadius: 10, backgroundColor: colors.BG, marginHorizontal:16, marginVertical:8, height:136, borderWidth:1 , borderColor: colors.Gray01 }}
    onPress={() => goMeetDetail(item)}
    onLongPress={() => {
      setSelectedMeet(item)
      }
    }
  >
    <View style={{width: 104, height: 104, backgroundColor:'grey', borderRadius: 10, margin:16, overflow: 'hidden'}}>
      <ImageBackground src={item.imagePath} style={{flex:1, alignItems: 'flex-end', padding:7}}>
        {/* <TouchableOpacity 
          onPress={() => {likeMeet(item.id)}}
          style={{width:18, height:18}}
        >
          {isLike ? <LikeIcon/> : <LikedIcon/>}
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
    <View style={{flex:1, justifyContent:'center'}}>
      <Text style={[textStyles.H4, {color: colors.Gray10}]} numberOfLines={1}>{item.meetingTitle}</Text>
      <View style={{height:8}}/>
      {/* <Text style={[textStyles.B3, {color: colors.Gray08}]} numberOfLines={1}>{item.courseTitle}</Text> 웨이포인트의 시작과 끝만 하는게 제일 나을듯 */}
      <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
        <PinIcon/>
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:4}]} numberOfLines={1}>{item.meetingPoint}</Text>  
      </View>
      <View style={{height:8}}/>
      <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
        <PersonIcon/>
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:4}]} numberOfLines={1}>{item.participants}/{item.capacity}</Text>
        {!(item.startAge == null && item.startAge == null) && <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>·</Text>}
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>{(item.startAge == null && item.startAge == null) ? null : `${item.startAge}-${item.endAge}세`}</Text>
        {item.gender !== null && <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>·</Text>}
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>{item.gender == 0 ? null : item.gender}</Text> 
      </View>
      <View style={{height:8}}/>
      <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
        {(item.minCarCareer !== null || item.carModel !== null) && <CarIcon/>}
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:4}]} numberOfLines={1}>{item.minCarCareer == null ? null : `운전경력 ${item.minCarCareer}년 이상`}</Text>
        {item.minCarCareer !== null && item.carModel !== null && <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>·</Text>}
        <Text style={[textStyles.B3, {color: colors.Gray08, marginLeft:2}]} numberOfLines={1}>{item.carModel == null ? null : item.carModel}</Text>
      </View>
    </View>
</TouchableOpacity>
);

export default MeetListItem