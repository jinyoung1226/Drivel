import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import CustomInput from '../../components/CustomInput';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/CustomButton';
import LoadingModal from '../../components/LoadingModal';
import Eye from '../../assets/icons/EyeIcon.svg';
import InputTextMessage from '../../components/InputTextMessage';
import {api} from '../../api/api';
import BackIcon from '../../assets/icons/BackIcon';

const PasswordReset = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [authRequestText, setAuthRequestText] = useState('인증요청');
  const [isSending, setIsSending] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecurePasswordCheck, setIsSecurePasswordCheck] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [timer, setTimer] = useState(180);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '회원가입',
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

  const isEmailValid = email => {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return emailRegEx.test(email);
  };
  const isPasswordValid = password => {
    if (password.length > 0) {
      const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
      return passwordRegEx.test(password);
    }
    return true;
  };
  const isSamePassword = (password, passwordCheck) => {
    if (passwordCheck.length > 0 && password.length > 0) {
      return password === passwordCheck;
    }
    if (passwordCheck.length == 0) {
      return true;
    }
  };
  useEffect(() => {
    setIsValidEmail(isEmailValid(email));
    setIsValidPassword(isPasswordValid(password));
    setIsPasswordSame(isSamePassword(password, passwordCheck));
  }, [email, password, passwordCheck]);

  useEffect(() => {
    let timerInterval;
    if (isSended && !isAuthorized) {
      timerInterval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            Alert.alert(
              '인증 시간이 초과되었습니다.\n다시 인증번호를 요청해주세요.',
            );
            setIsSended(false);
            setAuthRequestText('인증요청');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isSended, isAuthorized]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const requestAuthCode = async () => {
    setIsSending(true);
    try {
      const response = await api.post('/mail/auth', {email: email});
      if (response.status === 200) {
        Alert.alert(response.data.message);
        setAuthRequestText('재요청');
        setIsSending(false);
        setIsSended(true);
        setTimer(180);
      }
    } catch (error) {
      setIsSending(false);
      if (error.response.status === 400) {
        Alert.alert(error.response.data.message);
      } else {
        Alert.alert('서버접속오류');
      }
    }
  };

  const verifyAuthCode = async () => {
    setIsAuthorizing(true);
    try {
      const response = await api.post('/mail/check', {
        email: email,
        code: authCode,
      });
      if (response.status === 200) {
        Alert.alert(response.data.message);
        setIsAuthorizing(false);
        setIsAuthorized(true);
        setAuthRequestText('인증완료');
      }
    } catch (error) {
      setIsAuthorizing(false);
      if (error.response) {
        if (error.response.status === 400) {
          console.log(error.response.status, error.response.data);
          Alert.alert(error.response.data.message);
        }
      } else {
        Alert.alert('서버접속오류');
      }
    }
  };

  const passwordReset = async () => {
    try {
      const response = await api.patch('/members/password', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        Alert.alert(response.data.message);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Alert.alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <LoadingModal modalVisible={isSending} />
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            이메일 주소
          </Text>
          <View style={{height: 16}} />
          <CustomInput
            placeholder="ex) drivel@gmail.com"
            value={email}
            onChangeText={setEmail}
            showButton={true}
            buttonIcon={({buttonDisabled}) => (
              <Text
                style={[
                  textStyles.H5,
                  {color: buttonDisabled ? '#C5C5C6' : '#5168F6'},
                ]}>
                {authRequestText}
              </Text>
            )}
            onButtonPress={() => {
              requestAuthCode();
            }}
            editable={!isSending && !isAuthorized}
            buttonDisabled={!(isValidEmail && !isSending && !isAuthorized)}
            keyboardType="email-address"
          />
          <View style={{height: 8}} />
          <InputTextMessage
            errorMessage={'이메일 주소가 올바르지 않습니다'}
            isValid={email.length == 0 || isValidEmail}
          />
          {isSended && !isAuthorized && (
            <View>
              <Text style={[textStyles.H4, {color: colors.Gray10}]}>
                인증번호
              </Text>
              <View style={{height: 16}} />
              <CustomInput
                placeholder="인증번호를 입력하세요"
                value={authCode}
                onChangeText={setAuthCode}
                showButton={true}
                onButtonPress={() => {
                  verifyAuthCode();
                }}
                buttonIcon={({buttonDisabled}) => (
                  <Text
                    style={[
                      textStyles.H5,
                      {color: buttonDisabled ? '#C5C5C6' : '#5168F6'},
                    ]}>
                    확인
                  </Text>
                )}
                editable={isSended && !isAuthorizing && !isAuthorized}
                buttonDisabled={
                  isAuthorizing || isAuthorized || authCode.length == 0
                }
                showTimer={true}
                timerText={formatTime(timer)}
              />
              <View style={{height: 32}} />
            </View>
          )}
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>비밀번호</Text>
          <View style={{height: 16}} />
          <CustomInput
            placeholder="영문 + 숫자 조합의 8~15자"
            value={password}
            onChangeText={setPassword}
            showButton={true}
            isButtonText={false}
            buttonIcon={
              <Eye color={isSecurePassword ? '#C5C5C6' : '#4A4A4A'} />
            }
            onButtonPress={() => {
              setIsSecurePassword(!isSecurePassword);
            }}
            secureTextEntry={isSecurePassword}
          />
          <View style={{height: 8}} />
          <InputTextMessage
            validMessage={' '}
            errorMessage={'비밀번호 형식이 올바르지 않습니다'}
            isValid={isValidPassword}
          />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            비밀번호 확인
          </Text>
          <View style={{height: 16}} />
          <CustomInput
            placeholder="비밀번호를 다시 입력해주세요"
            value={passwordCheck}
            onChangeText={setPasswordCheck}
            showButton={true}
            isButtonText={false}
            buttonIcon={
              <Eye color={isSecurePasswordCheck ? '#C5C5C6' : '#4A4A4A'} />
            }
            onButtonPress={() => {
              setIsSecurePasswordCheck(!isSecurePasswordCheck);
            }}
            secureTextEntry={isSecurePasswordCheck}
          />
          <View style={{height: 8}} />
          <InputTextMessage
            validMessage={' '}
            errorMessage={'비밀번호가 일치하지 않습니다'}
            isValid={{}}
          />
          <CustomButton
            disabled={
              password == 0 ||
              passwordCheck == 0 ||
              !isValidPassword ||
              !isPasswordSame ||
              !isAuthorized
            }
            onPress={() => passwordReset()}
            title={'비밀번호 재설정'}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PasswordReset;
