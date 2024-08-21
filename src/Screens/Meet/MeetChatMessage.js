import React, {useState} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import KebabMenuIcon from "../../assets/icons/KebabMenuIcon";
import { useNavigation } from "@react-navigation/native";

const MeetChatMessage = ({item, selectedChatItem, setSelectedChatItem, userId, setType, setTargetId, setConfirmModalVisible, confirmModalVisible}) => {
  const isVisible = selectedChatItem === item.id;
  const navigation = useNavigation();
  return (
    <View style={{ padding:16, borderRadius:14, backgroundColor:colors.Gray01, marginVertical:8, marginHorizontal:16}}>
      {isVisible && item.id == selectedChatItem &&
        <View style={{position:'absolute', right:16, top:44}}>
          {item.senderId == userId &&
          <Pressable 
            onPress={() => {setType('chatDelete'); setConfirmModalVisible(!confirmModalVisible); setSelectedChatItem(null)}}
            style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
          >
            <Text style={[textStyles.B4, {color:colors.Gray10}]}>삭제하기</Text>
          </Pressable>}
          {item.senderId !== userId &&
          <Pressable 
            onPress={() => {navigation.navigate("ReportPage", {targetId: item.senderId}); setSelectedChatItem(null)}}
            style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
          >
            <Text style={[textStyles.B4, {color:colors.Gray10}]}>신고하기</Text>
          </Pressable>}
          {item.senderId !== userId &&
          <Pressable 
            onPress={() => {setType('userBlock'); setTargetId(item.senderId); setConfirmModalVisible(!confirmModalVisible); setSelectedChatItem(null)}}
            style={({pressed})=> [{paddingHorizontal:16, paddingVertical:8, backgroundColor: pressed ? colors.Gray02: colors.white}]}
          >
            <Text style={[textStyles.B4, {color:colors.Gray10}]}>차단하기</Text>
          </Pressable>}
        </View>
      }
      <View style={{flexDirection:'row'}}>
        <View style={{width:44, height:44, borderRadius:22, backgroundColor:colors.Gray06}}/>
        <View style={{width:8}}/>
        <View style={{flex:1}}>
          <Text style={[textStyles.H5, {color:colors.Blue}]}>{item.nickname}</Text>
          <View style={{height:4}}/>
          <Text style={[textStyles.B4, {color:colors.Gray06}]}>{item.sendAt}</Text>
        </View>
        <View>
          <TouchableOpacity 
            onPress={() => {
              if (selectedChatItem === item.id) {
                setSelectedChatItem(null); // 메뉴 닫기
              } else {
                setSelectedChatItem(item.id); // 해당 항목의 메뉴 열기
              }
            }}
            style={{padding:6, paddingTop:0, marginRight:-6}}  
          >
            <KebabMenuIcon width={20} height={20} color={colors.Gray04}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height:16}}/>
      <View style={{flexDirection:'row'}}>
        <View style={{width:8}}/>
        <Text style={[textStyles.C4, {color:colors.Gray10}]}>{item.message}</Text>
      </View>
    </View>
  );
}

export default MeetChatMessage;