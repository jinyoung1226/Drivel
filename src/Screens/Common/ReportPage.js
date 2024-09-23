import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon';
import CustomChip from '../../components/CustomChip';
import CustomButton from '../../components/CustomButton';
import ChipContainer from '../../components/ChipContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authApi} from '../../api/api';
const ReportPage = ({navigation, route}) => {
  const [selectedReportReason, setSelectedReportReason] = useState([]);
  const [isReportTextActive, setIsReportTextActive] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const targetId = route.params.targetId;
  const reportReason = [
    {
      id: '욕설, 비방, 혐오표현을 사용해요',
      displayName: '욕설, 비방, 혐오표현을 사용해요',
    },
    {
      id: '자살, 협박 등 폭력적인 행동을 해요',
      displayName: '자살, 협박 등 폭력적인 행동을 해요',
    },
    {
      id: '부적절한 목적의 대화를 시도해요',
      displayName: '부적절한 목적의 대화를 시도해요',
    },
    {
      id: '성적 수치심을 유발하는 발언을 해요',
      displayName: '성적 수치심을 유발하는 발언을 해요',
    },
    {
      id: '사전 동의 없이 홍보 또는 광고를 해요',
      displayName: '사전 동의 없이 홍보 또는 광고를 해요',
    },
    {
      id: '영리 목적의 글을 게시해요',
      displayName: '영리 목적의 글을 게시해요',
    },
    {
      id: '명예 훼손 및 차별적 발언을 해요',
      displayName: '명예 훼손 및 차별적 발언을 해요',
    },
    {
      id: '저작권 도용 의심(사진 등)이 들어요',
      displayName: '저작권 도용 의심(사진 등)이 들어요',
    },
    {
      id: '허위사실을 유포해요',
      displayName: '허위사실을 유포해요',
    },
    {
      id: '마약, 불법 주류 소비 등의 불법행위가 의심돼요',
      displayName: '마약, 불법 주류 소비 등의 불법행위가 의심돼요',
    },
    {
      id: '정치, 종교 등 본래 목적과 벗어나는 발언을 해요',
      displayName: '정치, 종교 등 본래 목적과 벗어나는 발언을 해요',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '신고하기',
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
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isReportTextActive && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [isReportTextActive]);

  useEffect(() => {
    if (isReportTextActive) {
      const customIndex = selectedReportReason.findIndex(
        reason => typeof reason === 'string' && reason.startsWith('기타:'),
      );
      if (customIndex !== -1) {
        const updatedReasons = [...selectedReportReason];
        updatedReasons[customIndex] = `기타: ${reportText}`;
        setSelectedReportReason(updatedReasons);
      } else if (reportText) {
        setSelectedReportReason(prevReasons => [
          ...prevReasons,
          `기타: ${reportText}`,
        ]);
      }
    }
  }, [reportText]);

  useEffect(() => {
    console.log(selectedReportReason);
  }, [selectedReportReason]);

  const handleCustomChipPress = () => {
    setIsReportTextActive(!isReportTextActive);
    if (!isReportTextActive) {
      setSelectedReportReason(prevReasons => [
        ...prevReasons,
        `기타: ${reportText}`,
      ]);
    }
    if (isReportTextActive) {
      setSelectedReportReason(prevReasons =>
        prevReasons.filter(reason => !reason.startsWith('기타:')),
      );
      setReportText(''); // 입력창 초기화
    }
  };

  const report = async () => {
    setIsLoading(true);
    console.log(selectedReportReason);
    try {
      const response = await authApi.post('/report/member', {
        targetId: targetId,
        descriptions: selectedReportReason,
      });
      if (response.status === 200) {
        Alert.alert(response.data.message);
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <View style={{height: 16}} />
      <Text
        style={[textStyles.H3, {color: colors.Gray10, alignSelf: 'center'}]}>
        {/* {targetId} */}
        신고 사유를 선택해 주세요
      </Text>
      <View style={{height: 8}} />
      <KeyboardAwareScrollView
        style={{backgroundColor: colors.BG}}
        ref={scrollViewRef}>
        <View style={{padding: 16}}>
          <ChipContainer
            data={reportReason}
            type={'multi'}
            selectedItem={selectedReportReason}
            onSelectedHandler={items => setSelectedReportReason(items)}
            containerStyle={{flexDirection: 'column'}}
            chipStyle={{paddingVertical: 12}}
            textStyle={[textStyles.B3]}
          />
          <CustomChip
            item={'기타'}
            onPressHandler={() => {
              handleCustomChipPress();
            }}
            chipStyle={{paddingVertical: 12}}
            textStyle={[textStyles.B3]}
            isActive={isReportTextActive}
          />
          {isReportTextActive && (
            <TextInput
              style={[
                textStyles.C4,
                {
                  color: colors.Gray10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.Gray03,
                  paddingHorizontal: 16,
                  height: 190,
                  textAlignVertical: 'top',
                },
              ]}
              placeholder={
                '다른 불쾌한 일을 겪으셨나요?\n신고 내용을 입력해주세요 (최대 200자)'
              }
              placeholderTextColor={colors.Gray04}
              multiline={true}
              value={reportText}
              onChangeText={text => setReportText(text)}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      <View style={{padding: 16, backgroundColor: colors.BG, elevation: 10}}>
        <CustomButton
          title={'신고하기'}
          onPress={() => report()}
          disabled={selectedReportReason.length == 0 || isLoading}
        />
      </View>
    </View>
  );
};

export default ReportPage;
