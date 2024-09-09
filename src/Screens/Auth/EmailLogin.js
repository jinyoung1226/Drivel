import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import CustomInput from '../../components/CustomInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import KakaoIcon from '../../assets/icons/KakaoIcon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../styles/colors';
import PolicyModal from '../../components/PolicyModal';
import BackIcon from '../../assets/icons/BackIcon';

const EmailLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.auth); //selector를 통해 authSlice에서 error상태를 가져옴

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '이메일 로그인',
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

  const handleLogin = () => {
    dispatch(login({email, password}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <PolicyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        registerType={registerType}
      />
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <View style={{height: 32}} />
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
          <CustomButton
            title="로그인"
            onPress={() => handleLogin()}
            disabled={isLoading}
          />
          <View style={{height: 32}} />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={[textStyles.H5, {color: colors.Gray06}]}>
              아직 회원이 아니신가요?
            </Text>
            <View style={{width: 8}} />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setRegisterType('email');
              }}>
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

export default EmailLogin;
