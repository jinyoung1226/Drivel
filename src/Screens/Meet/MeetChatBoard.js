import React, {useState} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MeetChatMessage from "./MeetChatMessage";
const MeetChatBoard = () => {
  const [message, setMessage] = useState('');
  const data = [
    {nickname:'aaa', message:'안녕하세요', sendAt:'2024-08-05', notice: true}, 
    {nickname:'bbb', message:'안녕하세요', sendAt:'2024-08-05', notice: false}, 
    {nickname:'ccc', message:'안녕하세요', sendAt:'2024-08-05', notice: false}, 
    {nickname:'ddd', message:'안녕하세요', sendAt:'2024-08-05', notice: false}
  ]
  return (
    <View>
      <View style={{padding:16}}>
        <Text style={[textStyles.H5, {marginLeft:8, color: colors.Blue}]}>{}개</Text>
        <View style={{height:16}}/>
        <CustomInput 
          placeholder={"메시지를 입력해주세요"}
          containerStyle={{backgroundColor: colors.Gray01, height:50}}
          value={message}
          onChangeText={setMessage}
          showButton={true}
          buttonIcon={<Text style={[textStyles.B3, {color: colors.Gray06}]}>등록</Text>}  
        />
      </View>
      <Text style={[textStyles.B4, {color: colors.Gray04, marginHorizontal:32}]}>* 커뮤니티 이용 규칙에 벗어나는 게시글은 사전 고지 없이 삭제될 수 있으며, 서비스 이용이 일정 기간 제한될 수 있어요.</Text>
      <View>
        {data.map((item, index) => (
          <MeetChatMessage item={item} key={index}/>
        ))}
      </View>
    </View>
  );
};

export default MeetChatBoard;
