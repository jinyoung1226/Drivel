import React, {useEffect, useState} from "react";

import { View, Text, ActivityIndicator } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MeetChatMessage from "./MeetChatMessage";
import { authApi } from "../../api/api";
import KebabMenuIcon from "../../assets/icons/KebabMenuIcon";
import {useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import NoticeItem from "./NoticeItem";
import NoItemScreen from "../../components/NoItemScreen";
import BubbleIcon from "../../assets/icons/BubbleIcon";
const MeetChatBoard = ({
  notice, 
  confirmModalVisible, 
  setConfirmModalVisible, 
  setType, 
  setTargetId,
  minHeight,
  selectedChatItem,
  setSelectedChatItem
}) => {

  const {userId} = useSelector(state => state.auth);
  const {meetMessageList, isLoading} = useSelector(state => state.meet);


  return (
    <View style={{minHeight:minHeight}}>
      <View style={{height:8}}/>
      <Text style={[textStyles.B4, {color: colors.Gray04, marginHorizontal:24}]}>* 커뮤니티 이용 규칙에 벗어나는 게시글은 사전 고지 없이 삭제될 수 있으며, 서비스 이용이 일정 기간 제한될 수 있어요.</Text>
      <View style={{height:8}}/>
      {notice && <NoticeItem item={notice} confirmModalVisible={confirmModalVisible} setConfirmModalVisible={setConfirmModalVisible} setTargetId={setTargetId} setType={setType}/>}
      <View style={{height:8}}/>
      <Text style={[textStyles.H5, {marginLeft:24, color: colors.Blue}]}>{meetMessageList.length}개</Text>
      <View style={{height:8}}/>
      {meetMessageList.length == 0 ?
      <NoItemScreen text={'게시판에 소식이 없어요\n첫 메시지를 남겨보세요'} icon={<BubbleIcon/>}/>
      :
      <FlatList
        scrollEnabled={false}
        data={meetMessageList}
        renderItem={({item}) => (
        <MeetChatMessage 
          item={item}
          selectedChatItem={selectedChatItem} 
          setSelectedChatItem={setSelectedChatItem} 
          userId={userId} 
          setType={setType} 
          setTargetId={setTargetId} 
          setConfirmModalVisible={setConfirmModalVisible} 
          confirmModalVisible={confirmModalVisible}/>)
        }
        keyExtractor={item => item.id}
      />}
      {isLoading && 
      <View style={{position:'absolute', bottom: 24, alignSelf:'center', alignItems:'center', justifyContent:'center', elevation:5}}>
        <View style={{position:'absolute', width:32, height:32, backgroundColor:colors.Gray10, opacity:0.7, borderRadius:20}}/>
        <ActivityIndicator size={'small'} style={{position:'absolute' }} color={colors.BG}/>
      </View>}
    </View>
  );
};

export default MeetChatBoard;
