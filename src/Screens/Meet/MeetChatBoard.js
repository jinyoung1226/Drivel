import React, {useEffect, useState} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MeetChatMessage from "./MeetChatMessage";
import { authApi } from "../../api/api";
import KebabMenuIcon from "../../assets/icons/KebabMenuIcon";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const MeetChatBoard = ({notice, getMeetNotice, confirmModalVisible, setConfirmModalVisible, setType, setTargetId}) => {
  const navigation = useNavigation();
  const {userId} = useSelector(state => state.auth);
  const [noticeMenuVisible, setNoticeMenuVisible] = useState(false);
  const [selectedChatItem, setSelectedChatItem] = useState(null);
  useEffect(() => { 
    getMeetNotice();
  }
  , [])

  const NoticeItem = ({item}) => {
    return (
      <View style={{ padding:16, borderRadius:14, backgroundColor:colors.Gray01, marginVertical:8, marginHorizontal:16}}>
        {noticeMenuVisible &&
          <View style={{position:'absolute', right:16, top:44}}>
            {item.writerId == userId &&
            <Pressable 
              onPress={() => {setType('notice'); setConfirmModalVisible(!confirmModalVisible); setNoticeMenuVisible(!noticeMenuVisible)}}
              style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
            >
              <Text style={[textStyles.B4, {color:colors.Gray10}]}>삭제하기</Text>
            </Pressable>}
            {item.writerId !== userId &&
            <Pressable 
              onPress={() => {navigation.navigate("ReportPage", {targetId: item.writerId}); setNoticeMenuVisible(!noticeMenuVisible)}}
              style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
            >
              <Text style={[textStyles.B4, {color:colors.Gray10}]}>신고하기</Text>
            </Pressable>}
            {item.writerId !== userId &&
            <Pressable 
              onPress={() => {setType('block'); setTargetId(item.writerId); setConfirmModalVisible(!confirmModalVisible); setNoticeMenuVisible(!noticeMenuVisible)}}
              style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
            >
              <Text style={[textStyles.B4, {color:colors.Gray10}]}>차단하기</Text>
            </Pressable>}
          </View>
        }
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Text style={[textStyles.H5, {color:colors.Blue}]}>{item.writerNickname}</Text>
            <View style={{height:4}}/>
            <Text style={[textStyles.B4, {color:colors.Gray06}]}>{item.createdAt}</Text>
          </View>
          <View>
            <TouchableOpacity 
              onPress={() => {setNoticeMenuVisible(!noticeMenuVisible)}}
              style={{padding:6, paddingTop:0, marginRight:-6}}  
            >
              <KebabMenuIcon width={20} height={20} color={colors.Gray04}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:20}}/>
        <View style={{flexDirection:'row'}}>
          <Text style={[textStyles.B3, {color:colors.red}]}>[공지]</Text>
          <View style={{width:8}}/>
          <Text style={[textStyles.C4, {color:colors.Gray10}]}>{item.content}</Text>
        </View>
      </View>
    )
  }

  const data = [
    {nickname:'bbb', message:'안녕하세요', sendAt:'2024-08-05', notice: false, senderId: 1, id:1}, 
    {nickname:'ccc', message:'안녕하세요', sendAt:'2024-08-05', notice: false, senderId: 2, id:2}, 
    {nickname:'ddd', message:'안녕하세요', sendAt:'2024-08-05', notice: false, senderId: 2, id:3}
  ]
  return (
    <View>
      <View style={{padding:16}}>
        <Text style={[textStyles.H5, {marginLeft:8, color: colors.Blue}]}>{}개</Text>
        <View style={{height:16}}/>
      </View>
      <Text style={[textStyles.B4, {color: colors.Gray04, marginHorizontal:32}]}>* 커뮤니티 이용 규칙에 벗어나는 게시글은 사전 고지 없이 삭제될 수 있으며, 서비스 이용이 일정 기간 제한될 수 있어요.</Text>
      {notice && <NoticeItem item={notice}/>}
      <View>
        {data.map((item, index) => (
          <MeetChatMessage 
            item={item} 
            key={item.id} 
            selectedChatItem={selectedChatItem} 
            setSelectedChatItem={setSelectedChatItem}
            userId={userId}
            setType={setType}
            setTargetId={setTargetId}
            setConfirmModalVisible={setConfirmModalVisible}
            confirmModalVisible={confirmModalVisible}
            />
        ))}
      </View>
      
    </View>
  );
};

export default MeetChatBoard;
