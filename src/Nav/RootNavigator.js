import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {checkAuth} from '../features/auth/authActions';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../SplashScreen';
import OnboardingPage from './OnboardNavigator';

const RootNavigator = () => {
  const {isAuthenticated, onboarded, isLoading} = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isAuthenticated && !onboarded) {
    return <OnboardingPage />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
