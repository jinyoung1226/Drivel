import { Linking } from 'react-native';
import MeetMain from './src/Screens/Meet/MeetMain';
import MainNavigator from './src/Nav/MainNavigator';

export const linking = {
  prefixes: ['drivel://'],
  config: {
    screens: {
      initialRouteName : 'MeetTab',
      HomeTab: 'home',
      MeetTab: {
        initialRouteName: 'MeetMain',
        screens: {
          MeetMain: 'meet',
          MeetApplyDetail: 'meet/applyDetail',
        },
      },
      DriveTab: 'drive',
      MypageTab: 'mypage',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};