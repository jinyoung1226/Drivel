import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {launchImageLibrary} from 'react-native-image-picker';
import {formDataApi} from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getMyProfileInfo } from '../../features/profile/profileActions';

const ProfileImageModal = ({setModalVisible, modalVisible}) => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const changeProfileImageDefault = async() => {
    try {
      const response = await formDataApi.post('/profile/image');
      if (response.status == 200) {
        console.log(response.status);
        dispatch(getMyProfileInfo());
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getPhoto = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo', });
      if (result.didCancel) {
        return;
      }
      navigation.navigate('SelectedProfileImage', {photo: result.assets[0]});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Modal 
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{flex:1, backgroundColor:'#00000070'}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>{setModalVisible(!modalVisible)}} />
          <View style={{flexDirection:'row'}} >
          <TouchableOpacity style={{width:32}} onPress={()=>{setModalVisible(!modalVisible)}} />
            <View style={{flex:1, backgroundColor: colors.BG, borderRadius:10, padding:16}}>
              <Text style={[textStyles.H3, {color:colors.Gray10}]}>프로필 사진 설정</Text>
              <View style={{height:16}}/>
              <TouchableOpacity
                onPress={()=> {getPhoto(); setModalVisible(!modalVisible);}}  
              >
                <Text style={[textStyles.B3, {color:colors.Gray08}]}>앨범에서 사진 선택</Text>
              </TouchableOpacity>
              <View style={{height:16}}/>
              <TouchableOpacity
                onPress={()=> {changeProfileImageDefault(); setModalVisible(!modalVisible);}}  
              >
                <Text style={[textStyles.B3, {color:colors.Gray08}]}>기본 이미지 적용</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{width:32}} onPress={()=>{setModalVisible(!modalVisible)}} />
          </View>
        <TouchableOpacity style={{flex:1}} onPress={()=>{setModalVisible(!modalVisible)}} />
      </View>
    </Modal>
  );
};

export default ProfileImageModal;