import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
  Dimensions,
  Animated,
  InputAccessoryView,
  Platform,
} from 'react-native';
import BackIcon from '../../assets/icons/BackIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authApi} from '../../api/api';
import colors from '../../styles/colors';
import MeetInfo from './MeetInfo';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
import CustomButton from '../../components/CustomButton';
import formatDate from '../../utils/formatDate';
import MeetCourseInfo from './MeetCourseInfo';
import Tabs from '../../components/Tabs';
import MeetChatBoard from './MeetChatBoard';
import {useDispatch, useSelector} from 'react-redux';
import {
  subscribeToChannel,
  unsubscribeToChannel,
  publish,
} from '../../features/websocket/websocketActions';
import CustomInput from '../../components/CustomInput';
import RenderingPage from '../../components/RenderingPage';
import KebabMenuIcon from '../../assets/icons/KebabMenuIcon';
import MenuModal from '../../components/MenuModal';
import RenderingHandIcon from '../../assets/icons/RenderingHand';
import ConfirmModal from '../../components/ConfirmModal';
import Check from '../../assets/icons/Check';
import {
  getMeetMessageList,
  setMeetMessageList,
  getMeetMessageListMore,
  setMeetMessageListNull,
  setParticipateStatus,
} from '../../features/meet/meetActions';
import eventEmitter from '../../utils/eventEmitter';
import CheckProfileModal from '../../components/CheckProfileModal';

