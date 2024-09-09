import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authApi} from '../api/api';

const MenuModal = ({
  setModalVisible,
  modalVisible,
  confirmModalVisible,
  setConfirmModalVisible,
  setType,
  setTargetId,
  masterId,
  status,
}) => {
  const navigation = useNavigation();

  const userId = useSelector(state => state.auth.userId);

  // console.log('ReportBlockMenuModal', userId);
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
            setModalVisible(!modalVisible);
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <View style={{flex: 1}}>
            {masterId == userId ? (
              <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <Pressable
                  style={({pressed}) => [
                    {
                      padding: 16,
                      backgroundColor: pressed ? colors.Gray02 : colors.white,
                    },
                  ]}
                  onPress={() => {
                    setType('delete');
                    setConfirmModalVisible(!confirmModalVisible);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={[
                      textStyles.H4,
                      {color: colors.red, alignSelf: 'center'},
                    ]}>
                    모임 삭제하기
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <Pressable
                  style={({pressed}) => [
                    {
                      padding: 16,
                      backgroundColor: pressed ? colors.Gray02 : colors.white,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('ReportPage', {targetId: masterId});
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={[
                      textStyles.H4,
                      {color: colors.red, alignSelf: 'center'},
                    ]}>
                    신고하기
                  </Text>
                </Pressable>
                <Pressable
                  style={({pressed}) => [
                    {
                      padding: 16,
                      backgroundColor: pressed ? colors.Gray02 : colors.white,
                    },
                  ]}
                  onPress={() => {
                    setType('meetBlock');
                    setTargetId(masterId);
                    setConfirmModalVisible(!confirmModalVisible);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text
                    style={[
                      textStyles.H4,
                      {color: colors.red, alignSelf: 'center'},
                    ]}>
                    차단하기
                  </Text>
                </Pressable>
                {status == 'JOINED' && (
                  <Pressable
                    style={({pressed}) => [
                      {
                        padding: 16,
                        backgroundColor: pressed ? colors.Gray02 : colors.white,
                      },
                    ]}
                    onPress={() => {
                      setType('leave');
                      setTargetId(masterId);
                      setConfirmModalVisible(!confirmModalVisible);
                      setModalVisible(!modalVisible);
                    }}>
                    <Text
                      style={[
                        textStyles.H4,
                        {color: colors.red, alignSelf: 'center'},
                      ]}>
                      모임 나가기
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
            <View style={{height: 16}} />
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? colors.Gray02 : colors.white,
                  borderRadius: 10,
                  padding: 16,
                },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={[
                  textStyles.H4,
                  {color: colors.Gray10, alignSelf: 'center'},
                ]}>
                취소
              </Text>
            </Pressable>
          </View>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
        <TouchableOpacity
          style={{height: 32}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    </Modal>
  );
};

export default MenuModal;
