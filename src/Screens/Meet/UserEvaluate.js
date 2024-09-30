import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  BackHandler,
  Alert,
  Image,
  Pressable,
  Modal
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon';
import CustomChip from '../../components/CustomChip';
import CustomButton from '../../components/CustomButton';
import ChipContainer from '../../components/ChipContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authApi} from '../../api/api';
import { useDispatch } from 'react-redux';
import { getFeedbackUserList } from '../../features/meet/meetActions';
const UserEvaluate = ({navigation, route}) => {
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [isFeedbackTextActive, setIsFeedbackTextActive] = useState(false);
  const [reportText, setReportText] = useState('');
  const [step, setStep] = useState(1);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  // const targetId = route.params.targetId;

  const dispatch = useDispatch();
  const {targetId, meetingId, imagePath, nickname, description} = route.params;
  const goodReason = [
    {
      id: '1',
      displayName: '약속시간을 잘 지켜요',
    },
    {
      id: '2',
      displayName: '운전이 안전하고 신중해요',
    },
    {
      id: '3',
      displayName: '경로를 잘 파악하고 있어요',
    },
    {
      id: '4',
      displayName: '주변 경치나 명소에 대해 잘 알고 있어요',
    },
    {
      id: '5',
      displayName: '필요할 때 도움을 잘 줘요',
    },
    {
      id: '6',
      displayName: '친절하고 배려심이 있어요',
    },
    {
      id: '7',
      displayName: '대화가 즐겁고 유쾌해요',
    },
    {
      id: '8',
      displayName: '새로운 사람들과 쉽게 어울려요',
    }
  ];

  const badReason = [
    {
      id: '1',
      displayName: '무례하거나 배려심이 부족해요',
    },
    {
      id: '2',
      displayName: '불쾌한 농담이나 인신공격적인 말을 해요',
    },
    {
      id: '3',
      displayName: '욕설·비방·혐오적인 표현을 사용해요',
    },
    {
      id: '4',
      displayName: '약속시간에 늦었어요',
    },
    {
      id: '5',
      displayName: '성적 수치심을 유발하는 발언이나 행동을 해요',
    },
    {
      id: '6',
      displayName: '운전이 불안하고 난폭해요',
    },
    {
      id: '7',
      displayName: '신호위반, 과속 등 교통 법규를 위반해요',
    },
  ];

  const backAction = () => {
    // console.log(step);
    if (step === 1) {
      // navigation.goBack();
      setModalVisible(true);
    } else {
      setStep(step -1);
      setSelectedFeedback([]);
      setIsFeedbackTextActive(false);
      setReportText('');
    }
    return true;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '사용자 평가',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            backAction();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, step]);

  useEffect(() => {
    
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [step]);

  useEffect(() => {
    if (isFeedbackTextActive && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [isFeedbackTextActive]);

  useEffect(() => {
    if (isFeedbackTextActive) {
      const customIndex = selectedFeedback.findIndex(
        reason => typeof reason === 'string' && reason.startsWith('기타:'),
      );
      if (customIndex !== -1) {
        const updatedReasons = [...selectedFeedback];
        updatedReasons[customIndex] = `기타: ${reportText}`;
        setSelectedFeedback(updatedReasons);
      } else if (reportText) {
        // setSelectedFeedback(prevReasons => [
        //   ...prevReasons,
        //   `기타: ${reportText}`,
        // ]);
      }
    }
  }, [reportText]);

  useEffect(() => {
    console.log(selectedFeedback);
  }, [selectedFeedback]);

  const handleCustomChipPress = () => {
    setIsFeedbackTextActive(!isFeedbackTextActive);
    if (!isFeedbackTextActive) {
      // setSelectedFeedback(prevReasons => [
      //   ...prevReasons,
      //   `기타: ${reportText}`,
      // ]);
    }
    if (isFeedbackTextActive) {
      // setSelectedFeedback(prevReasons =>
      //   prevReasons.filter(reason => !reason.startsWith('기타:')),
      // );
      setReportText(''); // 입력창 초기화
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const feedback = async () => {
    console.log(selectedFeedback);
    try {
      const response = await authApi.post('/feedback', {
        targetMemberId: targetId,
        meetingId: meetingId,
        isPositive: feedbackStatus == 'GOOD' ? true : false,
        feedbackIds: selectedFeedback,
      });
      if (response.status === 200) {
        dispatch(getFeedbackUserList({meetingId: meetingId}));
        Alert.alert('사용자 평가를 완료했어요', '평가가 성공적으로 완료되었습니다.')
        navigation.goBack();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const UserInfo = () => {
    return (
      <View style={{backgroundColor:colors.Gray02, borderRadius:10, padding:16, flexDirection:'row', alignItems:'center', margin:16}}>
        <View
          style={{
            width: 50,
            height: 50,
            overflow: 'hidden',
            borderRadius: 100,
            backgroundColor: colors.Gray04,
          }}>
          <Image style={{flex: 1}} src={imagePath} />
        </View>
        <View style={{width: 24}} />
        <View style={{flex:1}}>
          <Text style={[textStyles.H5, {color: colors.Gray10}]}>{nickname}</Text>
          <View style={{height: 4}} />
          <Text style={[textStyles.B4, {color: colors.Gray06}]}>{description}</Text>
        </View>
      </View>
    )
  }

  const handleFeedbackPress = (status) => {
    if (feedbackStatus == status) {
      setFeedbackStatus(null)
    } else {
      setFeedbackStatus(status)
    }
  }
   
  const FeedbackButton = ({icon, title, status}) => {
    return (
      <Pressable
        style={{paddingHorizontal: 16, paddingVertical: 5, backgroundColor: feedbackStatus == status ? colors.Blue: colors.Light_Blue, borderRadius: 100, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => handleFeedbackPress(status)}
      >
        <Text style={[textStyles.H1, {color:colors.Blue}]}>
        {icon}
        </Text>
        <View style={{width: 8}} />
        <Text style={[textStyles.B3, {color:  feedbackStatus == status ? colors.Light_Blue : colors.Blue}]}>
        {title}
        </Text>
      </Pressable>
    )
  }

  
  const QuitModal = () => {

    const modalClose = () => {
      setModalVisible(!modalVisible);
    };
    
    return (
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            modalClose();
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              modalClose();
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 10,
              padding: 24,
            }}>
            <Text
              style={[
                textStyles.H3,
                {color: colors.Gray10, textAlign: 'center'},
              ]}>
              {'작성을 그만두시겠어요?'}
            </Text>
            <View style={{height: 8}} />
            <Text
              style={[
                textStyles.C4,
                {color: colors.Gray05, textAlign: 'center'},
              ]}>
              {'작성내용이 저장되지 않을 수 있어요'}
            </Text>
            <View style={{height: 24}} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <CustomButton
                  style={{backgroundColor: colors.Gray02}}
                  textStyle={{color: colors.Gray07}}
                  title={'그만두기'}
                  onPress={() => {
                    modalClose();
                    navigation.goBack();
                  }}
                />
              </View>
              <View style={{width: 8}} />
              <View style={{flex: 1}}>
                <CustomButton
                  title={'계속하기'}
                  onPress={() => {
                    modalClose();
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{width: 32}}
            onPress={() => {
              modalClose();
            }}
          />
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            modalClose();
          }}
        />
      </View>
    </Modal>
    )
  } 

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <QuitModal />
      {step === 1 ? (
        <View style={{ flex:1, justifyContent:'center'}}>
          <Text
          style={[textStyles.H2, {color: colors.Blue, alignSelf: 'center'}]}>
            함께 한 모임은 어떠셨어요?
          </Text>
          <View style={{height: 16}} />
          <Text
          style={[textStyles.C4, {color: colors.Gray05, textAlign:'center'}]}>
          {/* {targetId} */}
            {'사용자 평가를 남기면\n상대방의 드라이브 온도에 반영됩니다.\n모임을 함께했던 사용자를 평가해주세요'}
          </Text>
          <View style={{height: 24}} />
          <UserInfo />
          <View style={{height: 40}} />
          <View style={{flexDirection: 'row', justifyContent:'center'}}>
            <FeedbackButton icon={'😊'} title={'좋았어요'} status={"GOOD"} />
            <View style={{width: 16}} />
            <FeedbackButton icon={'☹️'} title={'아쉬웠어요'} status={"BAD"} />
          </View>
        </View>
      ) : (
      <View style={{flex:1}}>
        <View style={{height: 24}} />
        <Text
          style={[textStyles.H3, {color: colors.Blue, alignSelf: 'center'}]}>
          {feedbackStatus == 'GOOD' ? "함께하며 어떤 점이 좋았나요?" : "함께하며 어떤 점이 아쉬웠나요?"}
        </Text>
        <View style={{height: 8}} />
        <Text
        style={[textStyles.C4, {color: colors.Gray05, textAlign:'center'}]}>
        {/* {targetId} */}
          최대 4개까지 선택 가능해요
        </Text>
        <UserInfo />
        <KeyboardAwareScrollView
          style={{backgroundColor: colors.BG}}
          ref={scrollViewRef}>
          <View style={{padding: 16}}>
            <ChipContainer
              data={feedbackStatus == 'GOOD' ? goodReason : badReason}
              type={'multi'}
              maxSelection={4}
              selectedItem={selectedFeedback}
              onSelectedHandler={items => setSelectedFeedback(items)}
              containerStyle={{flexDirection: 'column'}}
              chipStyle={{paddingVertical: 12}}
              textStyle={[textStyles.B3]}
            />
            {/* {feedbackStatus == 'BAD' &&
            <CustomChip
              item={'기타'}
              onPressHandler={() => {
                handleCustomChipPress();
              }}
              chipStyle={{paddingVertical: 12}}
              textStyle={[textStyles.B3]}
              isActive={isFeedbackTextActive}
            />} */}
            {isFeedbackTextActive && (
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
      </View>
      )}
      
      <View style={{padding: 16, backgroundColor: colors.BG, elevation: 10}}>
        <CustomButton
          title={step === 1 ? '다음' : '평가하기'}
          onPress={() => step === 1 ? handleNext() :feedback()}
          disabled={step === 1 ? feedbackStatus == null : selectedFeedback.length == 0}
        />
      </View>
    </View>
  );
};

export default UserEvaluate;
