import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler, Image, Dimensions} from 'react-native';
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
import StarIcon from '../../assets/icons/StarIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import DatePickerModal from '../../components/DatePickerModal';
import {useDispatch} from 'react-redux';
import {
  getMeetList,
  getMeetListRecommended,
} from '../../features/meet/meetActions';
import {authApi} from '../../api/api';
import {courses} from '../../assets/driveCourseData/driveCourseData';

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
  const [filteredData, setFilteredData] = useState(courses);

  const width = Dimensions.get('window').width;
  const handleSearch = (e) => {
    setDriveCourse(e);
    setFilteredData(filterData(courses, e));
  };
  const decomposeHangul = (s) => {
    const CHO = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const JUNG = [
      'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    ];
    const JONG = [
      '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
  
    const chars = s.split('');
    let result = '';
  
    for (let i = 0; i < chars.length; i++) {
      const code = chars[i].charCodeAt(0) - 44032;
  
      if (code >= 0 && code <= 11171) {
        const cho = Math.floor(code / 588);
        const jung = Math.floor((code - (cho * 588)) / 28);
        const jong = code % 28;
  
        result += CHO[cho] + JUNG[jung] + JONG[jong];
      } else {
        result += chars[i];
      }
    }
  
    return result;
  };
  

  const filterData = (data, query) => {
    const decomposedQuery = decomposeHangul(query);
  
    const startsWith = [];
    const contains = [];
  
    data.forEach(item => {
      const decomposedItem = decomposeHangul(item.title);
      if (decomposedItem.startsWith(decomposedQuery) || item.title.startsWith(query)) {
        startsWith.push(item);
      } else if (decomposedItem.includes(decomposedQuery) || item.title.includes(query)) {
        contains.push(item);
      }
    });
  
    return [...startsWith, ...contains].slice(0, 10);;
  };

  useEffect(() => {
    console.log('@@@', courseId);
  }, [courseId]);
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


  useEffect(() => {
    console.log(date, 'meetCreate date');
    console.log(selectedAge, selectedCarCareer, selectedCarModel, 'xptm', )
  }, [selectedAge, selectedCarCareer, selectedCarModel]);

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
      return courseId === '';
    }
    if (step === 3) {
      return gender === null || selectedAge === '' ? true : (selectedAge === 1 ? false : startAge === '' || endAge === '') || capacity === '' || (selectedCarModel == 1 ? false : carModel === '') || selectedCarCareer === '' ? true : (selectedCarCareer === 1 ? false : minCarCareer === '');
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
      {step ===2 && 
      <View style={{paddingHorizontal:16}}>
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
          onButtonPress={() => {setDriveCourse(''); setCourseId('')}}
          placeholder="드라이브 코스"
          value={driveCourse}
          onChangeText={handleSearch}
          buttonDisabled={driveCourse.length === 0}
        />
      </View>}
        {step === 1 ? (
          <KeyboardAwareScrollView>
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
          </KeyboardAwareScrollView>
        ) : step === 2 ? (
          <KeyboardAwareScrollView style={{margin:16, borderRadius:10}}>
            {driveCourse !== '' && 
            <View>
              {filteredData.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={{flexDirection: 'row', padding:16, borderBottomWidth:1, borderColor:colors.Gray02}}
                  onPress={() => {setCourseId(item.id); setDriveCourse(item.title); setSelectedDriveCourse(item); setFilteredData([]);}}
                  >
                  <View style={{flex:1}}>
                  <Text style={[textStyles.H5, {color:colors.Gray10}]} numberOfLines={1}>{item.title}</Text>
                  <View style={{height:4}}/>
                  <Text style={[textStyles.H5, {color:colors.Gray10}]} numberOfLines={1}>{item.waypoints}</Text>
                  <View style={{height:8}}/>
                  <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <StarIcon/>
                    <View style={{width:4}}/>
                    <Text style={[textStyles.B4, {color:colors.Gray08}]} numberOfLines={1}>{item.rating}</Text>
                    <View style={{width:4}}/>
                    <Text style={[textStyles.B4, {color:colors.Gray05}]} numberOfLines={1}>({item.reviewCount})</Text>
                  </View>
                  </View>
                  <View style={{width:16}}/>
                  <View style={{width: 70, height: 70, borderRadius:10, overflow: 'hidden'}}>
                  <Image src={item.imagePath} style={{flex:1}}/>
                  </View>
                </TouchableOpacity>
              ))}
              
            </View>}
            
            {courseId !== '' ? (
              
              <View>
                <Text style={[textStyles.H2, {color: colors.Gray10}]}>
                  선택한 드라이브 코스
                </Text>
                <View style={{height: 16}} />
                <View style={{flexDirection: 'row'}}>
                <View style={{width: 90, height: 90, borderRadius:10, overflow: 'hidden'}}>
                    <Image src={selctedDriveCourse.imagePath} style={{flex:1}}/>
                  </View>
                  <View style={{width: 16}} />
                  <View style={{flex:1}}>
                    <Text style={[textStyles.H4, {color: colors.Gray09}]}>{selctedDriveCourse.title}</Text>
                  </View>
                   
                </View>
              </View>
              ) : (
              <View style={{height: 32}} />
              )}
          </KeyboardAwareScrollView>
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
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => setGender(2)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderColor: gender == 2 ? colors.Blue : colors.Gray04,
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
                      borderColor: gender == 1 ? colors.Blue : colors.Gray04,
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
                      borderColor: gender == 0 ? colors.Blue : colors.Gray04,
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
                data={[{id:1, displayName:'제한 없음'}, {id:2, displayName:'직접 입력'}]}
                selectedItem={selectedAge}
                onSelectedHandler={items => resetAge(items)}
              />
              <View style={{height: 16}} />
              {selectedAge === 2 && (
                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
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
                data={[{id:1, displayName:'제한 없음'}, {id:2, displayName:'직접 입력'}]}
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
                data={[{id:1, displayName:'제한 없음'}, {id:2, displayName:'직접 입력'}]}
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
      <View style={{flex:1}} />
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
          disabled={createButtonDisabled()}
        />
      </View>
    </SafeAreaView>
  );
};

export default MeetCreate;
