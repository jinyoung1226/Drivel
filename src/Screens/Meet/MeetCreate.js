import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  Pressable,
} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon';
import ChipContainer from '../../components/ChipContainer';
import DatePickerModal from '../../components/DatePickerModal';
import {useDispatch} from 'react-redux';
import {
  getMeetList,
  getMeetListRecommended,
  getMyMeetList,
} from '../../features/meet/meetActions';
import {authApi} from '../../api/api';
import CourseListItem from './CourseListItem';
import ProgressBar from '../../components/ProgressBar';
import formatDate from '../../utils/formatDate';
import koFilter from '../../utils/koFilter';
import {api} from '../../api/api';
import {carModelData} from '../../assets/driveCourseData/carModelData';
import Check from '../../assets/icons/Check';
const MeetCreate = ({navigation}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [driveCourse, setDriveCourse] = useState('');
  const [selctedDriveCourse, setSelectedDriveCourse] = useState('');
  const [courseId, setCourseId] = useState('');
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
  const [courses, setCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const getDriveCourseList = async () => {
    try {
      const response = await api.get(
        'https://drivel-course-data.s3.ap-northeast-2.amazonaws.com/course-data',
      );
      if (response.status === 200) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchCarModel = e => {
    setCarModel(e);
    setFilteredCarData(koFilter(carModelData, e));
  };

  const handleSearch = e => {
    setDriveCourse(e);
    setFilteredData(koFilter(courses, e));
  };

  useEffect(() => {
    getDriveCourseList();
  }, []);

  const handleBackPress = () => {
    if (step === 1) {
      navigation.goBack(); // 기본 동작: 이전 화면으로 돌아가기
    } else {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

  useLayoutEffect(() => {
    // 뒤로가기 버튼을 눌렀을 때 동작할 함수
    navigation.setOptions({
      title: '모임 만들기',
      headerTitleAlign: 'center',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
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
    setStartAge('');
    setEndAge('');
  };

  const resetCarCareer = items => {
    setSelectedCarCareer(items);
    setMinCarCareer('');
  };

  const resetCarModel = items => {
    setSelectedCarModel(items);
    setCarModel('');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [step]);

  const createMeeting = async () => {
    setIsCreating(true);
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
        navigation.goBack();
        dispatch(getMeetList({page: 0, size: 10, sort: 'id,DESC'}));
        dispatch(getMeetListRecommended({page: 0, size: 3}));
        dispatch(getMyMeetList());
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
    setIsCreating(false);
  };

  const createButtonDisabled = () => {
    if (step === 1) {
      return (
        title === '' || date === '' || description === '' || meetingPoint === ''
      );
    }
    if (step === 2) {
      return courseId === '';
    }
    if (step === 3) {
      return gender === null || selectedAge === ''
        ? true
        : (selectedAge === 1 ? false : startAge === '' || endAge === '') ||
          capacity === '' ||
          (selectedCarModel == 1 ? false : carModel === '') ||
          selectedCarCareer === ''
        ? true
        : selectedCarCareer === 1
        ? false
        : minCarCareer === '';
    }
  };

  const selectDriveCourse = item => {
    setCourseId(item.id);
    setDriveCourse(item.title);
    setSelectedDriveCourse(item);
    setFilteredData([]);
  };

  const selectCarModel = item => {
    setCarModel(item.title);
    setFilteredCarData([]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelect={selectedDate => {
          setDate(selectedDate);
          setIsDatePickerVisible(false);
          console.log(selectedDate);
        }}
      />
      <View style={{height: 16}} />
      <ProgressBar step={step} stepCount={3} />
      <View style={{height: 8}} />
      {step === 1 ? (
        <KeyboardAwareScrollView>
          <View style={{padding: 16}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              모임의 기본 정보를 입력해주세요
            </Text>
            <View style={{height: 16}} />
            <Text style={[textStyles.B4, {color: colors.Gray05}]}>
              * 커뮤니티 이용 규칙에 벗어나는 모임은 사전 고지 없이 삭제될 수
              있으며, 서비스 이용이 일정 기간 제한될 수 있어요.
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
                {date ? formatDate(date) : '날짜를 선택하세요'}
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
        </KeyboardAwareScrollView>
      ) : step === 2 ? (
        <View style={{flex: 1, padding: 16}}>
          <View style={{height: 16}} />
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            드라이브 코스를 선택해주세요
          </Text>
          <View style={{height: 32}} />
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
            onButtonPress={() => {
              setDriveCourse('');
              setCourseId('');
            }}
            placeholder="드라이브 코스"
            value={driveCourse}
            onChangeText={handleSearch}
            buttonDisabled={driveCourse.length === 0}
          />
          <View style={{height: 8}} />
          {filteredData.length !== 0 && driveCourse.length !== 0 && (
            <KeyboardAwareScrollView
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.Gray03,
                flexGrow: 0,
              }}>
              {filteredData.map(item => (
                <CourseListItem
                  key={item.id}
                  item={item}
                  onPress={() => selectDriveCourse(item)}
                />
              ))}
            </KeyboardAwareScrollView>
          )}
          {courseId !== '' && (
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.Blue,
                borderRadius: 10,
              }}>
              <CourseListItem item={selctedDriveCourse} disabled={true} />
            </View>
          )}
        </View>
      ) : (
        <KeyboardAwareScrollView>
          <View style={{padding: 16}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              어떤 사람들과 모임을 함께 하고 싶나요?
            </Text>
            <View style={{height: 40}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>성별</Text>
            <View style={{height: 16}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 4}}
                onPress={() => setGender(2)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: gender == 2 ? colors.Blue : colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 2 ? colors.Blue : null,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {gender == 2 && <Check />}
                </View>
                <View style={{width: 4}} />
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  여자
                </Text>
              </TouchableOpacity>
              <View style={{width: 16}} />
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 4}}
                onPress={() => setGender(1)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: gender == 1 ? colors.Blue : colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 1 ? colors.Blue : null,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {gender == 1 && <Check />}
                </View>
                <View style={{width: 4}} />
                <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                  남자
                </Text>
              </TouchableOpacity>
              <View style={{width: 16}} />
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 4}}
                onPress={() => setGender(0)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderColor: gender == 0 ? colors.Blue : colors.Gray04,
                    borderWidth: 1,
                    backgroundColor: gender == 0 ? colors.Blue : null,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {gender == 0 && <Check />}
                </View>
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
              data={[
                {id: 1, displayName: '제한 없음'},
                {id: 2, displayName: '직접 입력'},
              ]}
              selectedItem={selectedAge}
              onSelectedHandler={items => resetAge(items)}
            />
            <View style={{height: 16}} />
            {selectedAge === 2 && (
              <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
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
                  </View>
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
                  <View style={{flex: 1}}>
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
              data={[
                {id: 1, displayName: '제한 없음'},
                {id: 2, displayName: '직접 입력'},
              ]}
              selectedItem={selectedCarModel}
              onSelectedHandler={items => resetCarModel(items)}
            />
            <View style={{height: 16}} />
            {selectedCarModel === 2 && (
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
                  onChangeText={handleSearchCarModel}
                  buttonDisabled={carModel.length === 0}
                />
                {filteredCarData.length !== 0 && carModel.length !== 0 && (
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
              </View>
            )}
            <View style={{height: 32}} />
            <Text style={[textStyles.H4, {color: colors.Gray10}]}>
              운전 경력
            </Text>
            <View style={{height: 16}} />
            <ChipContainer
              containerStyle={{flexDirection: 'row'}}
              type={'single'}
              data={[
                {id: 1, displayName: '제한 없음'},
                {id: 2, displayName: '직접 입력'},
              ]}
              selectedItem={selectedCarCareer}
              onSelectedHandler={items => resetCarCareer(items)}
            />
            <View style={{height: 16}} />
            {selectedCarCareer === 2 && (
              <View>
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
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      )}

      <View
        style={{
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
          position: 'static',
        }}>
        <CustomButton
          title={step < 3 ? '다음' : '모임 만들기'}
          onPress={handleNextStep}
          disabled={createButtonDisabled() || isCreating}
        />
      </View>
    </SafeAreaView>
  );
};

export default MeetCreate;
