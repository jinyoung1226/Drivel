import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Linking,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import {useNavigation} from '@react-navigation/native';
import CustomButton from './CustomButton';
import ArrowIcon from '../assets/icons/ArrowIcon';
import Check from '../assets/icons/Check';
const PolicyModal = ({setModalVisible, modalVisible, registerType}) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
        console.log(gestureState.dy, gestureState.vy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 115 || gestureState.vy > 0.8) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      setAgreeAll(false);
      setAgreeService(false);
      setAgreePrivacy(false);
    });
  };

  const handleAgreeAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgreeService(newValue);
    setAgreePrivacy(newValue);
  };

  const handleAgreeService = () => {
    const newValue = !agreeService;
    setAgreeService(newValue);
    if (!newValue) {
      setAgreeAll(false);
    } else if (agreePrivacy) {
      setAgreeAll(true);
    }
  };

  const handleAgreePrivacy = () => {
    const newValue = !agreePrivacy;
    setAgreePrivacy(newValue);
    if (!newValue) {
      setAgreeAll(false);
    } else if (agreeService) {
      setAgreeAll(true);
    }
  };

  const onPressHandler = () => {
    closeModal();
    if (registerType === 'email') {
      navigation.navigate('Register');
    }
    if (registerType === 'kakao') {
      navigation.navigate('KakaoLogin');
    }
  };

  const PolicyListItem = ({title, onPress, link, agreeItem}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginVertical: 8,
        }}>
        <TouchableOpacity onPress={onPress} style={{padding: 4}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: agreeItem ? colors.Blue : colors.Gray04,
              borderRadius: 4,
              backgroundColor: agreeItem ? colors.Blue : null,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {agreeItem && <Check />}
          </View>
        </TouchableOpacity>
        <View style={{width: 12}} />
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => {
            Linking.openURL(link);
          }}>
          <Text
            style={[
              textStyles.B3,
              {color: colors.Gray08},
            ]}>{`[필수] ${title}`}</Text>
          <View style={{flex: 1}} />
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            closeModal();
          }}
        />
        <Animated.View style={{transform: [{translateY: translateY}]}}>
          <View
            style={{
              backgroundColor: colors.BG,
              paddingHorizontal: 16,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View style={{paddingVertical: 16}} {...panResponders.panHandlers}>
              <View
                style={{
                  height: 5,
                  width: 50,
                  alignSelf: 'center',
                  backgroundColor: colors.Gray03,
                  borderRadius: 10,
                }}
              />
              <View style={{height: 8}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginBottom: 8,
              }}>
              <TouchableOpacity
                onPress={() => handleAgreeAll()}
                style={{padding: 4}}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: agreeAll ? colors.Blue : colors.Gray04,
                    borderRadius: 4,
                    backgroundColor: agreeAll ? colors.Blue : null,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {agreeAll && <Check />}
                </View>
              </TouchableOpacity>
              <View style={{width: 12}} />
              <Text style={[textStyles.H4, {color: colors.Gray10}]}>
                전체 약관 동의
              </Text>
              <View style={{flex: 1}} />
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.Gray02,
                marginVertical: 8,
              }}
            />
            <PolicyListItem
              title="서비스 이용약관 동의"
              link={
                'https://peppered-game-6ea.notion.site/5a78b112fec74a2184526fe314dce3cf'
              }
              agreeItem={agreeService}
              onPress={() => handleAgreeService()}
            />
            <PolicyListItem
              title="개인정보 수집 및 이용 동의"
              link={
                'https://peppered-game-6ea.notion.site/74aa30df62754ddfb6aeae8d82b9d96d'
              }
              agreeItem={agreePrivacy}
              onPress={() => handleAgreePrivacy()}
            />
            <View style={{height: 16}} />
            <CustomButton
              title="동의하고 가입하기"
              onPress={onPressHandler}
              disabled={!agreeAll}
            />
            <View style={{height: 16}} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PolicyModal;
