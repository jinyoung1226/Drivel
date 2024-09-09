import { Linking } from 'react-native';

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
          MeetDetail: 'meet/meetDetail/:meetingId/:courseId/:meetingTitle',
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