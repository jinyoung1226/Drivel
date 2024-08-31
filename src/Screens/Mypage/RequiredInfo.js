import React, {useState, useLayoutEffect} from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable, KeyboardAvoidingView } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import InputTextMessage from "../../components/InputTextMessage";
import BackIcon from "../../assets/icons/BackIcon";
import { authApi } from "../../api/api";
import { useDispatch } from "react-redux";
import { getMyProfileInfo } from "../../features/profile/profileActions";
import { InputAccessoryView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const RequiredInfo = ({navigation}) => {

  const [gender, setGender] = useState(null);
  const [birth, setBirth] = useState('');
  const dispatch = useDispatch(); 
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '필수 정보 설정',
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

  const isValidBirth =(birth)=> {
    const birthRegEx = 
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
    return birthRegEx.test(birth);
    }
 
    const setRequiredInfo = async() => {
      const brithWithHyphen = birth.slice(0,4) + '-' + birth.slice(4,6) + '-' + birth.slice(6,8);
      try {
        const response = await authApi.patch('profile/gender', {
          gender: gender,
          birth: brithWithHyphen,
        });
        if (response.status == 200) {
          console.log(response.data)
          dispatch(getMyProfileInfo());
          navigation.navigate('MyInfoDetail', {originPage: 'RequiredInfo'});
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log('서버 접속 오류');
        }
      }
    }

      return (
    <View style={{flex:1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={true}
        contentInsetAdjustmentBehavior='never'>
        <View style={{padding:16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            {"본격적인 정보 설정 전,\n기본 정보를 입력해주세요"}
          </Text>
          <View style={{height:32}}/>
          <Text style={[textStyles.H5, {color: colors.Gray10}]}>
            성별
            <Text style={{color: colors.Blue}}>{" *"}</Text>
          </Text>
          <View style={{height:16}}/>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setGender(2)}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderColor: gender == 2 ? colors.Blue : colors.Gray04,
                  borderWidth: 1,
                  backgroundColor: gender == 2 ? colors.Blue : null,
                }}
              />
              <View style={{width: 8}} />
              <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                여자
              </Text>
            </TouchableOpacity>
            <View style={{width: 16}} />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setGender(1)}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderColor: gender == 1 ? colors.Blue : colors.Gray04,
                  borderWidth: 1,
                  backgroundColor: gender == 1 ? colors.Blue : null,
                }}
              />
              <View style={{width: 8}} />
              <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                남자
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height:32}}/>
          <Text style={[textStyles.H5, {color: colors.Gray10}]}>
            생년월일
            <Text style={{color: colors.Blue}}>{" *"}</Text>
          </Text>
          <View style={{height:8}}/>
          <Text style={[textStyles.B4, {color: colors.Gray05}]}>
            수정이 불가하니 정확히 입력해주세요
          </Text>
          <View style={{height: 16}} />
          <CustomInput 
            placeholder={'생년월일 8자리 (YYYYMMDD)'}
            value={birth}
            onChangeText={setBirth}
          />
          <InputTextMessage
            validMessage={''}
            errorMessage={'유효한 생년월일을 입력해주세요'}
            isValid={birth.length == 0 || isValidBirth(birth)}
          />
        </View>
      </KeyboardAwareScrollView>
      {Platform.OS == 'ios' ? 
        (<InputAccessoryView>
          <View style={{backgroundColor:colors.BG, padding:16}}>
            <CustomButton title={'완료하기'} disabled={gender == null || !isValidBirth(birth)} onPress={() => {setRequiredInfo()}}/>
          </View>
        </InputAccessoryView>
        ) : (
          <View style={{backgroundColor:colors.BG, padding:16}}>
            <CustomButton title={'완료하기'} disabled={gender == null || !isValidBirth(birth)} onPress={() => {setRequiredInfo()}}/>
          </View>
        )
      }
    </View>
  );

}

export default RequiredInfo;