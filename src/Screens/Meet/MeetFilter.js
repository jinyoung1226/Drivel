import React, {useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMeetList,
  setFilterAge,
  setFilterGender,
  setFilterCarModel,
  setFilterCarCareer,
} from '../../features/meet/meetActions';

const MeetFilter = ({navigation}) => {
  const dispatch = useDispatch();
  const [driveCourse, setDriveCourse] = useState('');
  const [minCarCareer, setMinCarCareer] = useState('');
  const {
    totalMeeting,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    sort,
  } = useSelector(state => state.meet);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={filterMeeting} style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, filterGender, filterAge, filterCarModel, filterCarCareer]);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 코스
          </Text>
          <View style={{height: 16}} />
          <CustomInput
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
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>성별</Text>
          <View style={{height: 16}} />

          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={['남성', '여성']}
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
      <View style={{padding: 16, elevation: 10, backgroundColor: colors.BG}}>
        <CustomButton title={'모임 검색'} onPress={filterMeeting} />
      </View>
    </SafeAreaView>
  );
};

export default MeetFilter;
