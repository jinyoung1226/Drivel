import React, {useEffect, useLayoutEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert, Platform } from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import XIcon from "../../assets/icons/XIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import {carModelData} from '../../assets/driveCourseData/carModelData';
import koFilter from '../../utils/koFilter';
import { regions } from "../../assets/onboardingData/onBoardingData";
import ChipContainer from "../../components/ChipContainer";
import { authApi } from "../../api/api";
import { getMyProfileInfo } from "../../features/profile/profileActions";
import { setGlobalNickname } from "../../features/auth/authSlice";

import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const MyInfoEdit = ({navigation, route}) => {
  const page = route.params.page;
  const myRegions = route.params.myRegions;
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [intro, setIntro] = useState('');
  const [carModel, setCarModel] = useState('');
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [minCarCareer, setMinCarCareer] = useState('');
  const [selectedRegion, setSelectedRegion] = useState([]);
  
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: page,
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


  const handleSearchCarModel = e => {
    setCarModel(e);
    setFilteredCarData(koFilter(carModelData, e));
  };

  const selectCarModel = item => {
    setCarModel(item.title);
    setFilteredCarData([]);
  };

  const handlePressButton = async() => {
    if (page == '기본 정보 설정') {
      console.log(nickname, intro);
      if (!isNicknameValid && nickname != '') {
        Alert.alert('닉네임 중복 확인을 해주세요');
        return;
      }
      try {
        const response = await authApi.patch('profile/nickname', {
          nickname: nickname == '' ? null : nickname,
          description: intro == '' ? null : intro
        });
        if (response.status == 200) {
          // if (nickname != '') {
          //   dispatch(setGlobalNickname(nickname))
          // }
          console.log(response.data);
          dispatch(getMyProfileInfo());
          

          navigation.goBack()
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(error.response.data.message);
        } else {
          console.log('서버 접속 오류');
        }
      }
    } else if (page == '운전 정보 설정') {
      console.log('@@@');
      try {
        const response = await authApi.patch('profile/car', {
          carModel: carModel == '' ? null : carModel,
          carCareer: minCarCareer == '' ? null : minCarCareer
        });
        console.log('@@@');
        if (response.status == 200) {
          console.log(response.data);
          dispatch(getMyProfileInfo());
          navigation.goBack()
        }
      } catch (error) {
        if (error.response) {
          Alert.alert(error.response.data.message);
          console.log(error.response.data);
        } else {
          console.log('서버 접속 오류');
        }
      }
    } else if (page == '활동 지역 설정') {
      console.log(selectedRegion);
      try {
        const response = await authApi.patch('profile/region', {
          regionIds: selectedRegion
        });
        if (response.status == 200) {
          console.log(response.data);
          dispatch(getMyProfileInfo());
          navigation.goBack()
        }
      } catch (error) {
        if (error.response) {
          Alert.alert(error.response.data.message);
          console.log(error.response.data);
        } else {
          console.log('서버 접속 오류');
        }
      }
    }
  }

  const checkNickname = async() => {
    try {
      const response = await authApi.get(`members/check-nickname/${nickname}`);
      if (response.status == 200) {
        console.log(response.data);
        Alert.alert(response.data.message)
        setIsNicknameValid(!isNicknameValid)
      };
    } catch (error) {
      if (error.response) {
        Alert.alert(error.response.data.message)
        console.log(error.response.data);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  useEffect(() => {
    console.log(nickname, intro);
    if (page == '활동 지역 설정') {
      setSelectedRegion(myRegions.map((e)=>e.id));
    }
  }, [nickname, intro]);


  return (
    <View style={{backgroundColor:colors.BG, flex:1}}>
    <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={true}
        contentInsetAdjustmentBehavior='never'>
      <View style={{padding:16}}>
        {page == '기본 정보 설정' &&
          <View>
            <Text style={[textStyles.H5, {color:colors.Gray10}]}>닉네임</Text>
            <View style={{height:16}}/>
            <View style={{flexDirection:'row'}}>
              <CustomInput 
              value={nickname}
              onChangeText={setNickname}
              placeholder={'최대 10자까지 입력 가능합니다'}
              containerStyle={{flex:1}}
              maxLength={10}
              editable={!isNicknameValid}
              />
              <View style={{width:16}}/>
              <TouchableOpacity 
                style={{
                  height:47, 
                  paddingHorizontal:16, 
                  justifyContent:'center', 
                  borderWidth:1, 
                  borderRadius:10, 
                  borderColor: colors.Blue, 
                  backgroundColor: isNicknameValid ? colors.Blue : undefined
                }}
                disabled={isNicknameValid}
                onPress={()=>{checkNickname()}}
                >
                <Text style={[textStyles.H5, {color:isNicknameValid ? colors.Light_Blue : colors.Blue}]}>{isNicknameValid ? "확인 완료": "중복 확인"}</Text>
              </TouchableOpacity>
            </View>
            <View style={{height:32}}/>
            <Text style={[textStyles.H5, {color:colors.Gray10}]}>한줄 소개</Text>
            <View style={{height:16}}/>
            <CustomInput 
              value={intro} 
              onChangeText={setIntro} 
              placeholder={'최대 30자까지 입력 가능합니다'} 
              maxLength={30} 
              multiline={true}/>
          </View>
        }
        {page == '운전 정보 설정' &&
          <View>
            <Text style={[textStyles.H5, {color:colors.Gray10}]}>차종</Text>
            <View style={{height:16}}/>
            <View>
              <CustomInput
                showButton={true}
                isButtonText={false}
                buttonIcon={
                  carModel.length > 0 ? (
                    <XIcon />
                  ) : (
                    <SearchIcon color={colors.Gray04} />
                  )
                }
                onButtonPress={() => setCarModel('')}
                placeholder="차종을 입력해주세요"
                value={carModel}
                onChangeText={handleSearchCarModel}
                buttonDisabled={carModel.length === 0}
              />
              {filteredCarData.length !== 0 && carModel.length !== 0 && (
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.Gray03,
                    flexGrow: 0,
                    marginTop: 8,
                    paddingVertical: 4,
                  }}>
                  {filteredCarData.map(item => (
                    <Pressable
                      style={({pressed}) => [
                        {
                          padding: 8,
                          marginHorizontal: 8,
                          marginVertical: 4,
                          backgroundColor: pressed ? colors.Light_Blue : null,
                          borderRadius: 5,
                        },
                      ]}
                      key={item.title}
                      onPress={() => selectCarModel(item)}>
                      {({pressed}) => (
                        <Text
                          style={[
                            textStyles.B4,
                            {color: pressed ? colors.Blue : colors.Gray10},
                          ]}>
                          {item.title}
                        </Text>
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View style={{height:32}}/>
            <Text style={[textStyles.H5, {color:colors.Gray10}]}>운전 경력</Text>
            <View style={{height:16}}/>
            <CustomInput
              placeholder="0"
              value={minCarCareer}
              onChangeText={setMinCarCareer}
              showButton={true}
              buttonIcon={
                <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                  년차
                </Text>
              }
              buttonDisabled={true}
              maxLength={2}
              keyboardType="number-pad"
            />
          </View>
        }
        {page == '활동 지역 설정' &&
        <View>
          <Text style={[textStyles.H5, {color:colors.Gray10}]}>활동 지역 선택</Text>
          <View style={{height:8}}/>
          <Text style={[textStyles.M14, {color: colors.Gray06}]}>
            최대 3개 선택 가능해요
          </Text>
          <View style={{height:16}}/>
          <ChipContainer
            maxSelection={3}
            containerStyle={{flexDirection: 'row', width: '70%'}}
            type={'multi'}
            data={regions}
            selectedItem={selectedRegion}
            onSelectedHandler={items => setSelectedRegion(items)}
          />
        </View>}
      </View>
      <View style={{height:16}}/>
      <View style={{padding:16, backgroundColor:colors.BG}}>
        <CustomButton title={'완료하기'} onPress={()=>{handlePressButton()}}/>
      </View>
    </KeyboardAwareScrollView>
    </View>
  )
}

export default MyInfoEdit;