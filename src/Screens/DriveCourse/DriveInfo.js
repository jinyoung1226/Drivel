import React, {useState, useEffect} from 'react';
import GrayLine from '../../components/GrayLine';
import {WebView} from 'react-native-webview';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {fetchRoute} from '../../utils/fetchRoute';

const DriveInfo = ({item}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const center = {
    lat: item.waypoints[0].latitude,
    lng: item.waypoints[0].longitude,
  };

  useEffect(() => {
    fetchRoute(item, setHtmlContent, center);
  }, []);

  return (
    <View>
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
        }}>
        <View>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>코스 정보</Text>
          {item.waypoints.map((waypoint, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                gap: 8,
                paddingTop: 18,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 100,
                  backgroundColor: colors.Light_Blue,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'SUIT-ExtraBold',
                    fontSize: 11.67,
                    color: colors.Blue,
                  }}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                {waypoint.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={{marginTop: 16, height: 200, width: '100%', padding: 0}}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            style={{flex: 1, borderRadius: 4}}
          />
        </View>
      </View>
      <GrayLine />
      <View style={{height: 32}} />
      <View style={{paddingHorizontal: 16}}>
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>지역 정보</Text>
        <View style={{height: 16}} />
        <Text style={[textStyles.H4, {color: colors.Blue}]}>
          {item.regionName}
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.C4, {color: colors.Gray06}]}>
          {item.regionDescription}
        </Text>
        <View style={{height: 40}} />
      </View>
    </View>
  );
};

export default DriveInfo;
