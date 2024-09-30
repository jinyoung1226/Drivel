import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Linking,
  Pressable,
} from 'react-native';
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
import HomeBanner from './HomeBanner';
import {getDeepLinkURL} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';
import InstaBanner from '../../assets/icons/InstaBanner.svg';
import InstaBannerArrow from '../../assets/icons/InstaBannerArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getDriveCurationInfo, getRegionCurationInfo, setActiveButton } from '../../features/home/homeActions';
const HomeMain = ({navigation}) => {
  const [magazineList, setMagazineList] = useState([]);
  const [randomBannerId, setRandomBannerId] = useState(null);

  const dispatch = useDispatch();

  const {driveCurationList, regionCurationList, activeButton, category} = useSelector(state => state.home);

  const [festivalList, setFestivalList] = useState([]);
  // const [category, setCategory] = useState([]);
  // const [activeButton, setActiveButton] = useState('');
  const driveRegionList = useRef([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Drivel',
      headerTitleAlign: 'left',
      headerTitleStyle: [
        {color: '#ffffff', fontSize: 24, fontFamily: 'KNU-TRUTH-TTF'},
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
    const getMagazine = async () => {
      try {
        const response = await authApi.get('magazine');
        if (response.status === 200) {
          console.log(response.data, response.data.length, 'magazine@@@@@@@@@@@@@@@');
          setMagazineList(response.data);
          setRandomBannerId(Math.floor(Math.random() * response.data.length));
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
    getMagazine();
    const goMeetApplyDetail = async () => {
      const deepLinkURL = getDeepLinkURL();
      if (deepLinkURL) {
        console.log('딥링크 url', deepLinkURL);
        Linking.openURL(deepLinkURL);
      }
    };
    goMeetApplyDetail();
  }, []);

  // useEffect(() => {
    // const getRegionCurationInfo = async () => {
    //   try {
    //     const response = await authApi.get('course/my-region');
    //     if (response.status === 200) {
    //       console.log(response.data, '@@@@@');
    //       setDriveRegionList(response.data);

    //       const categoryData = response.data.map(data => data.tagName);
    //       setCategory(categoryData);
    //       if (categoryData.length > 0) {
    //         setActiveButton(categoryData[0]);
    //       }
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status === 400) {
    //         Alert.alert('코스를 불러올 수 없습니다.');
    //       }
    //     } else {
    //       console.log(error);
    //       Alert.alert('서버와의 통신 실패');
    //     }
    //   }
    // };
    // getRegionCurationInfo();

  useEffect(() => {
    dispatch(getDriveCurationInfo());
    dispatch(getRegionCurationInfo());
    const getFestivalInfo = async () => {
      try {
        const response = await authApi.get('festival');
        if (response.status === 200) {
          // console.log(response.data, 'festival');
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

  driveRegionList.current = regionCurationList
    .filter(region => region.tagName === activeButton) // 선택된 카테고리에 해당하는 항목만 필터링
    .flatMap(region => region.courses); // 각 region의 courses 배열을 플랫맵으로 합치기

  const handleButtonPress = button => {
    dispatch(setActiveButton(button));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <HomeBanner magazineList={magazineList} randomBannerId={randomBannerId}/>
        <View style={{height: 24}} />
        <Pressable
          onPress={() => {
            Linking.openURL('https://www.instagram.com/drivel.mag');
          }}
          style={{height: 110}}>
          <LinearGradient
            style={{flex: 1, alignItems: 'flex-end'}}
            start={{x: -0.1, y: 0.9}}
            end={{x: 1.1, y: 0.5}}
            colors={['#3CD1D1', '#5168F6']}>
            <Text
              style={[
                textStyles.B2,
                {
                  position: 'absolute',
                  color: colors.white,
                  zIndex: 1,
                  left: 24,
                  top: 22,
                },
              ]}>
              {'Drivel만의 드라이브'}
              <Text style={{fontFamily: 'Pretendard-Bold', fontSize: 16}}>
                {' 큐레이션 '}
              </Text>
              {'콘텐츠를\n'}
              <Text style={{fontFamily: 'Pretendard-Bold', fontSize: 16}}>
                {'인스타그램'}
              </Text>
              {'에서 확인해보세요'}
            </Text>
            <Text
              style={[
                textStyles.H7,
                {
                  position: 'absolute',
                  color: colors.white,
                  zIndex: 1,
                  left: 24,
                  bottom: 23,
                },
              ]}>
              {'@drivel.mag'}
            </Text>
            <InstaBanner />
            <View style={{position: 'absolute', bottom: 8, right: 8}}>
              <InstaBannerArrow />
            </View>
          </LinearGradient>
        </Pressable>

        <DriveCourseCuration data={driveCurationList} />
        <GrayLine />
        <DriveRegionCuraiton
          activeButton={activeButton}
          category={category}
          handleButtonPress={handleButtonPress}
          data={driveRegionList.current}
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
            data={magazineList}
            renderItem={({item}) => <MagazineCuration item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 16}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
            ListFooterComponent={<View style={{width: 16}} />}
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
            ListFooterComponent={<View style={{width: 16}} />}
          />
        </View>
        <View style={{height: 16}} />
      </ScrollView>
    </View>
  );
};

export default HomeMain;
