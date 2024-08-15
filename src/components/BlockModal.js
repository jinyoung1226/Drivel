import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../styles/colors';
import { textStyles } from '../styles/textStyles';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { authApi } from '../api/api';

const BlockModal = ({setModalVisible, modalVisible, targetId, setTargetId}) => {
  
  const navigation = useNavigation();
  
  const modalClose = () => {
    setModalVisible(!modalVisible);
    setTargetId('');
  }

  const blockUser = async() => {
    try {
      const response = await authApi.post('/profile/block', {targetId: targetId});
      if(response.status == 200) {
        //차단 성공 로직
        //토스트 모달 띄우기
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
              <Text style={[textStyles.H3, {color:colors.Gray10, textAlign:'center'}]}>차단하기{targetId}</Text>
              <View style={{height:8}}/>
              <Text style={[textStyles.C4, {color:colors.Gray05, textAlign:'center'}]}>{'이 작성자의 모든 게시물이 노출되지 않아요.\n정말로 차단하시겠어요?'}</Text>
              <View style={{height:24}}/>
              <View
                style={{flexDirection:'row'}}
              >
                <View style={{flex:1}}>
                  <CustomButton title={'취소'} onPress={()=>{modalClose()}} style={{backgroundColor: colors.Gray02}} textStyle={{color:colors.Gray07}}/>
                </View>
                <View style={{width:8}}/>
                <View style={{flex:1}}>
                  <CustomButton title={'차단'} onPress={()=>{blockUser()}} />
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

export default BlockModal;