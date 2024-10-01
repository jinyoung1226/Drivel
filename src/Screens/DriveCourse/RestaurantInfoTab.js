import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {fetchReataurantRoute} from '../../utils/fetchRoute';

const RestaurantInfoTab = ({item, minHeight, setScrollEnabled}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const center = {
    lat: item.latitude,
    lng: item.longitude,
  };

  useEffect(() => {
    fetchReataurantRoute(setHtmlContent, center);
  }, []);

  return (
    <View style={{minHeight: minHeight}}>
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
        }}>
        <View>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>전화번호</Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray09}]}>
            {item.phoneNumber}
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>주소</Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray09}]}>
            {item.address}
          </Text>
        </View>
        <View style={{marginTop: 16, height: 200, width: '100%', padding: 0}}>
          <WebView
            originWhitelist={['*']}
            source={{html: htmlContent}}
            style={{flex: 1, borderRadius: 4}}
            onTouchCancel={() => setScrollEnabled(true)}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />
        </View>
      </View>
    </View>
  );
};

export default RestaurantInfoTab;
