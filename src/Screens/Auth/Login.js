import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {textStyles} from '../../styles/textStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import KakaoIcon from '../../assets/icons/KakaoIcon.svg';

import colors from '../../styles/colors';
import PolicyModal from '../../components/PolicyModal';
import SplashScreen from '../../SplashScreen';
import AppleLogin from '../../components/AppleLogin';
import { appleLogin } from '../../features/auth/authActions';
import { jwtDecode } from 'jwt-decode';
import appleAuth, {AppleButton} from '@invertase/react-native-apple-authentication';
import { useDispatch } from 'react-redux';
const LoginScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const dispatch = useDispatch();

  const handleKakaoLogin = async () => {
    navigation.navigate('KakaoLogin');
  };

  const handleSignInApple = async() => {
    const isAppleRegitered = await AsyncStorage.getItem('isAppleRegitered');
    if (isAppleRegitered === 'true' || isAgree) {
      try {
        console.log(isAgree)
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          // Note: it appears putting FULL_NAME first is important, see issue #293
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        const { email, email_verified, is_private_email, sub } = jwtDecode(appleAuthRequestResponse.identityToken);
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        if (email) {
          dispatch(appleLogin({ email: email }));
        }
      } catch (error) {
        if (error.code === appleAuth.Error.CANCELED) {
          console.log('Apple Sign in canceled');
        } else {
          console.error(error);
        }
      }
    }
    if (!isAppleRegitered) {
      setModalVisible(!modalVisible);
      setRegisterType('apple');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PolicyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        registerType={registerType}
        handleSignInApple={handleSignInApple}
        setIsAgree={setIsAgree}
      />
      <View style={{padding: 16, flex: 1}}>
        <View style={{flex: 1}} />
        <SplashScreen />
        <View style={{flex: 1}} />
        {/* <AppleLogin handleSignInApple={handleSignInApple}/> */}  
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            backgroundColor: '#FEE500',
            borderRadius: 6.7,
            padding: 15,
          }}
          onPress={() => handleKakaoLogin()}>
          <View style={{flex: 1}} />
          <KakaoIcon width={20} height={20} />
          <View style={{width: 6.6}} />
          <Text style={[textStyles.H4, {color: 'rgba(0, 0, 0, 0.85)'}]}>
            카카오 로그인
          </Text>
          <View style={{flex: 1}} />
        </TouchableOpacity>
        
        {Platform.OS === 'ios' &&
        <View>
          <View style={{height: 16}} />
          <AppleLogin handleSignInApple={handleSignInApple}/>
        </View>}
        <View style={{height: 16}} />
        <CustomButton
          title="이메일 로그인"
          onPress={() => navigation.navigate('EmailLogin')}
        />
        <View style={{height: 16}} />
      </View>
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
