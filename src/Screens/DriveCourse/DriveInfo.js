import React from "react";
import GrayLine from '../../components/GrayLine';
import {WebView} from 'react-native-webview';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';


const DriveInfo = ({item}) => {

  const html = `
  <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body, html, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=420a6167337b5c7d578c146f5d91b859"></script> 
    </head>
    <body>
        <div id="map"></div>
        <script type="text/javascript">
            (function () {
                const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                const options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };
                
                const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
                
                // 주소-좌표 변환 객체를 생성합니다
                const geocoder = new kakao.maps.services.Geocoder();
            })();
        </script>       
    </body>
</html>`;

  return (
    <View>
      <View
        style={{
          
          marginTop: 24,
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            height: 53,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text style={[textStyles.H4]}>코스 길이</Text>
          <Text style={[textStyles.B3, {color: colors.Gray09}]}>
            {item.courseInfo.distance + 'km'}
          </Text>
        </View>
        <View style={{marginTop: 32}}>
          <Text style={[textStyles.H4]}>코스 정보</Text>
          {item.waypoints.map((waypoint, index) => (
            <View
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
        <View
          style={{
            marginTop: 16,
            height: 200,
            width: '100%',
            padding: 0,
          }}>
          <WebView
            originWhitelist={['*']}
            source={{html: html}}
            style={{flex: 1, borderRadius: 4}}
          />
        </View>
      </View>
      <GrayLine style={{marginTop: 38}} />
    </View>
  );
}

export default DriveInfo;