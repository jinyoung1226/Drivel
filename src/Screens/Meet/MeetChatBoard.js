import React, {useEffect, useState} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
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

const MeetChatBoard = ({
  notice, 
  confirmModalVisible, 
  setConfirmModalVisible, 
  setType, 
  setTargetId,
}) => {

  const navigation = useNavigation();
  const {userId} = useSelector(state => state.auth);
  const {meetMessageList} = useSelector(state => state.meet);
  const [noticeMenuVisible, setNoticeMenuVisible] = useState(false);
  const [selectedChatItem, setSelectedChatItem] = useState(null);

  // const NoticeItem = ({item, style}) => {
  //   return (
  //     <View style={[style, { padding:16, borderRadius:14, backgroundColor:colors.Gray01, marginVertical:8, marginHorizontal:16}]}>
  //       {noticeMenuVisible &&
  //         <View style={{position:'absolute', right:16, top:44}}>
  //           {item.writerId == userId &&
  //           <Pressable 
  //             onPress={() => {setType('notice'); setConfirmModalVisible(!confirmModalVisible); setNoticeMenuVisible(!noticeMenuVisible)}}
  //             style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
  //           >
  //             <Text style={[textStyles.B4, {color:colors.Gray10}]}>삭제하기</Text>
  //           </Pressable>}
  //           {item.writerId !== userId &&
  //           <Pressable 
  //             onPress={() => {navigation.navigate("ReportPage", {targetId: item.writerId}); setNoticeMenuVisible(!noticeMenuVisible)}}
  //             style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
  //           >
  //             <Text style={[textStyles.B4, {color:colors.Gray10}]}>신고하기</Text>
  //           </Pressable>}
  //           {item.writerId !== userId &&
  //           <Pressable 
  //             onPress={() => {setType('block'); setTargetId(item.writerId); setConfirmModalVisible(!confirmModalVisible); setNoticeMenuVisible(!noticeMenuVisible)}}
  //             style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
  //           >
  //             <Text style={[textStyles.B4, {color:colors.Gray10}]}>차단하기</Text>
  //           </Pressable>}
  //         </View>
  //       }
  //       <View style={{flexDirection:'row'}}>
  //         <View style={{flex:1}}>
  //           <View style={{flexDirection:'row'}}>
  //             <Text style={[textStyles.B3, {color:colors.red}]}>[공지]</Text>
  //             <View style={{width:8}}/>
  //             <Text style={[textStyles.C4, {color:colors.Gray10}]}>{item.content}</Text>
  //           </View>
  //           <Text style={[textStyles.B4, {color:colors.Gray06}]}>{item.createdAt}</Text>
  //         </View>
  //         <View>
  //           <TouchableOpacity 
  //             onPress={() => {setNoticeMenuVisible(!noticeMenuVisible)}}
  //             style={{padding:6, paddingTop:0, marginRight:-6}}  
  //           >
  //             <KebabMenuIcon width={20} height={20} color={colors.Gray04}/>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   )
  // }

  return (
    <View>
      <View style={{height:8}}/>
      <Text style={[textStyles.B4, {color: colors.Gray04, marginHorizontal:24}]}>* 커뮤니티 이용 규칙에 벗어나는 게시글은 사전 고지 없이 삭제될 수 있으며, 서비스 이용이 일정 기간 제한될 수 있어요.</Text>
      <View style={{height:8}}/>
      {notice && <NoticeItem item={notice} confirmModalVisible={confirmModalVisible} setConfirmModalVisible={setConfirmModalVisible} setTargetId={setTargetId} setType={setType}/>}
      <View style={{height:8}}/>
      <Text style={[textStyles.H5, {marginLeft:24, color: colors.Blue}]}>{meetMessageList.length}개</Text>
      <View style={{height:8}}/>
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
      />
    </View>
  );
};

export default MeetChatBoard;
