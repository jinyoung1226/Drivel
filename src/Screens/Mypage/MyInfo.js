import React, {useState, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';

InfoEditButton = ({title, onPress}) => {
  return(
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text style={[textStyles.H4, {color:colors.Gray10}]}>{title}</Text>
      <View style={{flex:1}}/>
      <TouchableOpacity 
        style={{backgroundColor:colors.Gray02, borderRadius:100, paddingVertical:8, paddingHorizontal:16}}
        onPress={onPress}
      >
        <Text style={[textStyles.B4, {color:colors.Gray10}]}>수정</Text>
      </TouchableOpacity>
    </View>
  )
}

const DetailInfo = ({title, info}) => {
  return (
    <View>
      <Text style={[textStyles.B4, {color:colors.Gray04}]}>{title}</Text>
      <View style={{height:8}}/>
      {info !== null && <Text style={[textStyles.B3, {color:colors.Gray08}]}>{info}{title === '운전 경력' && info !== null && <Text>년차</Text>}</Text>}
    </View>
  )
}

const MyInfo = ({navigation}) => {

  const item = useSelector(state => state.profile.myProfileInfo);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '내 정보',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Mypage');
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Mypage');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  
  return(
    
      <View style={{padding:16, backgroundColor:colors.BG, flex:1}}>
        <ScrollView>
          <Text style={[textStyles.B4, {color:colors.Blue}]}>* 모임 생성/가입을 원하시는 경우, 하단의 정보를 모두 입력하셔야 합니다</Text>
          <View style={{height:24}}/>
          <InfoEditButton title={'기본 정보'} onPress={()=>{navigation.navigate('MyInfoEdit', {page: '기본 정보 설정'})}}/>
          <View style={{height:16}}/>
          <DetailInfo title={'닉네임'} info={item.nickname} />
          <View style={{height:16}}/>
          <DetailInfo title={'한줄 소개'} info={item.description} />
          <View style={{height:1, backgroundColor:colors.Gray02, marginVertical:12}}/>
          <InfoEditButton title={'운전 정보'} onPress={()=>{navigation.navigate('MyInfoEdit', {page: '운전 정보 설정'})}}/>
          <View style={{height:16}}/>
          <DetailInfo title={'차종'} info={item.carModel} />
          <View style={{height:16}}/>
          <DetailInfo title={'운전 경력'} info={item.carCareer} />
          <View style={{height:1, backgroundColor:colors.Gray02, marginVertical:12}}/>
          <InfoEditButton title={'활동 지역'} onPress={()=>{navigation.navigate('MyInfoEdit', {page: '활동 지역 설정', myRegions: item.regions})}}/>
          <View style={{height:16}}/>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {item.regions.map((item, index) => (
              <View
                key={index}
                style={{
                  alignSelf: 'flex-start',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 24,
                  justifyContent: 'center',
                  marginRight: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor:colors.Gray03,
                }}>
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  {item.displayName}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
  )
}

export default MyInfo;
