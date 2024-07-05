import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import TopTab from '../../components/TopTab';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import {authApi} from '../../api/api';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const DriveDetail = ({route, navigation}) => {
  const driveId = route.params.id;
  const [driveInfo, setDriveInfo] = useState(null);
  const theme = ['노을 맛집', '해변길', '자연친화'];
  const tabName = ['상세정보', '리뷰', '관광지'];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const getDriveInfo = async () => {
      try {
        const response = await authApi.get(`course/${driveId}`);
        if (response.status === 200) {
          setDriveInfo(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            Alert.alert('코스를 불러올 수 없습니다.');
          }
        } else {
          Alert.alert('서버와의 통신 실패');
        }
      }
    };
    getDriveInfo();
  }, [driveId]);

  useFocusEffect(
    useCallback(() => {
      // DriveDetail 화면이 포커스를 얻을 때 실행
      return () => {
        // DriveDetail 화면이 포커스를 잃을 때 실행
        navigation.reset({
          index: 0,
          routes: [{name: 'DriveMain'}],
        });
      };
    }, [navigation]),
  );

  if (!driveInfo) {
    // 데이터가 로드되지 않은 경우 로딩 스피너 또는 대체 콘텐츠 표시
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        src={driveInfo.courseInfo.imagePath}
        style={[styles.image, {width: width}]}
      />
      <View style={styles.tagContainer}>
        {theme.map((item, index) => (
          <View style={styles.tagButton}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 16}}>
        <Text style={[textStyles.H1, {color: colors.Gray10}]}>
          {driveInfo.courseInfo.title}
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.M14, {color: colors.Gray07}]}>
          {driveInfo.courseInfo.description}
        </Text>
      </View>
      <View style={styles.bar}></View>
      <TopTab
        tabName={tabName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View style={styles.contentContainer}>
        <View style={[{display: activeTab === 0 ? 'flex' : 'none'}]}>
          <View
            style={{
              width: width,
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
              <Text style={[textStyles.B5, {color: colors.Gray09}]}>
                {driveInfo.courseInfo.distance + 'km'}
              </Text>
            </View>
            <View style={{marginTop: 32}}>
              <Text style={[textStyles.H4]}>코스 정보</Text>
              {driveInfo.waypoints.map((waypoint, index) => (
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
                  <Text style={[textStyles.B5, {color: colors.Gray10}]}>
                    {waypoint.name}
                  </Text>
                </View>
              ))}
            </View>
            <View>
              <Text>dsd</Text>
            </View>
          </View>
        </View>
        <View style={[{display: activeTab === 1 ? 'flex' : 'none'}]}>
          <Text>리뷰에 대한 글</Text>
        </View>
        <View style={[{display: activeTab === 2 ? 'flex' : 'none'}]}>
          <Text>관광지에 대한 글</Text>
        </View>
      </View>
    </ScrollView>
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
