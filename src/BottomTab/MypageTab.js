import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageMain from '../Screens/Mypage/MypageMain';

const Stack = createStackNavigator();

const MypageTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mypage" component={MyPageMain} />
    </Stack.Navigator>
  );
};

export default MypageTab;