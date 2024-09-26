import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';;
import BackIcon from '../../assets/icons/BackIcon.svg';
import SpinIcon from '../../assets/icons/SpinIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import {
  driveStyle,
  driveTheme,
  driveWith,
  regions,
} from '../../assets/onboardingData/onBoardingData';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDriveList,
  setFilterDriveTheme,
  setFilterDriveWith,
  setFilterDriveStyle,
  setFilterRegion,
} from '../../features/drive/driveActions';

const DriveFilter = ({navigation}) => {
  const dispatch = useDispatch();
  const {filterDriveTheme, filterDriveWith, filterDriveStyle, filterRegion} = useSelector(
    state => state.drive,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '필터',
      headerTitleAlign: 'center',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            filterDrive();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, filterDriveTheme, filterDriveWith, filterDriveStyle, filterRegion]);

  useEffect(() => {
    // console.log(
    //   filterDriveStyle,
    //   filterDriveTheme,
    //   filterDriveWith,
    //   '값 잘 변하나?',
    // );
    const backAction = () => {
      filterDrive();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [filterDriveStyle, filterDriveTheme, filterDriveWith, filterRegion]);

  const filterDrive = () => {
    dispatch(
      getDriveList({
        page: 0,
        size: 10,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
      }),
    );
    navigation.navigate('DriveMain');
  };
  const resetFilter = () => {
    dispatch(setFilterDriveWith(''));
    dispatch(setFilterDriveTheme(''));
    dispatch(setFilterDriveStyle(''));
    dispatch(setFilterRegion(''));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
          
        <View style={{padding: 16}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 지역
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={regions}
            selectedItem={filterRegion}
            onSelectedHandler={items => dispatch(setFilterRegion(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 풍경
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveTheme}
            selectedItem={filterDriveTheme}
            onSelectedHandler={items => dispatch(setFilterDriveTheme(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브와 함께 하고 싶은 활동
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveStyle}
            selectedItem={filterDriveStyle}
            onSelectedHandler={items => dispatch(setFilterDriveStyle(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            함께 하고 싶은 동행자
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveWith}
            selectedItem={filterDriveWith}
            onSelectedHandler={items => dispatch(setFilterDriveWith(items))}
          />
          <View style={{height: 32}} />
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
            justifyContent: 'center',
            height: 50,
            display:
              filterDriveWith == '' &&
              filterDriveTheme == '' &&
              filterDriveStyle == '' &&
              filterRegion == ''
                ? 'none'
                : 'flex',
          }}
          onPress={resetFilter}>
          <View style={{flexDirection: 'row', height: 22}}>
            <SpinIcon />
            <View style={{width: 8}} />
            <Text style={[textStyles.H4, {color: colors.Gray08}]}>초기화</Text>
            <View style={{width: 16}} />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton title={'드라이브 코스 검색'} onPress={filterDrive} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriveFilter;
