import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import CustomButton from '../../components/CustomButton';
import GrayLine from '../../components/GrayLine';
const SetTitle = ({title}) => {
  return (
    <Text style={[textStyles.H5, {color:colors.Gray06, paddingHorizontal:24, paddingVertical:16}]}>
      {title}
    </Text>
  )
}
const SettingListItem = ({title, onPress}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{height:51, justifyContent:'center', paddingHorizontal:24}}>
      <Text style={[textStyles.B2, {color:colors.Gray10}]}>{title}</Text>
    </TouchableOpacity>
  ) 
}
const useInfoTitle = ['1:1 문의', '도움말', '공지사항']
const policyTitle = ['서비스 이용약관', '개인정보 처리방침', '커뮤니티 이용규칙']

const Setting = ({navigation, route}) => {
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경설정',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return(
    
      <View style={{backgroundColor:colors.BG, flex:1}}>
        <ScrollView>
          <SetTitle title="이용 안내"/>
          {useInfoTitle.map((title, index) => (
            <SettingListItem title={title} key={index}/>
          ))}
          <GrayLine/>
          <SetTitle title="약관 및 정책"/>
          {policyTitle.map((title, index) => (
            <SettingListItem title={title} key={index}/>
          ))}
          <GrayLine/>
          <SetTitle title="계정"/>
          <SettingListItem title="로그아웃" onPress={handleLogout}/>
        </ScrollView>
      </View>
  )
}

export default Setting;