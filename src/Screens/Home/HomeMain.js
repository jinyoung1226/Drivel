import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import DriveCourseCuration from './DriveCourseCuration';
import Magazine from './Magazine';
import {api, authApi} from '../../api/api';
import GrayLine from '../../components/GrayLine';
import {Alert} from 'react-native';
import FestivalCuration from '../../components/FestivalCuration';
import Sparkler from '../../assets/icons/Sparkler.svg';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const {width} = Dimensions.get('window');

const HomeMain = ({navigation}) => {
  const [driveCourseList, setDriveCourseList] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const [festivalList, setFestivalList] = useState([]);
  // console.log(festivalList, '$$$');

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
    const getFestivalInfo = async () => {
      try {
        const response = await authApi.get('festival');
        if (response.status === 200) {
          console.log(response.data, '@@');
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

  const handleDriveCourse = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  const handleButtonPress = button => {
    setActiveButton(button);
  };

  if (driveCourseList.length === 0) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView>
        <Pressable style={{flex: 1}}>
          <Image
            source={require('../../assets/image/homeTopImg.jpg')}
            style={{
              width: width,
              height: 516,
              resizeMode: 'cover',
              borderBottomRightRadius: 40,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              fontFamily: 'SUIT-Bold',
              fontSize: 24,
              color: '#ffffff',
              bottom: 37,
              left: 24,
            }}>
            숨겨진 제주도 맛집이 {'\n'}어딘지 궁금하다면?
          </Text>
        </Pressable>
        <DriveCourseCuration
          activeButton={activeButton}
          handleButtonPress={handleButtonPress}
          handleDriveCourse={handleDriveCourse}
          driveCourseLists={driveCourseList}
        />
        <View
          style={{
            width: width,
            height: 10,
            backgroundColor: '#F6F6F7',
            marginTop: 16,
          }}
        />
        <Magazine />
        <GrayLine />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingLeft: 16,
            paddingTop: 16,
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
