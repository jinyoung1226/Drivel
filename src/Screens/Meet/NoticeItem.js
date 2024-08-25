import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import colors from '../../styles/colors';
import KebabMenuIcon from '../../assets/icons/KebabMenuIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import formatChatTimestamp from '../../utils/formatChatTimeStamp';
const NoticeItem = ({item, style, setType, setConfirmModalVisible, confirmModalVisible, setTargetId}) => {
  const navigation = useNavigation();
  const {userId} = useSelector(state => state.auth);
  const [noticeMenuVisible, setNoticeMenuVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={[style, {width: windowWidth}]}>
      <View style={{width:windowWidth-32, padding:16, borderRadius:14, backgroundColor:colors.Gray01, marginHorizontal:16}}>
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
            <View style={{flexDirection:'row'}}>
              <Text style={[textStyles.B3, {color:colors.red}]}>[공지]</Text>
              <View style={{width:8}}/>
              <Text style={[textStyles.C4, {color:colors.Gray10}]}>{item.content}</Text>
            </View>
            <View style={{height:4}}/>
            <Text style={[textStyles.B4, {color:colors.Gray06}]}>{formatChatTimestamp(item.createdAt)}</Text>
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
      </View>
    </View>
  )
}

export default NoticeItem;
