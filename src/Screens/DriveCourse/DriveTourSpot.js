import React from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text, Image, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {WebView} from 'react-native-webview';
import config from '../../config/config';
import {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import axios from 'axios';
import Sparkler from '../../assets/icons/Sparkler.svg';
import FestivalCuration from '../../components/FestivalCuration';
import dfs_xy_conv from '../../utils/dfs_xy_conv';
import Cloudy from '../../assets/icons/Cloudy.svg';
import Sunny from '../../assets/icons/Sunny.svg';
import Rainy from '../../assets/icons/Rainy.svg';
import Snowy from '../../assets/icons/Snowy.svg';
import HazySnowy from '../../assets/icons/HazySnowy.svg';
import HazyRainy from '../../assets/icons/HazyRainy.svg';

const {width} = Dimensions.get('window');

const DriveTourSpot = ({item, minHeight, setScrollEnabled}) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const festivalList = item.festivals;
  const center = {
    lat: item.waypoints[0].latitude,
    lng: item.waypoints[0].longitude,
  };
  console.log(center.lat, center.lng);

  const getFormattedDateAndTime = () => {
    const today = new Date();

    // 현재 날짜 계산
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    month = month < 10 ? `0${month}` : month;
    date = date < 10 ? `0${date}` : date;

    const formattedDate = `${year}${month}${date}`;
    console.log(`현재 날짜: ${formattedDate}`);

    // 현재 시간 계산
    const nowTime = new Date();
    let hours = nowTime.getHours();
    let minutes = String(nowTime.getMinutes()).padStart(2, '0');

    const formattedTime = `${String(hours).padStart(2, '0')}${minutes}`;
    console.log(`현재 시간: ${formattedTime}`);

    // 기준 시간 목록
    const baseTimes = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];
    let currentTime = parseInt(formattedTime);

    // 현재 시간보다 작은 기준 시간 중 가장 가까운 시간 찾기
    let closestTime = baseTimes[baseTimes.length - 1]; // 기본값은 2300
    for (let i = 0; i < baseTimes.length; i++) {
      if (currentTime >= baseTimes[i]) {
        closestTime = baseTimes[i];
      } else {
        break;
      }
    }

    // 만약 현재 시간이 2300 초과 0200 미만인 경우 현재 날짜의 2300으로 설정
    if (currentTime > 2300) {
      closestTime = 2300;
    } else if (currentTime < 200) {
      // 0200 미만인 경우 전날의 2300으로 설정
      const previousDay = new Date(today);
      previousDay.setDate(today.getDate() - 1);

      year = previousDay.getFullYear();
      month = previousDay.getMonth() + 1;
      date = previousDay.getDate();

      month = month < 10 ? `0${month}` : month;
      date = date < 10 ? `0${date}` : date;

      return {
        formattedDate: `${year}${month}${date}`,
        closestTimeFormatted: String(2300).padStart(4, '0'),
      };
    }

    // 시간 포맷팅
    let closestTimeFormatted = String(closestTime).padStart(4, '0');

    console.log(`가장 가까운 기준 시간: ${closestTimeFormatted}`);
    return {formattedDate, closestTimeFormatted};
  };
  useEffect(() => {
    console.log(weatherInfo);
  }, [weatherInfo]);

  useEffect(() => {
    const {formattedDate, closestTimeFormatted} = getFormattedDateAndTime();
    console.log(
      `최종 날짜: ${formattedDate}, 최종 시간: ${closestTimeFormatted}`,
    );

    const rs = dfs_xy_conv('toXY', center.lat, center.lng);
    const {x, y} = rs;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${config.WEATHER_KEY}&pageNo=1&numOfRows=12&dataType=JSON&base_date=${formattedDate}&base_time=${closestTimeFormatted}&nx=${x}&ny=${y}`,
        );

        // 응답 상태가 200인 경우에만 처리
        if (response.status === 200) {
          const weatherData = response.data.response.body.items.item;
          const filteredWeather = weatherData.filter(
            item =>
              item.category === 'SKY' ||
              item.category === 'PTY' ||
              item.category === 'TMP',
          );

          if (filteredWeather[1].fcstValue === '1') {
            setWeatherInfo({
              sky: '맑음',
              precipitation: '없음',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '맑음',
              imageIcon: Sunny,
            });
          } else if (
            filteredWeather[1].fcstValue === '3' &&
            filteredWeather[2].fcstValue === '0'
          ) {
            setWeatherInfo({
              sky: '구름많음',
              precipitation: '없음',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '구름 많음',
              imageIcon: Cloudy,
            });
          } else if (
            filteredWeather[1].fcstValue === '3' &&
            filteredWeather[2].fcstValue === '1'
          ) {
            setWeatherInfo({
              sky: '구름많음',
              precipitation: '비',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '구름 많고 비',
              imageIcon: Rainy,
            });
          } else if (
            filteredWeather[1].fcstValue === '3' &&
            filteredWeather[2].fcstValue === '3'
          ) {
            setWeatherInfo({
              sky: '구름많음',
              precipitation: '눈',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '구름 많고 눈',
              imageIcon: Snowy,
            });
          } else if (
            filteredWeather[1].fcstValue === '4' &&
            filteredWeather[2].fcstValue === '0'
          ) {
            setWeatherInfo({
              sky: '흐림',
              precipitation: '없음',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '흐림',
              imageIcon: Cloudy,
            });
          } else if (
            filteredWeather[1].fcstValue === '4' &&
            filteredWeather[2].fcstValue === '1'
          ) {
            setWeatherInfo({
              sky: '흐림',
              precipitation: '비',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '흐리고 비',
              imageIcon: HazyRainy,
            });
          } else if (
            filteredWeather[1].fcstValue === '4' &&
            filteredWeather[2].fcstValue === '3'
          ) {
            setWeatherInfo({
              sky: '흐림',
              precipitation: '눈',
              temperature: parseInt(filteredWeather[0].fcstValue),
              description: '흐리고 눈',
              imageIcon: HazySnowy,
            });
          }
        } else {
          console.error('Error: Non-200 response status');
        }
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <View
      style={{
        minHeight: minHeight,
      }}>
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
        }}>
        <View>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>편의 시설</Text>
        </View>
        <View
          style={{
            marginTop: 16,
            width: '100%',
            height: 225,
            padding: 0,
          }}>
          <WebView
            originWhitelist={['*']}
            source={{
              uri: `https://main--kakaomapweb.netlify.app/?lat=${center.lat}&lng=${center.lng}`,
            }}
            style={{flex: 1, borderRadius: 15}}
            onTouchCancel={() => setScrollEnabled(true)}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />
        </View>
        <View>
          <Text style={[textStyles.H4, {color: colors.Gray10, paddingTop: 32}]}>
            현재 이 지역 날씨는?
          </Text>
        </View>
        <View></View>
        <View
          style={{
            marginTop: 16,
            width: '100%',
            height: 120,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            borderColor: colors.Gray01,
            shadowColor: colors.Gray06,
            borderWidth: 1,
          }}>
          {weatherInfo ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                padding:16
              }}>
              <View style={{flex: 1}} />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'SUIT-ExtraBold',
                    fontSize: 36,
                    color: colors.Gray10,
                  }}>
                  {weatherInfo.temperature}°
                </Text>
                <Text
                  style={[textStyles.B4, {color: colors.Gray06, marginTop: 4}]}>
                  {weatherInfo.description}
                </Text>
              </View>
              <View style={{flex: 4}} />
              <View>
                <weatherInfo.imageIcon/>
              </View>
              <View style={{flex: 1}} />
            </View>
          ) : (
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator size="large" color={colors.Blue} />
            </View>
          )}
        </View>
      </View>
      <GrayLine />
      <View
        style={{
          width: width,
          marginTop: 16,
          paddingHorizontal: 16,
        }}>
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>지역 정보</Text>
        <View style={{paddingTop: 16}}>
          <Text style={[textStyles.H4, {color: colors.Blue}]}>
            {item.regionName}
          </Text>
          <Text style={[textStyles.C4, {color: colors.Gray06, marginTop: 8}]}>
            {item.regionDescription}
          </Text>
        </View>
      </View>
      <GrayLine />
      {festivalList.length > 0 ? (
        <View
          style={{
            marginTop: 32,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 16,
            }}>
            <Sparkler />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>
              이 지역 근교의 행사가 궁금하다면?
            </Text>
          </View>
          <View style={{flex: 1, marginVertical: 16}}>
            <FlatList
              key={item.id}
              data={festivalList}
              renderItem={({item}) => <FestivalCuration item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{width: 16}} />}
              ListHeaderComponent={<View style={{width: 16}} />}
            />
          </View>
        </View>
      ) : null}
      {/* <View style={{width: width, height: 96.46}} /> */}
    </View>
  );
};

export default DriveTourSpot;