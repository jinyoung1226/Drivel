import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageMain from '../Screens/Mypage/MypageMain';
import ProfileSetting from '../Screens/Mypage/ProfileSetting';
const Stack = createStackNavigator();

const MypageTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mypage" component={MyPageMain} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
    </Stack.Navigator>
  );
};

export default MypageTab;