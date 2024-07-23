import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyPageMain from '../Screens/Mypage/MypageMain';
import ProfileSetting from '../Screens/Mypage/ProfileSetting';
import MyScrap from '../Screens/Mypage/MyScrap';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import SelectedProfileImage from '../Screens/Mypage/SelectedProfileImage';
const Stack = createStackNavigator();

const MypageTab = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Mypage' || routeName === undefined) {
      navigation.setOptions({
        tabBarStyle: {height: Platform.OS === 'ios' ? 93 : 70, display: 'flex'},
      });
    } else {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mypage" component={MyPageMain} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="MyScrap" component={MyScrap} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="SelectedProfileImage" component={SelectedProfileImage} />
    </Stack.Navigator>
  );
};

export default MypageTab;
