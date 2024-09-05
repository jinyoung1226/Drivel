import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {checkAuth} from '../features/auth/authActions';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../SplashScreen';
import OnboardingPage from './OnboardNavigator';
import {connectWebSocket, disconnectWebSocket} from '../features/websocket/websocketActions'; // 웹소켓 액션 가져오기

export const navigationRef = React.createRef();

const RootNavigator = () => {
  const {isAuthenticated, onboarded, isLoading, isAutoLoginLoading} = useSelector(
    state => state.auth,
  );
  const {isConnected} = useSelector(state => state.websocket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(connectWebSocket());  // 인증되면 웹소켓 연결
    }

    return () => {
      if (isAuthenticated) { 
        // isAuthenticated가 true에서 false로 변경될 때, 이전 클린업 함수는 여전히 true를 참조하기 때문에 !isAuthenticated를 사용하면 false 이기 때문에 disconnectWebSocket()이 호출되지 않습니다. 
        // 따라서 로그아웃해서 isAuthenticated가 false로 변경되더라도 클린업 함수는 true를 참조해서 !isAuthenticated가 아닌 isAuthenticated를 사용해야 합니다.
        dispatch(disconnectWebSocket());  // 컴포넌트 언마운트 시 웹소켓 연결 해제
      }
    };
  }, [dispatch, isAuthenticated]);

  if (isAutoLoginLoading) {
    return <SplashScreen />;
  }

  if (isAuthenticated && !onboarded) {
    return <OnboardingPage />;
  }


  return (
      <NavigationContainer ref={navigationRef}>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
};

export default RootNavigator;
