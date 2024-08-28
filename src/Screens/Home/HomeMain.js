import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Text,
  FlatList,
  ImageBackground,
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
import RenderingPage from '../../components/RenderingPage';
import DriveRegionCuraiton from './DriveRegionCuraiton';
import MiniBus from '../../assets/icons/MinibusIcon.svg';
import { magazineCover } from '../../assets/magazineData/magazineData'; 
import { magazineBanner } from '../../assets/magazineData/magazineData'; 
import LinearGradient from 'react-native-linear-gradient';


const {width} = Dimensions.get('window');

const HomeMain = ({navigation}) => {
  const [driveCourseList, setDriveCourseList] = useState([]);
  const [driveRegionList, setDriveRegionList] = useState([]);
  const [festivalList, setFestivalList] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const [randomBannerId, setRandomBannerId] = useState(null);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 4);
  }

  useEffect(() => {
    let randomNumber = generateRandomNumber(); 
    setRandomBannerId(randomNumber);
  })


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

  if (driveCourseList.length === 0) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return <RenderingPage />;
  }

  const handleMagazineInfo = id => {
    navigation.navigate('MagazineInfo', { id: id + 1 });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <Pressable style={{flex: 1}} onPress={() => handleMagazineInfo(randomBannerId)}>
        <View style={{ 
      flex: 1, 
      height: 516, 
      borderBottomRightRadius: 40,
      overflow: 'hidden', 
    }}>
      <ImageBackground
        source={{ uri: magazineBanner[randomBannerId].imagePath }}
        style={{ flex: 1 }}
        imageStyle={{ borderBottomRightRadius: 40 }} 
      >
        <LinearGradient 
          style={{ flex: 1, paddingVertical: 31, paddingLeft: 24 }} 
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
        >
          <View style={{ flex: 1 }} />
          <Text style={[textStyles.H1, { color: colors.white }]}>
            {magazineBanner[randomBannerId].title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>

        </Pressable>
        <DriveCourseCuration data={driveCourseList}/>
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
            이 지역의 행사가 궁금하다면?
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
