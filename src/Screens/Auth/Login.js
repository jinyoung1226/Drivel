import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import CustomInput from '../../components/CustomInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import KakaoIcon from '../../assets/icons/KakaoIcon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../styles/colors';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error); //selector를 통해 authSlice에서 error상태를 가져옴

  const handleLogin = () => {
    dispatch(login({email, password}));
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <View style={{height: 64}} />
          <Text style={[textStyles.H1, {fontSize: 30, color: colors.Blue}]}>
            Drivel과 함께{'\n'}달릴 준비 되셨나요?
          </Text>
          <View style={{height: 64}} />
          <CustomInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={{height: 16}} />
          <CustomInput
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={{height: 8}} />
          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordReset')}>
            <Text
              style={[
                textStyles.H5,
                {alignSelf: 'flex-end', color: colors.Gray05},
              ]}>
              비밀번호 재설정
            </Text>
          </TouchableOpacity>
          <View style={{height: 16}} />
          <CustomButton title="로그인" onPress={handleLogin} />
          <View style={{height: 32}} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 50,
              backgroundColor: '#FEE500',
              borderRadius: 6.7,
              padding: 15,
            }}
            onPress={() => navigation.navigate('KakaoLogin')}>
            <View style={{flex: 1}} />
            <KakaoIcon width={20} height={20} />
            <View style={{width: 6.6}} />
            <Text style={[textStyles.H4, {color: 'rgba(0, 0, 0, 0.85)'}]}>
              카카오 로그인
            </Text>
            <View style={{flex: 1}} />
          </TouchableOpacity>
          <View style={{height: 32}} />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={[textStyles.H5, {color: colors.Gray06}]}>
              아직 회원이 아니신가요?
            </Text>
            <View style={{width: 8}} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={[
                  textStyles.H5,

                  {
                    color: colors.Blue,
                    borderBottomWidth: 1,
                    borderColor: colors.Blue,
                  },
                ]}>
                이메일로 회원가입하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
