import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import SpinIcon from '../../assets/icons/SpinIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import {
  driveStyle,
  driveTheme,
  driveWith,
} from '../../assets/onboardingData/onBoardingData';
import {useDispatch, useSelector} from 'react-redux';
import {carModelData} from '../../assets/driveCourseData/carModelData';
import koFilter from '../../utils/koFilter';
import {
  getMeetList,
  setFilterDriveTheme,
  setFilterDriveWith,
  setFilterDriveStyle,
  setFilterAge,
  setFilterGender,
  setFilterCarModel,
  setFilterCarCareer,
} from '../../features/meet/meetActions';

const MeetFilter = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    filterDriveTheme,
    filterDriveWith,
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    sort,
  } = useSelector(state => state.meet);
  const [filteredCarData, setFilteredCarData] = useState([]);
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
    filterDriveTheme,
    filterDriveWith,
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
  ]);

  useEffect(() => {
    console.log(
      filterDriveStyle,
      filterGender,
      filterAge,
      filterCarModel,
      filterCarCareer,
      filterDriveTheme,
      filterDriveWith,
      '값 잘 변하나?',
    );
    const backAction = () => {
      filterMeeting();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    filterDriveStyle,
    filterDriveTheme,
    filterDriveWith,
  ]);

  const filterMeeting = () => {
    dispatch(
      getMeetList({
        page: 0,
        size: 10,
        sort: sort,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    );
    navigation.navigate('MeetMain');
  };
  const resetFilter = () => {
    dispatch(setFilterDriveWith(''));
    dispatch(setFilterDriveTheme(''));
    dispatch(setFilterDriveStyle(''));
    dispatch(setFilterGender(''));
    dispatch(setFilterAge(''));
    dispatch(setFilterCarModel(''));
    dispatch(setFilterCarCareer(''));
  };

  const handleSearchCarModel = e => {
    dispatch(setFilterCarModel(e));
    setFilteredCarData(koFilter(carModelData, e));
  };

  const selectCarModel = item => {
    dispatch(setFilterCarModel(item.title));
    setFilteredCarData([]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
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
            onChangeText={handleSearchCarModel}
            buttonDisabled={filterCarModel.length === 0}
          />
          {filteredCarData.length !== 0 && filterCarModel.length !== 0 && (
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.Gray03,
                flexGrow: 0,
                marginTop: 8,
                paddingVertical: 4,
              }}>
              {filteredCarData.map(item => (
                <Pressable
                  style={({pressed}) => [
                    {
                      padding: 8,
                      marginHorizontal: 8,
                      marginVertical: 4,
                      backgroundColor: pressed ? colors.Light_Blue : null,
                      borderRadius: 5,
                    },
                  ]}
                  key={item.title}
                  onPress={() => selectCarModel(item)}>
                  {({pressed}) => (
                    <Text
                      style={[
                        textStyles.B4,
                        {color: pressed ? colors.Blue : colors.Gray10},
                      ]}>
                      {item.title}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          )}
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
            justifyContent: 'center',
            height: 50,
            display:
              filterDriveWith == '' &&
              filterDriveTheme == '' &&
              filterDriveStyle == '' &&
              filterAge == '' &&
              filterCarModel == '' &&
              filterCarCareer == '' &&
              filterGender == ''
                ? 'none'
                : 'flex',
          }}
          onPress={resetFilter}>
          <View style={{flexDirection: 'row', height: 22}}>
            <SpinIcon />
            <View style={{width: 8}} />
            <Text style={[textStyles.H4, {color: colors.Gray08}]}>재설정</Text>
            <View style={{width: 16}} />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton title={'모임 검색'} onPress={filterMeeting} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeetFilter;
