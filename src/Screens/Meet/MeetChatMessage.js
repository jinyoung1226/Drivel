import React, {useState} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";

const MeetChatMessage = ({item, index}) => {
  return (
  <View style={{ padding:16, borderRadius:14, backgroundColor:colors.Gray01, marginVertical:8, marginHorizontal:16}}>
    <View key={index} style={{flexDirection:'row'}}>
      <View style={{width:44, height:44, borderRadius:22, backgroundColor:colors.Gray06}}/>
      <View style={{width:8}}/>
      <View style={{flex:1}}>
        <Text style={[textStyles.H5, {color:colors.Blue}]}>{item.nickname}</Text>
        <View style={{height:4}}/>
        <Text style={[textStyles.B4, {color:colors.Gray06}]}>{item.sendAt}</Text>
      </View>
    </View>
    <View style={{height:16}}/>
    <View key={index} style={{flexDirection:'row'}}>
      {item.notice && <Text style={[textStyles.B3, {color:colors.red}]}>[공지]</Text>}
      <View style={{width:8}}/>
      <Text style={[textStyles.C4, {color:colors.Gray10}]}>{item.message}</Text>
    </View>
  </View>
  );
}

export default MeetChatMessage;