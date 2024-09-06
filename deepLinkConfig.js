import { Linking } from 'react-native';

export const linking = {
  prefixes: ['drivel://'],
  config: {
    screens: {
      MeetTab: {
        screens: {
          MeetMain: 'meet',
          MeetApplyDetail: 'meet/applyDetail',
        },
      },
    },
  },
  config: {
    screens: {
      DriveTab: {
        screens: {
          DriveMain: 'drive',
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};