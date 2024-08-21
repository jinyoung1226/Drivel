import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import { textStyles } from '../styles/textStyles';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { authApi } from '../api/api';
import refreshMeetList from '../utils/refreshMeetList';
import { useDispatch } from 'react-redux';

const ConfirmModal = ({
  setModalVisible, 
  modalVisible, 
  type, 
  targetId,
  meetingId,
  notcieId,
  setNotice,
  status
}) => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const modalClose = () => {
    setModalVisible(!modalVisible);
  }

  const blockMeet = async() => {
    try {
      const response = await authApi.post('/block/member', {targetMemberId: targetId});
      if(response.status == 200) {
        //차단 성공 로직
        //토스트 모달 띄우기
        refreshMeetList(dispatch);
        modalClose();
        Alert.alert('차단되었습니다.');
        if (status == "JOINED") {
          try {
            const response = await authApi.delete(`/meeting/leave/${meetingId}`);
            if(response.status == 200) {
              navigation.navigate('MeetMain');
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log("서버 접속 오류");
            }
          }
        } else {
          navigation.navigate('MeetMain');
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("서버 접속 오류");
      }
    }
  }

  const deleteMeet = async() => {
    try {
      const response = await authApi.delete(`/meeting/${meetingId}`);
      if(response.status == 200) {
        //나가기 성공 로직
        //토스트 모달 띄우기
        refreshMeetList(dispatch);
        Alert.alert(response.data.message);
        navigation.navigate('MeetMain');
        modalClose();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("서버 접속 오류");
      }
    }
  }

  const leaveMeet = async() => {
    try {
      const response = await authApi.delete(`/meeting/leave/${meetingId}`);
      if(response.status == 200) {
        //나가기 성공 로직
        //토스트 모달 띄우기
        refreshMeetList(dispatch);
        Alert.alert(response.data.message);
        navigation.navigate('MeetMain');
        modalClose();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("서버 접속 오류");
      }
    }
  }

  const deleteNotice = async() => {
    try {
      const response = await authApi.delete(`/meeting/notice/${notcieId}`);
      if(response.status == 200) {
        //나가기 성공 로직
        //토스트 모달 띄우기
        setNotice(null);
        Alert.alert(response.data.message);
        modalClose();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("서버 접속 오류");
      }
    }
  }

  const blockUser = async() => {
    try {
      const response = await authApi.post('/block/member', {targetMemberId: targetId});
      if(response.status == 200) {
        //차단 성공 로직
        //토스트 모달 띄우기
        //챗리스트 리프레쉬
        modalClose();
        Alert.alert('차단되었습니다.');
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("서버 접속 오류");
      }
    }
  }


  return (
    <Modal 
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        modalClose();
      }}
    >
      <View style={{flex:1, backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>{modalClose()}} />
          <View style={{flexDirection:'row'}} >
            <TouchableOpacity style={{width:32}} onPress={()=>{modalClose()}} />
            <View style={{flex:1, backgroundColor: colors.white, borderRadius:10, padding:24}}>
              <Text style={[textStyles.H3, {color:colors.Gray10, textAlign:'center'}]}>{targetId}{meetingId}</Text>
              <Text style={[textStyles.H3, {color:colors.Gray10, textAlign:'center'}]}>
                {
                  type == 'meetBlock' ? '모임 차단하기' : 
                  type == 'delete' ? '모임 삭제하기' : 
                  type == 'leave' ? '모임 나가기':
                  type == 'notice' ? '공지를 삭제하시겠어요?' :
                  type == 'chatDelete' ? '채팅을 삭제하시겠어요?' :
                  type == 'userBlock' && '차단하기'
                }
              </Text>
              <View style={{height:8}}/>
              <Text style={[textStyles.C4, {color:colors.Gray05, textAlign:'center'}]}>
                {
                  type == 'meetBlock' ? '모임장의 모든 게시물이 노출되지 않고\n모임에 참여 중인 경우 모임에서 나가집니다.\n정말로 차단하시겠어요?' : 
                  type == 'delete' ? '모임을 정말로 삭제하시겠어요?' : 
                  type == 'leave' ? '모임에서 나가시겠어요?' :
                  type == 'notice' ? '삭제 시 복구할 수 없어요' :
                  type == 'chatDelete' ? '삭제 시 복구할 수 없어요' :
                  type == 'userBlock' && '작성자의 모든 게시물이 노출되지 않아요.\n정말로 차단하시겠어요?'
                }
              </Text>
              <View style={{height:24}}/>
              <View
                style={{flexDirection:'row'}}
              >
                <View style={{flex:1}}>
                  <CustomButton title={'취소'} onPress={()=>{modalClose()}} style={{backgroundColor: colors.Gray02}} textStyle={{color:colors.Gray07}}/>
                </View>
                <View style={{width:8}}/>
                <View style={{flex:1}}>
                  <CustomButton 
                    title={
                      type == 'meetBlock' ? '차단' : 
                      type == 'delete' ? '삭제' : 
                      type == 'leave' ? '나가기':
                      type == 'notice' ? '삭제' :
                      type == 'chatDelete' ? '삭제' :
                      type == 'userBlock' && '차단' 
                    } 
                    onPress={()=>{
                      if(type == 'meetBlock') {
                        blockMeet();
                      } else if(type == 'delete') {
                        deleteMeet();
                      } else if(type == 'leave') {
                        leaveMeet();
                      } else if(type == 'notice') {
                        deleteNotice();
                      } else if(type == 'chatDelete') {
                        //deleteChat();
                      } else if(type == 'userBlock') {
                        //blockUser();
                      }
                    }} 
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={{width:32}} onPress={()=>{modalClose()}} />
          </View>
        <TouchableOpacity style={{flex:1}} onPress={()=>{modalClose()}} />
      </View>
    </Modal>
  );
};

export default ConfirmModal;