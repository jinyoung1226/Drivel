import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInputComponent,
  ScrollView,
} from 'react-native';
import {api} from '../../api/api';
import CustomInput from '../../components/CustomInput';
import LoadingModal from '../../components/LoadingModal';
import Eye from '../../assets/icons/EyeIcon.svg';
import {textStyles} from '../../styles/textStyles';
import InputTextMessage from '../../components/InputTextMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/CustomButton';
import colors from '../../styles/colors';
const Register = ({navigation}) => {
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

  const isEmailValid = email => {
    if (email.length > 0) {
      const emailRegEx =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return emailRegEx.test(email);
    }
    return true;
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

  const signUp = async () => {
    try {
      const response = await api.post('/auth/signUp', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        Alert.alert('signup Complete');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        Alert.alert(error.response.data.message);
      }
    }
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
  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView style={{padding: 16}}>
        <Text style={[textStyles.H4, {paddingBottom: 8, color: colors.Gray10}]}>
          이메일 주소
        </Text>
        <LoadingModal modalVisible={isSending} />
        <CustomInput
          placeholder="ex) drivel@gmail.com"
          value={email}
          onChangeText={setEmail}
          showButton={true}
          onButtonPress={() => {
            requestAuthCode();
          }}
          buttonText={authRequestText}
          editable={!isSending && !isAuthorized}
          buttonDisabled={isSending || isAuthorized || !isValidEmail}
        />
        <InputTextMessage
          errorMessage={'이메일 주소가 올바르지 않습니다'}
          isValid={isValidEmail}
        />
        {isSended && !isAuthorized && (
          <View>
            <Text
              style={[textStyles.H4, textStyles.Gray10, {paddingVertical: 8}]}>
              인증번호
            </Text>
            <CustomInput
              placeholder="인증번호를 입력하세요"
              value={authCode}
              onChangeText={setAuthCode}
              showButton={true}
              onButtonPress={() => {
                verifyAuthCode();
              }}
              buttonText={'확인'}
              editable={isSended && !isAuthorizing && !isAuthorized}
              buttonDisabled={isAuthorizing || isAuthorized}
              showTimer={true}
              timerText={formatTime(timer)}
            />
            <View style={{height: 20}} />
          </View>
        )}
        <Text style={[textStyles.H4, textStyles.Gray10, {paddingVertical: 8}]}>
          비밀번호
        </Text>
        <CustomInput
          placeholder="영문 + 숫자 조합의 8~15자"
          value={password}
          onChangeText={setPassword}
          showButton={true}
          isButtonText={false}
          buttonIcon={<Eye color={isSecurePassword ? '#C5C5C6' : '#4A4A4A'} />}
          onButtonPress={() => {
            setIsSecurePassword(!isSecurePassword);
          }}
          secureTextEntry={isSecurePassword}
        />
        <InputTextMessage
          validMessage={' '}
          errorMessage={'비밀번호 형식이 올바르지 않습니다'}
          isValid={isValidPassword}
        />
        <Text style={[textStyles.H4, textStyles.Gray10, {paddingVertical: 8}]}>
          비밀번호 확인
        </Text>
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
        <InputTextMessage
          validMessage={' '}
          errorMessage={'비밀번호가 일치하지 않습니다'}
          isValid={isPasswordSame}
        />
        <View style={{height: 8}} />
        <CustomButton
          disabled={
            password == 0 ||
            passwordCheck == 0 ||
            !isValidPassword ||
            !isPasswordSame ||
            !isAuthorized
          }
          onPress={signUp}
          title={'회원가입'}
        />
        <View style={{height: 30}} />
      </KeyboardAwareScrollView>
    </View>
  );
};
export default Register;