const MeetDetail = ({route, navigation}) => {
  const [message, setMessage] = useState('');
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [courseInfo, setCourseInfo] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null); // ScrollView 참조
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [checkProfileModalVisible, setCheckProfileModalVisible] =
    useState(false);
  const [type, setType] = useState('');
  // const [participateStatus, setParticipateStatus] = useState('NONE');
  const [notice, setNotice] = useState(null);
  const [isNotice, setIsNotice] = useState(false);
  const scrollHeight = useRef(0);
  const [targetId, setTargetId] = useState(null);
  const [selectedChatItem, setSelectedChatItem] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {userId} = useSelector(state => state.auth);
  const {participateStatus} = useSelector(state => state.meet);
  const dispatch = useDispatch();

  const meetingId = route.params.meetingId;
  const courseId = route.params.courseId;
  const meetingTitle = route.params.meetingTitle;
  const {lastMessageId, isLastMessage, isLoading} = useSelector(
    state => state.meet,
  );
  const {width} = Dimensions.get('window');
  const [buttonHeight, setButtonHeight] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [tabHeight, setTabHeight] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const tabName = ['모임 정보', '코스 정보', '게시판'];

  useEffect(() => {
    console.log(scrollHeight.current);
  }, []);
  const getDriveCourseInfo = async () => {
    try {
      const response = await authApi.get(`course/${courseId}`);
      if (response.status == 200) {
        // console.log(response.data, 'course');
        setCourseInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  const getMeetingInfo = async () => {
    try {
      console.log('meetingId', meetingId);
      const response = await authApi.get(`meeting/${meetingId}`);
      if (response.status == 200) {
        console.log(response.data, 'meeting', '@@@@');
        setMeetingInfo(response.data);
        dispatch(setParticipateStatus(response.data.meetingInfo.status));
        if (response.data.meetingInfo.status == 'JOINED') {
          dispatch(
            subscribeToChannel({
              channel: `/sub/meeting/${meetingId}`,
              callback: message => {
                console.log(message, '@@@@@');
                const newMessage = JSON.parse(message.body);
                console.log(newMessage);
                dispatch(setMeetMessageList(newMessage)); // 새로운 메시지를 맨 위에 추가
              },
            }),
          );
          getMeetNotice();
          dispatch(getMeetMessageList({meetingId: meetingId, messageId: -1}));
        }
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  const getMeetNotice = async () => {
    try {
      const response = await authApi.get(`/meeting/${meetingId}/notice`);
      if (response.status == 200) {
        console.log(response.data, '@@@@');
        setNotice(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  const reSubscribe = () => {
    if (participateStatus == 'JOINED') {
      dispatch(
        subscribeToChannel({
          channel: `/sub/meeting/${meetingId}`,
          callback: message => {
            const newMessage = JSON.parse(message.body);
            console.log(newMessage);
            dispatch(setMeetMessageList(newMessage)); // 새로운 메시지를 맨 위에 추가
          },
        }),
      );
      getMeetNotice();
      dispatch(getMeetMessageList({meetingId: meetingId, messageId: -1}));
    }
  };

  useEffect(() => {
    eventEmitter.on('websocketConnected', reSubscribe);
    eventEmitter.on('meetAccepted', getMeetingInfo);
    getDriveCourseInfo();
    getMeetingInfo();
    return () => {
      dispatch(unsubscribeToChannel());
      dispatch(setMeetMessageListNull());
      eventEmitter.removeListener('websocketConnected', reSubscribe);
      eventEmitter.removeListener('meetAccepted', getMeetingInfo);
    };
  }, []);

  // useEffect(() => {
  //   if (participateStatus == "JOINED" && isConnected) {
  //     dispatch(subscribeToChannel({channel : `/sub/meeting/${meetingId}`, callback : (message) => {
  //       console.log(message, '@@@@@');
  //       const newMessage = JSON.parse(message.body);
  //       console.log(newMessage);
  //       dispatch(setMeetMessageList(newMessage)); // 새로운 메시지를 맨 위에 추가
  //     }}));
  //     getMeetNotice();
  //     dispatch(getMeetMessageList({meetingId: meetingId, messageId: -1}));
  //   }
  // }, [isConnected]);

  participateMeeting = async () => {
    setIsApplying(true);
    try {
      const response = await authApi.post(`/meeting/join`, {id: meetingId});
      if (response.status == 200) {
        console.log(response.data, 'participate');
        Alert.alert(response.data.message);
        dispatch(setParticipateStatus('WAITING'));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400) {
          console.log(error.response.status, error.response.data);
          setCheckProfileModalVisible(!checkProfileModalVisible);
        }
      } else {
        console.log('서버 접속 오류');
      }
    }
    setIsApplying(false);
  };

  cancelParticipateMeeting = async () => {
    setIsApplying(true);
    try {
      const response = await authApi.delete(`/meeting/join/${meetingId}`);
      if (response.status == 200) {
        console.log(response.data, 'cancel participate');
        Alert.alert(response.data.message);
        dispatch(setParticipateStatus('NONE'));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data.message);
      } else {
        console.log('서버 접속 오류');
      }
    }
    setIsApplying(false);
  };

  const scrollToTab = () => {
    scrollViewRef.current.scrollToPosition(0, width, true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meetingTitle,
      headerTitleStyle: [
        textStyles.H3,
        {
          color: colors.Gray10,
        },
      ],
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{padding: 16}}
          onPress={() => {
            setMenuModalVisible(!menuModalVisible);
          }}>
          <KebabMenuIcon color={colors.Gray10} />
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

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: false,
    })(event);
    if (offsetY > scrollHeight.current * 0.5) {
      if (
        !isLastMessage &&
        activeTab === 2 &&
        participateStatus == 'JOINED' &&
        !isLoading
      ) {
        dispatch(
          getMeetMessageListMore({
            meetingId: meetingId,
            messageId: lastMessageId,
          }),
        );
      }
    }
  };

  const sendMessage = async () => {
    setIsMessageSending(true);
    if (isNotice) {
      try {
        const response = await authApi.post(`/meeting/notice`, {
          meetingId: meetingId,
          content: message,
        });
        if (response.status == 200) {
          Alert.alert(response.data.message);
          setIsNotice(false);
          getMeetNotice();
          setTimeout(
            () => scrollViewRef.current.scrollToPosition(0, width + 40, true),
            100,
          );
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log('서버 접속 오류');
        }
      }
    }
    if (!isNotice) {
      dispatch(
        publish({
          destination: `/pub/meeting/${meetingId}`,
          header: 'application/json',
          senderId: userId,
          message: message,
        }),
      );
      setTimeout(
        () => scrollViewRef.current.scrollToPosition(0, width + 40, true),
        100,
      );
    }
    setMessage('');
    setIsMessageSending(false);
  };

  const handleLayout = (event, setHeight) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
    console.log('Content height:', height);
  };

  if (meetingInfo === null) {
    return <RenderingPage />;
  }

  return (
    <View
      style={{backgroundColor: colors.BG, flex: 1}}
      onLayout={e => handleLayout(e, setContainerHeight)}>
      <CheckProfileModal
        modalVisible={checkProfileModalVisible}
        setModalVisible={setCheckProfileModalVisible}
      />
      <ConfirmModal
        modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible}
        targetId={targetId}
        meetingId={meetingId}
        notcieId={notice ? notice.id : null}
        type={type}
        setNotice={setNotice}
        status={participateStatus}
        selectedChatItem={selectedChatItem}
        setSelectedChatItem={setSelectedChatItem}
      />
      <MenuModal
        modalVisible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
        confirmModalVisible={confirmModalVisible}
        setConfirmModalVisible={setConfirmModalVisible}
        setType={setType}
        setTargetId={setTargetId}
        masterId={meetingInfo.meetingInfo.masterInfo.id}
        meetingId={meetingId}
        status={participateStatus}
      />
      <KeyboardAwareScrollView
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollHeight.current = contentHeight;
        }}
        ref={scrollViewRef} // ScrollView 참조 연결
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={true}
        contentInsetAdjustmentBehavior="never"
        stickyHeaderIndices={[1]}
        scrollEnabled={scrollEnabled}>
        {courseInfo !== null && meetingInfo !== null && (
          <ImageBackground
            style={{width: width, height: width}}
            src={courseInfo.courseInfo.imagePath}>
            <LinearGradient
              style={{flex: 1}}
              colors={[
                'rgba(0, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0.7)',
              ]}>
              <View style={{flex: 1, padding: 16}}>
                <View style={{flex: 1}} />
                <Text style={[textStyles.H1, {color: colors.white}]}>
                  {meetingInfo.meetingInfo.title}
                </Text>
                <View style={{height: 8}} />
                <Text style={[textStyles.B3, {color: colors.Gray02}]}>
                  {courseInfo.courseInfo.title}
                </Text>
                <View style={{height: 4}} />
                <Text style={[textStyles.B3, {color: colors.Gray02}]}>
                  {formatDate(meetingInfo.meetingInfo.date)} 모임
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
        <View onLayout={e => handleLayout(e, setTabHeight)}>
          <Tabs
            tabName={tabName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scrollToTab={scrollToTab}
          />
        </View>
        {meetingInfo !== null && courseInfo !== null && (
          <View>
            {activeTab === 0 && <MeetInfo item={meetingInfo} />}
            {activeTab === 1 && (
              <MeetCourseInfo
                item={courseInfo}
                setScrollEnabled={setScrollEnabled}
              />
            )}
            {activeTab === 2 &&
              (participateStatus == 'JOINED' ? (
                <MeetChatBoard
                  notice={notice}
                  confirmModalVisible={confirmModalVisible}
                  setConfirmModalVisible={setConfirmModalVisible}
                  setType={setType}
                  setTargetId={setTargetId}
                  minHeight={containerHeight - buttonHeight - tabHeight}
                  selectedChatItem={selectedChatItem}
                  setSelectedChatItem={setSelectedChatItem}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    height: containerHeight - buttonHeight - tabHeight,
                  }}>
                  <View style={{flex: 1}} />
                  <RenderingHandIcon />
                  <View style={{height: 16}} />
                  <Text
                    style={[
                      textStyles.H4,
                      {
                        color: colors.Gray10,
                        textAlign: 'center',
                        lineHeight: 24,
                      },
                    ]}>
                    {
                      '모임 게시판은 모임 참여 후에\n사용할 수 있어요\n지금 모임에 참여해보세요!'
                    }
                  </Text>
                  <View style={{flex: 1}} />
                </View>
              ))}
          </View>
        )}
      </KeyboardAwareScrollView>
      <View onLayout={e => handleLayout(e, setButtonHeight)}>
        {Platform.OS == 'ios' ? (
          <InputAccessoryView backgroundColor={colors.BG}>
            {participateStatus == 'JOINED' ? (
              <>
                {activeTab === 2 && (
                  <View
                    style={{
                      padding: 16,
                      elevation: 10,
                      backgroundColor: colors.BG,
                      paddingTop: 8,
                    }}>
                    {userId == meetingInfo.meetingInfo.masterInfo.id && (
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                          setIsNotice(!isNotice);
                        }}>
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderColor: isNotice ? colors.Blue : colors.Gray04,
                            borderWidth: 1,
                            backgroundColor: isNotice ? colors.Blue : null,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {isNotice && <Check color={colors.white} />}
                        </View>
                        <View style={{width: 8}} />
                        <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                          공지
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View style={{height: 8}} />
                    <CustomInput
                      onfocus={() =>
                        setTimeout(
                          () =>
                            scrollViewRef.current.scrollToPosition(
                              0,
                              width,
                              true,
                            ),
                          300,
                        )
                      }
                      placeholder={'메시지를 입력해주세요'}
                      containerStyle={{backgroundColor: colors.Gray01}}
                      value={message}
                      onChangeText={setMessage}
                      showButton={true}
                      onButtonPress={() => sendMessage()}
                      buttonIcon={
                        <Text
                          style={[
                            textStyles.B3,
                            {
                              color:
                                isMessageSending || message.length == 0
                                  ? colors.Gray06
                                  : colors.Blue,
                            },
                          ]}>
                          등록
                        </Text>
                      }
                      multiline={true}
                      onSubmitEditing={() => sendMessage()}
                      buttonDisabled={message.length == 0 || isMessageSending}
                    />
                  </View>
                )}
              </>
            ) : (
              <View
                style={{
                  padding: 16,
                  elevation: 10,
                  backgroundColor: colors.BG,
                }}>
                <CustomButton
                  title={
                    participateStatus == 'WAITING' ? '신청 취소' : '참여하기'
                  }
                  disabled={isApplying}
                  onPress={() => {
                    participateStatus == 'WAITING'
                      ? cancelParticipateMeeting()
                      : participateMeeting();
                  }}
                />
              </View>
            )}
          </InputAccessoryView>
        ) : (
          <>
            {participateStatus == 'JOINED' ? (
              <>
                {activeTab === 2 && (
                  <View
                    style={{
                      padding: 16,
                      elevation: 10,
                      backgroundColor: colors.BG,
                      paddingTop: 8,
                    }}>
                    {userId == meetingInfo.meetingInfo.masterInfo.id && (
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                          setIsNotice(!isNotice);
                        }}>
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderColor: isNotice ? colors.Blue : colors.Gray04,
                            borderWidth: 1,
                            backgroundColor: isNotice ? colors.Blue : null,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {isNotice && <Check color={colors.white} />}
                        </View>
                        <View style={{width: 8}} />
                        <Text style={[textStyles.B4, {color: colors.Gray10}]}>
                          공지
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View style={{height: 8}} />
                    <CustomInput
                      onfocus={() =>
                        setTimeout(
                          () =>
                            scrollViewRef.current.scrollToPosition(
                              0,
                              width,
                              true,
                            ),
                          300,
                        )
                      }
                      placeholder={'메시지를 입력해주세요'}
                      containerStyle={{backgroundColor: colors.Gray01}}
                      value={message}
                      onChangeText={setMessage}
                      showButton={true}
                      onButtonPress={() => sendMessage()}
                      buttonIcon={
                        <Text
                          style={[
                            textStyles.B3,
                            {
                              color:
                                isMessageSending || message.length == 0
                                  ? colors.Gray06
                                  : colors.Blue,
                            },
                          ]}>
                          등록
                        </Text>
                      }
                      multiline={true}
                      onSubmitEditing={() => sendMessage()}
                      buttonDisabled={message.length == 0 || isMessageSending}
                    />
                  </View>
                )}
              </>
            ) : (
              <View
                style={{
                  padding: 16,
                  elevation: 10,
                  backgroundColor: colors.BG,
                }}>
                <CustomButton
                  title={
                    participateStatus == 'WAITING' ? '신청 취소' : '참여하기'
                  }
                  disabled={isApplying}
                  onPress={() => {
                    participateStatus == 'WAITING'
                      ? cancelParticipateMeeting()
                      : participateMeeting();
                  }}
                />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default MeetDetail;
