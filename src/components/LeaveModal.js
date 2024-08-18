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
import CustomButton from './CustomButton';
import { authApi } from '../api/api';
import { useNavigation } from '@react-navigation/native';
import refreshMeetList from '../utils/refreshMeetList';
import { useDispatch } from 'react-redux';
const LeaveModal = ({setModalVisible, modalVisible, meetingId}) => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const modalClose = () => {
    setModalVisible(!modalVisible);
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
              <Text style={[textStyles.H3, {color:colors.Gray10, textAlign:'center'}]}>모임 나가기</Text>
              <View style={{height:8}}/>
              <Text style={[textStyles.C4, {color:colors.Gray05, textAlign:'center'}]}>{'모임에서 나가시겠어요?'}</Text>
              <View style={{height:24}}/>
              <View
                style={{flexDirection:'row'}}
              >
                <View style={{flex:1}}>
                  <CustomButton title={'취소'} onPress={()=>{modalClose()}} style={{backgroundColor: colors.Gray02}} textStyle={{color:colors.Gray07}}/>
                </View>
                <View style={{width:8}}/>
                <View style={{flex:1}}>
                  <CustomButton title={'나가기'} onPress={()=>{leaveMeet()}} />
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

export default LeaveModal;