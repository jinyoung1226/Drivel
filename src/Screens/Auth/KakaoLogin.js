import React, {useRef, useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector, useDispatch} from 'react-redux';
import config from '../../config/config';
import {kakaoLogin} from '../../features/auth/authActions';
import LoadingModal from '../../components/LoadingModal';
import colors from '../../styles/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const KakaoLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backPress = useCallback(() => {
    if (canGoBack) {
      webviewRef.current.goBack();
      return true; // Prevent default behavior (exit app)
    } else {
      navigation.goBack(); // Go back to the previous screen in the navigation stack
      return true;
    }
  }, [canGoBack, navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPress);
    };
  }, [backPress]);

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  const onMessage = event => {
    console.log(event.nativeEvent, '메시지 이벤트');
    const url = event.nativeEvent.url;
    setCanGoBack(event.nativeEvent.canGoBack);
    if (url.includes(`${config.SERVER_URL}/kakao/callback`)) {
      const code = url.split('code=')[1];
      if (code) {
        setIsLoading(true);
        dispatch(kakaoLogin({code}));
      }
    }
    if (url.includes('error')) {
      setIsLoading(true);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <WebView
          ref={webviewRef}
          style={{flex: 1, width: windowWidth, height: windowHeight}}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?client_id=${config.KAKAO_RESTAPI_KEY}&redirect_uri=${config.SERVER_URL}/kakao/callback&response_type=code`,
          }}
          injectedJavaScript={runFirst}
          onMessage={onMessage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
});

export default KakaoLogin;
