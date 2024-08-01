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
import RequiredInfo from '../Screens/Mypage/RequiredInfo';
import Setting from '../Screens/Mypage/Setting';
import { textStyles } from '../styles/textStyles';
import colors from '../styles/colors';
import GearIcon from '../assets/icons/GearIcon';
import { TouchableOpacity, View } from 'react-native';
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
      <Stack.Screen 
      name="Mypage" 
      component={MyPageMain} 
      options={{ 
        headerTitle:'마이페이지', 
        headerTitleStyle: [
          textStyles.H2, {color: colors.Gray10}
        ], 
        headerRight: () => (
          <TouchableOpacity 
            style={{padding:16}}
            onPress={() => {
              navigation.navigate('Setting');
            }}
          >
            <GearIcon/>
          </TouchableOpacity>
        )}}
      />
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="MyScrap" component={MyScrap} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen name="SelectedProfileImage" component={SelectedProfileImage} />
      <Stack.Screen name="MyDriveTagEdit" component={MyDriveTagEdit} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyInfoEdit" component={MyInfoEdit} />
      <Stack.Screen name="RequiredInfo" component={RequiredInfo} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default MypageTab;
