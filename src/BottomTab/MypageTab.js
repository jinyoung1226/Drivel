import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyPageMain from '../Screens/Mypage/MypageMain';
import MyInfo from '../Screens/Mypage/MyInfo';
import MyScrap from '../Screens/Mypage/MyScrap';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import SelectedProfileImage from '../Screens/Mypage/SelectedProfileImage';
import MyDriveTagEdit from '../Screens/Mypage/MyDriveTagEdit';
import MyReview from '../Screens/Mypage/MyReview';
import MyInfoEdit from '../Screens/Mypage/MyInfoEdit';
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
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="MyScrap" component={MyScrap} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="SelectedProfileImage" component={SelectedProfileImage} />
      <Stack.Screen name="MyDriveTagEdit" component={MyDriveTagEdit} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyInfoEdit" component={MyInfoEdit} />
    </Stack.Navigator>
  );
};

export default MypageTab;
