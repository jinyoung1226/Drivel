import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import { textStyles } from '../styles/textStyles';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { authApi } from '../api/api';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authActions';

const WithdrawalModal = ({modalVisible, setModalVisible}) => {
  
  const modalClose = () => {
    setModalVisible(!modalVisible);
  }

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleWithdrawal = async() => {
    try {
      const response = await authApi.delete('/members');
      if (response.status == 200) {
        modalClose();
        console.log(response.data)
        dispatch(logout());
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{flex:1, backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>{modalClose()}} />
          <View style={{flexDirection:'row'}} >
            <TouchableOpacity style={{width:32}} onPress={()=>{modalClose()}} />
            <View style={{flex:1, backgroundColor: colors.white, borderRadius:10, padding:24}}>
              <Text style={[textStyles.H3, {color:colors.Gray10, textAlign:'center'}]}>
                {'정말로 탈퇴하시겠어요?'}
              </Text>
              <View style={{height:8}}/>
              <Text style={[textStyles.C4, {color:colors.Gray05, textAlign:'center'}]}>
                {'탈퇴하시면 작성한 모든 게시글이 삭제되고\n복구할 수 없습니다.'}
              </Text>
              <View style={{height:24}}/>
              <View
                style={{flexDirection:'row'}}
              >
                <View style={{flex:1}}>
                  <CustomButton 
                    title={'취소'} 
                    onPress={()=>{modalClose()}}/>
                </View>
                <View style={{width:8}}/>
                <View style={{flex:1}}>
                  <CustomButton 
                    style={{backgroundColor:colors.Gray02}}
                    textStyle={{color:colors.Gray07}}
                    title={'탈퇴'} 
                    onPress={()=>{handleWithdrawal()}} 
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
}

export default WithdrawalModal;