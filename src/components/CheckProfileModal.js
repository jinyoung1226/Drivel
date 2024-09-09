import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Hand from '../assets/icons/RenderingHand';

const CheckProfileModal = ({modalVisible, setModalVisible}) => {
  const {myProfileInfo} = useSelector(state => state.profile);

  const modalClose = () => {
    setModalVisible(!modalVisible);
  };

  const navigation = useNavigation();

  const goProfileEdit = () => {
    modalClose();
    console.log(myProfileInfo);
    if (myProfileInfo.gender == null) {
      navigation.navigate('RequiredInfo');
    }
    if (myProfileInfo.gender !== null) {
      navigation.navigate('MyInfoDetail', {originPage: 'MeetDetail'});
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            modalClose();
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              modalClose();
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 10,
              padding: 24,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Hand />
            </View>
            <View style={{height: 24}} />
            <Text
              style={[
                textStyles.H3,
                {color: colors.Gray10, textAlign: 'center'},
              ]}>
              {'모임 기능은 프로필 설정 후에\n사용할 수 있어요'}
            </Text>
            <View style={{height: 24}} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <CustomButton
                  title={'다음에 하기'}
                  onPress={() => {
                    modalClose();
                  }}
                  style={{backgroundColor: colors.Gray02}}
                  textStyle={{color: colors.Gray07}}
                />
              </View>
              <View style={{width: 8}} />
              <View style={{flex: 1}}>
                <CustomButton
                  title={'설정하러 가기'}
                  onPress={() => {
                    goProfileEdit();
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              modalClose();
            }}
          />
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            modalClose();
          }}
        />
      </View>
    </Modal>
  );
};

export default CheckProfileModal;
