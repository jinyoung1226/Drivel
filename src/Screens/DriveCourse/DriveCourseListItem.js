import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Star from '../../assets/icons/Star.svg';
import {useNavigation} from '@react-navigation/native';
import {authApi} from '../../api/api';
import RenderingPage from '../../components/RenderingPage';

const DriveCourseListItem = ({item}) => {
  const navigation = useNavigation();
  console.log(item, '@@@@@@@@@');
  const [courseInfo, setCourseInfo] = useState(null);

  const handleDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  useEffect(() => {
    const getDriveInfo = async () => {
      try {
        const response = await authApi.get(`course/${item.id}`);
        if (response.status === 200) {
          setCourseInfo(response.data);
          console.log(response.data, '@@@@');
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
  }, [item.id]);

  // courseInfo가 존재할 때만 렌더링하도록 수정
  if (!courseInfo) return null;

  return (
    <TouchableOpacity
      onPress={() => handleDriveDetail(item.id)}
      style={{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.BG,
        marginVertical: 8,
        height: 147,
        borderWidth: 1,
        borderColor: colors.Gray01,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}>
      <View style={{flex: 1}}>
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          {item.title}
        </Text>
        <Text style={{color: colors.Gray07, marginTop: 4}}>
          {courseInfo.regionName}
        </Text>
        <Text
          style={{color: colors.Gray07, marginTop: 8, width: 200}}
          numberOfLines={2}>
          {courseInfo.tags}
        </Text>
      </View>
      <View
        style={{width: 100, height: 115, borderRadius: 10, overflow: 'hidden'}}>
        <Image source={{uri: item.imagePath}} style={{height: 115}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          gap: 2,
          alignItems: 'center',
          position: 'absolute',
          left: 16,
          bottom: 16,
        }}>
        <Star />
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          {item.averageRating}
        </Text>
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          ({item.reviewCount})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriveCourseListItem;
