import React, {useLayoutEffect} from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const MagazineInfo = ({route}) => {
  const navigation = useNavigation();
  const body = route.params.body;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerBackground: () => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <WebView source={{uri: body}} />
    </View>
  );
};

export default MagazineInfo;
