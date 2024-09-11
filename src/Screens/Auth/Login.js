import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {textStyles} from '../../styles/textStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import KakaoIcon from '../../assets/icons/KakaoIcon.svg';

import colors from '../../styles/colors';
import PolicyModal from '../../components/PolicyModal';
import SplashScreen from '../../SplashScreen';

const LoginScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState('');

  const handleKakaoLogin = async () => {
    const isKakaoRegitered = await AsyncStorage.getItem('isKakaoRegitered');
    if (isKakaoRegitered === 'true') {
      navigation.navigate('KakaoLogin');
    }
    if (!isKakaoRegitered) {
      setModalVisible(!modalVisible);
      setRegisterType('kakao');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PolicyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        registerType={registerType}
      />
      <View style={{padding: 16, flex: 1}}>
        <View style={{flex: 1}} />
        <SplashScreen />
        <View style={{flex: 1}} />
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
        <View style={{height: 32}} />
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
