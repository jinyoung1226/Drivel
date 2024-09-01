import {Text} from 'react-native-elements';
import WebView from 'react-native-webview';
import {kakaoNavi} from '../../components/KakaoNaviHtml';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';
import {useLayoutEffect} from 'react';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const DriveKakaoNaviWebview = ({route, navigation}) => {
  const {name0, name1, name2, name3, x0, x1, x2, x3, y0, y1, y2, y3} =
    route.params; // 전달된 파라미터를 가져옴

  const htmlContent = kakaoNavi({
    name0,
    name1,
    name2,
    name3,
    x0,
    x1,
    x2,
    x3,
    y0,
    y1,
    y2,
    y3,
  }); // 파라미터를 사용하여 HTML 생성

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
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
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default DriveKakaoNaviWebview;
