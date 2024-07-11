import React from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {WebView} from 'react-native-webview';
import config from '../../config/config';
import {categoryHtml} from '../../components/kakaoMapHtmlGenerators';
import {useEffect} from 'react';
import {useState} from 'react';

const DriveTourSpot = ({item}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const center = {
    lat: item.waypoints[0].latitude,
    lng: item.waypoints[0].longitude,
  };

  useEffect(() => {
    return setHtmlContent(categoryHtml(center, config.KAKAO_JAVASCRIPT_KEY));
  }, []);

  return (
    <View>
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
          flex: 1,
        }}>
        <View>
          <Text style={[textStyles.H4]}>편의 시설</Text>
        </View>
        <View
          style={{marginTop: 16, width: '100%', aspectRatio: 1, padding: 0}}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            style={{flex: 1, borderRadius: 4}}
          />
        </View>
      </View>
    </View>
  );
};

export default DriveTourSpot;
