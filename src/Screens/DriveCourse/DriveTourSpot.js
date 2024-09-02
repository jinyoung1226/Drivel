import React from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text, Image, Dimensions, FlatList} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {WebView} from 'react-native-webview';
import config from '../../config/config';
import {useEffect} from 'react';
import {useState} from 'react';
import colors from '../../styles/colors';
import axios from 'axios';
import weatherDescKo from '../../utils/weatherTranslation';
import Sparkler from '../../assets/icons/Sparkler.svg';
import FestivalCuration from '../../components/FestivalCuration';

const {width} = Dimensions.get('window');

const DriveTourSpot = ({item, minHeight, setScrollEnabled}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [weather, setWeather] = useState({});
  const [festivalList, setFestivalList] = useState(item.festivals);
  const center = {
    lat: item.waypoints[0].latitude,
    lng: item.waypoints[0].longitude,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${center.lat}&lon=${center.lng}&appid=${config.WEATHER_KEY}`,
        );
        // id 찾아서 매칭 후 description 한글 번역 가져오기
        const weatherId = response.data.weather[0].id;
        let weatherKo = '';

        for (let weather of weatherDescKo) {
          if (weather[weatherId]) {
            weatherKo = weather[weatherId];
            break;
          }
        }
        // 날씨 아이콘 가져오기
        const weatherIcon = response.data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        // 소수점 버리기
        const temp = Math.round(response.data.main.temp);

        setWeather({
          description: weatherKo,
          temp: temp - 273,
          icon: weatherIconAdrs,
        });
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <View style={{
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
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 40,
            }}>
            <Text style={{fontFamily: 'SUIT-ExtraBold', fontSize: 36}}>
              {weather.temp}°
            </Text>
            <Text style={[textStyles.B4, {color: colors.Gray06, marginTop: 4}]}>
              {weather.description}
            </Text>
          </View>
          {weather.icon ? (
            <Image
              source={{uri: weather.icon}}
              style={{
                width: 101,
                height: 101,
                marginVertical: 15.94,
                marginRight: 40,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.Gray04,
                width: 30,
                height: 30,
                borderRadius: 15,
              }}
            />
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
