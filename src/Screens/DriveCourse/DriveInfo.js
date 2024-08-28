import React, {useState, useEffect} from 'react';
import GrayLine from '../../components/GrayLine';
import {WebView} from 'react-native-webview';
import {View, Text, FlatList} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {fetchRoute} from '../../utils/fetchRoute';
import DriveRestaurantCuration from './DriveRestaurantCuration';

const DriveInfo = ({item, driveId}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const center = {
    lat: item.waypoints[0].latitude,
    lng: item.waypoints[0].longitude,
  };
  const places = item.places;

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
        <View style={{height: 32}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>키워드</Text>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {item.tags.map((tag, index) => (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                height: 35,
                paddingHorizontal: 16,
                borderRadius: 24,
                justifyContent: 'center',
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: colors.Gray02,
              }}>
              <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <GrayLine />
      {places.length > 0 ? (
        <View>
          <View style={{height: 24}} />
          <Text
            style={[
              textStyles.H3,
              {color: colors.Gray10, paddingHorizontal: 16},
            ]}>
            근처에 이런 카페/식당이 있어요!
          </Text>
          <View style={{flex: 1, marginTop: 16}}>
            <FlatList
              data={places}
              keyExtractor={item => item.id.toString()} // keyExtractor를 사용하여 고유 키 설정
              renderItem={({item}) => (
                <DriveRestaurantCuration item={item} driveId={driveId} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{width: 16}} />}
              ListHeaderComponent={<View style={{width: 16}} />}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default DriveInfo;
