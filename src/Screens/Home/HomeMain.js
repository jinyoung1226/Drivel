import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, ScrollView, Text, FlatList, Linking} from 'react-native';
import DriveCourseCuration from './DriveCourseCuration';
import MagazineCuration from './MagazineCuration';
import {authApi} from '../../api/api';
import GrayLine from '../../components/GrayLine';
import {Alert} from 'react-native';
import FestivalCuration from '../../components/FestivalCuration';
import Sparkler from '../../assets/icons/Sparkler.svg';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import DriveRegionCuraiton from './DriveRegionCuraiton';
import MiniBus from '../../assets/icons/MinibusIcon.svg';
import {magazineCover} from '../../assets/magazineData/magazineData';
import HomeBanner from './HomeBanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeMain = ({navigation}) => {
  const [driveCourseList, setDriveCourseList] = useState([]);
  const [driveRegionList, setDriveRegionList] = useState([]);
  const [festivalList, setFestivalList] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeButton, setActiveButton] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Drivel',
      headerTitleAlign: 'left',
      headerTitleStyle: [
        {color: '#ffffff', fontSize: 24, fontFamily: 'KNU TRUTH'},
      ],
      headerTransparent: true,
      headerBackground: () => (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getDriveCurationInfo = async () => {
      try {
        const response = await authApi.get('course/my-theme');
        if (response.status === 200) {
          setDriveCourseList(response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('코스를 불러올 수 없습니다.');
          }
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getDriveCurationInfo();
    const goMeetApplyDetail = async () => {
      const deepLinkURL = await AsyncStorage.getItem('deepLinkURL');
      if (deepLinkURL) {
        Linking.openURL('drivel://meet/applyDetail');
        await AsyncStorage.removeItem('deepLinkURL');
      }
    };
    goMeetApplyDetail();
  }, []);

  useEffect(() => {
    const getRegionCurationInfo = async () => {
      try {
        const response = await authApi.get('course/my-region');
        if (response.status === 200) {
          console.log(response.data, '@@@@@');
          setDriveRegionList(response.data);

          const categoryData = response.data.map(data => data.tagName);
          setCategory(categoryData);
          if (categoryData.length > 0) {
            setActiveButton(categoryData[0]);
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('코스를 불러올 수 없습니다.');
          }
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getRegionCurationInfo();
  }, []);

  useEffect(() => {
    const getFestivalInfo = async () => {
      try {
        const response = await authApi.get('festival');
        if (response.status === 200) {
          console.log(response.data, 'festival');
          setFestivalList(response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('페스티벌을 불러올 수 없습니다.');
          }
        } else {
          console.log(error);
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getFestivalInfo();
  }, []);

  const driveRegionLists = driveRegionList
    .filter(region => region.tagName === activeButton) // 선택된 카테고리에 해당하는 항목만 필터링
    .flatMap(region => region.courses); // 각 region의 courses 배열을 플랫맵으로 합치기

  const handleButtonPress = button => {
    setActiveButton(button);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <HomeBanner />
        <DriveCourseCuration data={driveCourseList} />
        <GrayLine />
        <DriveRegionCuraiton
          activeButton={activeButton}
          category={category}
          handleButtonPress={handleButtonPress}
          data={driveRegionLists}
        />
        <GrayLine />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingLeft: 16,
            paddingTop: 24,
          }}>
          <MiniBus />
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            이런 여행코스가 인기에요!
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 16}}>
          <FlatList
            data={magazineCover}
            renderItem={({item}) => <MagazineCuration item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 16}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
          />
        </View>
        <GrayLine />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingLeft: 16,
            paddingTop: 24,
          }}>
          <Sparkler />
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            지금 가장 핫한 행사가 궁금하다면?
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 16}}>
          <FlatList
            data={festivalList}
            renderItem={({item}) => <FestivalCuration item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 16}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeMain;
