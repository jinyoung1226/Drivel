import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon';
import {
  driveStyle,
  driveTheme,
  driveWith,
} from '../../assets/onboardingData/onBoardingData';
import ChipContainer from '../../components/ChipContainer';
import CustomButton from '../../components/CustomButton';
import {authApi} from '../../api/api';
import {useDispatch} from 'react-redux';
import {getMyProfileInfo} from '../../features/profile/profileActions';
import {ScrollView} from 'react-native-gesture-handler';
const MyDriveTagEdit = ({navigation, route}) => {
  const item = route.params.item;
  const [selectedDriveStyle, setSelectedDriveStyle] = useState([]);
  const [selectedDriveTheme, setSelectedDriveTheme] = useState([]);
  const [selectedDriveTogether, setSelectedDriveTogether] = useState([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '나의 드라이브 태그',
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
    setSelectedDriveStyle(item.styles.map(e => e.id));
    setSelectedDriveTheme(item.themes.map(e => e.id));
    setSelectedDriveTogether(item.togethers.map(e => e.id));
  }, []);

  const MyDriveTagUpdate = async () => {
    try {
      const response = await authApi.patch('profile/profileUpdate', {
        styleIds: selectedDriveStyle,
        themeIds: selectedDriveTheme,
        togetherIds: selectedDriveTogether,
      });
      if (response.status == 200) {
        console.log(response.data, 'update');
        dispatch(getMyProfileInfo());
        navigation.goBack();
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(error.response.data.message);
        console.log(error.response.data);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <ScrollView style={{padding: 16}}>
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          드라이브 풍경
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.M14, {color: colors.Gray06}]}>
          자유롭게 선택해주세요
        </Text>
        <View style={{height: 16}} />
        <ChipContainer
          containerStyle={{flexDirection: 'row'}}
          type={'multi'}
          data={driveTheme}
          selectedItem={selectedDriveTheme}
          onSelectedHandler={items => setSelectedDriveTheme(items)}
        />
        <View style={{height: 32}} />
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          드라이브와 함께 하고 싶은 활동
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.M14, {color: colors.Gray06}]}>
          자유롭게 선택해주세요
        </Text>
        <View style={{height: 16}} />
        <ChipContainer
          containerStyle={{flexDirection: 'row'}}
          type={'multi'}
          data={driveStyle}
          selectedItem={selectedDriveStyle}
          onSelectedHandler={items => setSelectedDriveStyle(items)}
        />
        <View style={{height: 32}} />
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          함께 하고 싶은 동행자
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.M14, {color: colors.Gray06}]}>
          자유롭게 선택해주세요
        </Text>
        <View style={{height: 16}} />
        <ChipContainer
          containerStyle={{flexDirection: 'row'}}
          type={'multi'}
          data={driveWith}
          selectedItem={selectedDriveTogether}
          onSelectedHandler={items => setSelectedDriveTogether(items)}
        />
        <View style={{height: 48}} />
      </ScrollView>
      <View style={{padding: 16, backgroundColor: colors.BG, elevation: 10}}>
        <CustomButton
          title={'완료하기'}
          onPress={() => {
            MyDriveTagUpdate();
          }}
        />
      </View>
    </View>
  );
};

export default MyDriveTagEdit;
