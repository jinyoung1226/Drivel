import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import TabScreens from '../../components/TabScreens';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import {authApi} from '../../api/api';
import {useFocusEffect} from '@react-navigation/native';
import WebView from 'react-native-webview';
import BackIcon from '../../assets/icons/BackIcon';
import GrayLine from '../../components/GrayLine';
import DriveInfo from './DriveInfo';
import DriveReview from './DriveReview';
import DriveTourSpot from './DriveTourSpot';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('window');

const DriveDetail = ({route, navigation}) => {
  const driveId = route.params.id;
  const [courseInfo, setCourseInfo] = useState(null);
  const theme = ['노을 맛집', '해변길', '자연친화'];
  const tabName = ['상세정보', '리뷰', '관광지'];
  const [activeTab, setActiveTab] = useState(0);
  console.log(courseInfo, 'asd ');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '상세정보',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getDriveInfo = async () => {
      try {
        const response = await authApi.get(`course/${driveId}`);
        if (response.status === 200) {
          setCourseInfo(response.data);
          console.log(response.data);
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
    getDriveInfo();
  }, [driveId]);

  if (!courseInfo) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView scrollIndicatorInsets={{right: 0.1}}>
        <Image
          src={courseInfo.courseInfo.imagePath}
          style={[styles.image, {width: width}]}
        />
        <View style={styles.tagContainer}>
          {theme.map((item, index) => (
            <View key={index} style={styles.tagButton}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            {courseInfo.courseInfo.title}
          </Text>
          <View style={{height: 8}} />
          <Text style={[textStyles.M14, {color: colors.Gray07}]}>
            {courseInfo.courseInfo.description}
          </Text>
        </View>
        <GrayLine />
        {courseInfo !== null && (
          <TabScreens
            tabName={tabName}
            tabScreens={[
              <DriveInfo item={courseInfo} />,
              <DriveReview />,
              <DriveTourSpot item={courseInfo} />,
            ]}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  image: {
    height: 210.94,
  },

  tagContainer: {
    marginTop: 16.06,
    paddingHorizontal: 16,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'left',
    gap: 4,
  },

  tagButton: {
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: '#E3E7FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagText: [textStyles.B2, {color: colors.Blue}],

  bar: {
    height: 10,
    marginTop: 17,
    backgroundColor: '#F6F6F7',
  },
});

export default DriveDetail;
