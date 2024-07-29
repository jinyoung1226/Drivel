import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import CustomButton from '../components/CustomButton';
import BackIcon from '../assets/icons/BackIcon.svg';
import ChipContainer from '../components/ChipContainer';
import {
  regions,
  driveStyle,
  driveTheme,
  driveWith,
} from '../assets/onboardingData/onBoardingData';
import {authApi} from '../api/api';
import {setOnboarded} from '../features/auth/authActions';
import {useDispatch} from 'react-redux';
import ProgressBar from '../components/ProgressBar';
const OnboardingPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedDriveStyle, setSelectedDriveStyle] = useState([]);
  const [selectedDriveView, setSelectedDriveView] = useState([]);
  const [selectedDriveWith, setSelectedDriveWith] = useState([]);

  const handleNextStep = async () => {
    if (step < 4) {
      setStep(step + 1);
    }
    if (step === 4) {
      try {
        const response = await authApi.post('onboarding', {
          regionIds: selectedRegion,
          togetherIds: selectedDriveWith,
          themeIds: selectedDriveView,
          styleIds: selectedDriveStyle,
        });
        if (response.status === 200) {
          setStep(step + 1);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log('서버 접속 오류');
        }
      }
    }
    if (step === 5) {
      dispatch(setOnboarded(true));
    }
  };

  const ButtonDisabled = () => {
    if (step === 1) {
      return selectedRegion.length === 0;
    }
    if (step === 2) {
      return selectedDriveWith.length === 0;
    }
    if (step === 3) {
      return selectedDriveView.length === 0;
    }
    if (step === 4) {
      return selectedDriveStyle.length === 0;
    }
  };

  const handleBackPress = () => {
    if (step === 1 || step === 5) {
    } else {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

  useEffect(() => {
    console.log(selectedDriveStyle);
  }, [selectedDriveStyle]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [step]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      {step == 1 || 5 ? (
        <View style={{height: 57}} />
      ) : (
        <TouchableOpacity onPress={handleBackPress} style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      )}
      {step !== 5 && <ProgressBar step={step} stepCount={4} />}
      {step === 1 ? (
        <View style={{flex: 1, padding: 16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            어느 지역에서 드라이브를{'\n'}즐기시나요?
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.M14, {color: colors.Gray06}]}>
            최대 3개 선택 가능해요
          </Text>
          <View style={{height: 40}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row', width: '70%'}}
            type={'multi'}
            data={regions}
            selectedItem={selectedRegion}
            onSelectedHandler={items => setSelectedRegion(items)}
          />
        </View>
      ) : step === 2 ? (
        <View style={{flex: 1, padding: 16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            평소 누구와 함께{'\n'}드라이브를 즐기시나요?
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.M14, {color: colors.Gray06}]}>
            최대 3개 선택 가능해요
          </Text>
          <View style={{height: 40}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row', width: '70%'}}
            type={'multi'}
            data={driveWith}
            selectedItem={selectedDriveWith}
            onSelectedHandler={items => setSelectedDriveWith(items)}
          />
        </View>
      ) : step == 3 ? (
        <View style={{flex: 1, padding: 16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            드라이브하면서{'\n'}기대하는 풍경은 무엇인가요?
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.M14, {color: colors.Gray06}]}>
            최대 3개 선택 가능해요
          </Text>
          <View style={{height: 40}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row', width: '70%'}}
            type={'multi'}
            data={driveTheme}
            selectedItem={selectedDriveView}
            onSelectedHandler={items => setSelectedDriveView(items)}
          />
        </View>
      ) : step == 4 ? (
        <View style={{flex: 1, padding: 16}}>
          <Text style={[textStyles.H1, {color: colors.Gray10}]}>
            무엇을 위해{'\n'}드라이브하시나요?
          </Text>
          <View style={{height: 16}} />
          <Text style={[textStyles.M14, {color: colors.Gray06}]}>
            최대 3개 선택 가능해요
          </Text>
          <View style={{height: 40}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row', width: '70%'}}
            type={'multi'}
            data={driveStyle}
            selectedItem={selectedDriveStyle}
            onSelectedHandler={items => setSelectedDriveStyle(items)}
          />
        </View>
      ) : (
        <View
          style={{
            padding: 16,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              textStyles.H1,
              {color: colors.Gray10, textAlign: 'center'},
            ]}>
            이제 본인의 취향에 맞는{'\n'}드라이브 코스를{'\n'}추천 받을 수
            있어요!
          </Text>
        </View>
      )}
      <View style={{padding: 16}}>
        <CustomButton
          title={step < 4 ? '다음' : step == 4 ? '완료하기' : '시작하기'}
          onPress={handleNextStep}
          disabled={ButtonDisabled()}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingPage;
