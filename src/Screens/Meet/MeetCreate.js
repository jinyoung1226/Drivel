import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import DatePickerModal from '../../components/DatePickerModal';
import {useDispatch} from 'react-redux';
import {
  getMeetList,
  getMeetListRecommended,
} from '../../features/meet/meetActions';
import {authApi} from '../../api/api';
const MeetCreate = ({navigation}) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [driveCourse, setDriveCourse] = useState('');
  const [courseId, setCourseId] = useState(20);
  const [gender, setGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [selectedCarCareer, setSelectedCarCareer] = useState('');
  const [startAge, setStartAge] = useState(null);
  const [endAge, setEndAge] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [carModel, setCarModel] = useState('');
  const [minCarCareer, setMinCarCareer] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useLayoutEffect(() => {
    // 뒤로가기 버튼을 눌렀을 때 동작할 함수
    const handleBackPress = () => {
      if (step === 1) {
        navigation.goBack(); // 기본 동작: 이전 화면으로 돌아가기
      } else {
        setStep(step - 1); // 이전 단계로 돌아가기
      }
      return true; // 기본 뒤로가기 동작을 막음
    };
    navigation.setOptions({
      title: '모임 만들기',
      headerTitleAlign: 'center',
      headerTitleStyle: [textStyles.H2, {color: colors.Gray10}],
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={{padding: 16}}>
          <BackIcon color ={colors.Gray10}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation, step]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      createMeeting();
    }
  };
  const resetAge = items => {
    setSelectedAge(items);
    setStartAge(null);
    setEndAge(null);
  };

  const resetCarCareer = items => {
    setSelectedCarCareer(items);
    setMinCarCareer(null);
  };

  const resetCarModel = items => {
    setSelectedCarModel(items);
    setCarModel('');
  };

  useEffect(() => {
    console.log(selectedAge);
  }, [selectedAge]);
  useEffect(() => {
    console.log(date, 'meetCreate date');
  }, [date]);

  const formatDateString = dateString => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  const createMeeting = async () => {
    try {
      const response = await authApi.post('/meeting', {
        title,
        date,
        description,
        meetingPoint,
        courseId,
        gender,
        capacity,
        startAge,
        endAge,
        minCarCareer,
        carModel: carModel == '' ? null : carModel,
      });
      console.log('@@@');
      if (response.status === 200) {
        Alert.alert(response.data.message);
        console.log(response.data);
        navigation.navigate('MeetDetail', {
          meetingId: response.data.meetingId,
          courseId: response.data.courseId,
        });
        dispatch(getMeetList({page: 0, size: 10, sort: 'id,DESC'}));
        dispatch(getMeetListRecommended({page: 0, size: 3}));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert(error.response.data.message);
        }
      } else {
        Alert.alert('서버접속오류');
      }
    }
  };

  const createButtonDisabled = () => {
    if (step === 1) {
      return (
        title === '' || date === '' || description === '' || meetingPoint === ''
      );
    }
    if (step === 2) {
      return driveCourse === '';
    }
    if (step === 3) {
      return gender === null || selectedAge === ''
        ? true
        : (selectedAge === '제한 없음'
            ? false
            : startAge === '' || endAge === '') ||
          capacity === '' ||
          (selectedCarModel == '제한 없음' ? false : carModel === '') ||
          selectedCarCareer === ''
        ? true
        : selectedAge === '제한 없음'
        ? false
        : minCarCareer === '';
    }
  };

  const ProgressBar = () => (
    <View
      style={{
        backgroundColor: colors.Gray02,
        height: 5,
        flexDirection: 'row',
        marginHorizontal: 16,
        borderRadius: 100,
      }}>
      {step == 1 && (
        <View
          style={{flex: 1, backgroundColor: colors.Blue, borderRadius: 100}}
        />
      )}
      {step == 2 && (
        <View
          style={{flex: 2, backgroundColor: colors.Blue, borderRadius: 100}}
        />
      )}
      {step == 3 && (
        <View
          style={{flex: 3, backgroundColor: colors.Blue, borderRadius: 100}}
        />
      )}
      <View style={{flex: 4 - step}} />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelect={selectedDate => {
          setDate(
            `${selectedDate.getFullYear()}-${String(
              selectedDate.getMonth() + 1,
            ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(
              2,
              '0',
            )}`,
          );
          setIsDatePickerVisible(false);
        }}
      />
      <View style={{height: 16}} />
      <ProgressBar />
      <View style={{height: 8}} />
      <KeyboardAwareScrollView>
        {step === 1 ? (
          <View style={{padding: 16}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              모임의 기본 정보를 입력해주세요
            </Text>
            <View style={{height: 40}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>모임명</Text>
            <View style={{height: 16}} />
            <CustomInput
              placeholder="최대 30자까지 입력 가능합니다"
              value={title}
              onChangeText={setTitle}
              maxLength={30}
            />
            <View style={{height: 24}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>날짜</Text>
            <View style={{height: 16}} />
            <TouchableOpacity
              style={{
                height: 47,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.Gray03,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                setIsDatePickerVisible(true);
              }}>
              <View style={{width: 4}} />
              <Text
                style={[
                  textStyles.H5,
                  {color: date ? colors.Gray09 : colors.Gray04},
                ]}>
                {date ? formatDateString(date) : '날짜를 선택하세요'}
              </Text>
              <View style={{flex: 1}} />
              <SearchIcon color={colors.Gray04} />
            </TouchableOpacity>
            <View style={{height: 24}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>
              한줄소개
            </Text>
            <View style={{height: 16}} />
            <CustomInput
              placeholder="최대 30자까지 입력 가능합니다"
              value={description}
              onChangeText={setDescription}
              maxLength={30}
            />
            <View style={{height: 24}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>집결지</Text>
            <View style={{height: 16}} />
            <CustomInput
              placeholder="최대 30자까지 입력 가능합니다"
              value={meetingPoint}
              onChangeText={setMeetingPoint}
              maxLength={30}
            />
          </View>
        ) : step === 2 ? (
          <View style={{padding: 16}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              드라이브 코스를 입력해주세요
            </Text>
            <View style={{height: 40}} />
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
          </View>
        ) : (
          <View style={{padding: 16}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              어떤 사람들과 모임을 함께 하고 싶나요?
            </Text>
            <View style={{height: 40}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>성별</Text>
            <View style={{height: 16}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setGender(2)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 2 ? colors.Blue : null,
                  }}
                />
                <View style={{width: 8}} />
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  여자
                </Text>
              </TouchableOpacity>
              <View style={{width: 16}} />
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setGender(1)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 1 ? colors.Blue : null,
                  }}
                />
                <View style={{width: 8}} />
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  남자
                </Text>
              </TouchableOpacity>
              <View style={{width: 16}} />
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setGender(0)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 0 ? colors.Blue : null,
                  }}
                />
                <View style={{width: 8}} />
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  제한 없음
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 32}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>
              모임 인원
            </Text>
            <View style={{height: 16}} />
            <CustomInput
              placeholder="0"
              value={capacity}
              onChangeText={setCapacity}
              showButton={true}
              buttonIcon={
                <Text style={[textStyles.B3, {color: colors.Gray10}]}>명</Text>
              }
              buttonDisabled={true}
              maxLength={2}
              keyboardType="number-pad"
            />
            <View style={{height: 32}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>연령대</Text>
            <View style={{height: 16}} />
            <ChipContainer
              containerStyle={{flexDirection: 'row'}}
              type={'single'}
              data={['제한 없음', '직접 입력']}
              selectedItem={selectedAge}
              onSelectedHandler={items => resetAge(items)}
            />
            <View style={{height: 16}} />
            {selectedAge === '직접 입력' && (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <CustomInput
                    placeholder="0"
                    value={startAge}
                    onChangeText={setStartAge}
                    showButton={true}
                    buttonIcon={
                      <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                        세
                      </Text>
                    }
                    buttonDisabled={true}
                    maxLength={2}
                    keyboardType="number-pad"
                  />
                  <Text
                    style={[
                      textStyles.H6,
                      {
                        color: colors.Gray08,
                        paddingHorizontal: 8,
                        alignSelf: 'center',
                      },
                    ]}>
                    -
                  </Text>
                  <CustomInput
                    placeholder="0"
                    value={endAge}
                    onChangeText={setEndAge}
                    showButton={true}
                    buttonIcon={
                      <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                        세
                      </Text>
                    }
                    buttonDisabled={true}
                    maxLength={2}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={{height: 16}} />
              </View>
            )}
            <View style={{height: 16}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>차종</Text>
            <View style={{height: 16}} />
            <ChipContainer
              containerStyle={{flexDirection: 'row'}}
              type={'single'}
              data={['제한 없음', '직접 입력']}
              selectedItem={selectedCarModel}
              onSelectedHandler={items => resetCarModel(items)}
            />
            <View style={{height: 16}} />
            {selectedCarModel === '직접 입력' && (
              <View>
                <CustomInput
                  showButton={true}
                  isButtonText={false}
                  buttonIcon={
                    carModel.length > 0 ? (
                      <XIcon />
                    ) : (
                      <SearchIcon color={colors.Gray04} />
                    )
                  }
                  onButtonPress={() => setCarModel('')}
                  placeholder="차종을 입력해주세요"
                  value={carModel}
                  onChangeText={setCarModel}
                  buttonDisabled={carModel.length === 0}
                />
                <View style={{height: 16}} />
              </View>
            )}
            <View style={{height: 16}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>
              운전 경력
            </Text>
            <View style={{height: 16}} />
            <ChipContainer
              containerStyle={{flexDirection: 'row'}}
              type={'single'}
              data={['제한 없음', '직접 입력']}
              selectedItem={selectedCarCareer}
              onSelectedHandler={items => resetCarCareer(items)}
            />
            <View style={{height: 16}} />
            {selectedCarCareer === '직접 입력' && (
              <CustomInput
                placeholder="0"
                value={minCarCareer}
                onChangeText={setMinCarCareer}
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
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
      <View style={{padding: 16, elevation: 10, backgroundColor: colors.BG, position: 'static'}}>
        <CustomButton
          title={step < 3 ? '다음' : '모임 만들기'}
          onPress={handleNextStep}
          disabled={createButtonDisabled()}
        />
      </View>
    </SafeAreaView>
  );
};

export default MeetCreate;