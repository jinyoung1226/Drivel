import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import SpinIcon from '../../assets/icons/SpinIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import {driveStyle} from '../../assets/onboardingData/onBoardingData';
import {useDispatch, useSelector} from 'react-redux';

import {
  getMeetList,
  setFilterDriveStyle,
  setFilterAge,
  setFilterGender,
  setFilterCarModel,
  setFilterCarCareer,
} from '../../features/meet/meetActions';

const MeetFilter = ({navigation}) => {
  const dispatch = useDispatch();
  const [driveCourse, setDriveCourse] = useState('');
  const {
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    sort,
  } = useSelector(state => state.meet);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '필터',
      headerTitleAlign: 'center',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            filterMeeting();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
  ]);

  useEffect(() => {
    const backAction = () => {
      filterMeeting();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [filterGender, filterAge, filterCarModel, filterCarCareer]);

  const filterMeeting = () => {
    dispatch(
      getMeetList({
        page: 0,
        size: 10,
        sort: sort,
        gender: filterGender == '' ? null : filterGender == '남성' ? 1 : 2,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        minCarCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    );
    navigation.navigate('MeetMain');
  };
  const resetFilter = () => {
    dispatch(setFilterDriveStyle(''));
    dispatch(setFilterGender(''));
    dispatch(setFilterAge(''));
    dispatch(setFilterCarModel(''));
    dispatch(setFilterCarCareer(''));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 스타일
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveStyle}
            selectedItem={filterDriveStyle}
            onSelectedHandler={items => dispatch(setFilterDriveStyle(items))}
          />
          {/* <CustomInput
            showButton={true}
            isButtonText={false}
            buttonIcon={
              driveCourse.length > 0 ? (
                <XIcon />
              ) : (
                <SearchIcon color={colors.Gray04} />
              )
            }
            onButtonPress={() => setDriveCourse('')}
            placeholder="드라이브 코스"
            value={driveCourse}
            onChangeText={setDriveCourse}
            buttonDisabled={driveCourse.length === 0}
          /> */}
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>성별</Text>
          <View style={{height: 16}} />

          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={[
              {id: 1, displayName: '남성'},
              {id: 2, displayName: '여성'},
            ]}
            selectedItem={filterGender}
            onSelectedHandler={items => dispatch(setFilterGender(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>나이</Text>
          <View style={{height: 16}} />
          <CustomInput
            placeholder="0"
            value={filterAge}
            onChangeText={e => {
              dispatch(setFilterAge(e));
            }}
            showButton={true}
            buttonIcon={
              <Text style={[textStyles.B3, {color: colors.Gray10}]}>세</Text>
            }
            buttonDisabled={true}
            maxLength={2}
            keyboardType="number-pad"
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>차종</Text>
          <View style={{height: 16}} />
          <CustomInput
            showButton={true}
            isButtonText={false}
            buttonIcon={
              filterCarModel.length > 0 ? (
                <XIcon />
              ) : (
                <SearchIcon color={colors.Gray04} />
              )
            }
            onButtonPress={() => dispatch(setFilterCarModel(''))}
            placeholder="차종을 입력해주세요"
            value={filterCarModel}
            onChangeText={e => dispatch(setFilterCarModel(e))}
            buttonDisabled={filterCarModel.length === 0}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>운전 경력</Text>
          <View style={{height: 16}} />
          <CustomInput
            placeholder="0"
            value={filterCarCareer}
            onChangeText={e => {
              dispatch(setFilterCarCareer(e));
            }}
            showButton={true}
            buttonIcon={
              <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                년 이상
              </Text>
            }
            buttonDisabled={true}
            maxLength={2}
            keyboardType="number-pad"
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            display:
              filterDriveStyle == '' &&
              filterAge == '' &&
              filterCarModel == '' &&
              filterCarCareer == '' &&
              filterGender == ''
                ? 'none'
                : 'flex',
          }}
          onPress={resetFilter}>
          <SpinIcon />
          <View style={{width: 8}} />
          <Text style={[textStyles.H4, {color: colors.Gray08}]}>재설정</Text>
          <View style={{width: 16}} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton title={'모임 검색'} onPress={filterMeeting} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeetFilter;
