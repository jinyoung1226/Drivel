import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriveInfo} from '../../features/drive/driveActions';
import Pin from '../../assets/icons/RoundPushpinIcon.svg';
import Heart from '../../assets/icons/HeartIcon.svg';
import MiniBus from '../../assets/icons/MinibusIcon.svg';

const {width} = Dimensions.get('window');

const HomeMain = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [press, setPress] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleDriveCourse = id => {
    dispatch(fetchDriveInfo({id}));
    navigation.navigate('DriveDetail');
  };

  const handleButtonPressIn = button => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable
          onPress={() => handleDriveCourse(2)}
          onPressIn={() => setPress(true)}
          onPressOut={() => setPress(false)}>
          <Image
            source={require('../../assets/image/homeTopImg.jpg')}
            style={[styles.topImage, {opacity: press ? 0.2 : 1}]}
          />
          <Text style={styles.textOverlay}>
            숨겨진 제주도 맛집이 {'\n'}어딘지 궁금하다면?
          </Text>
        </Pressable>
        <View style={styles.preferenceContainer}>
          <View style={styles.preferenceTextContainer}>
            <Pin />
            <Text style={styles.preferenceText}>연수님의 취향을 담았어요</Text>
          </View>
          <View style={styles.recommendationContainer}>
            <TouchableOpacity
              style={[
                styles.textButton,
                activeButton === '바다와 함께' && styles.ButtonActive,
              ]}
              onPress={() => handleButtonPressIn('바다와 함께')}>
              <Text
                style={[
                  styles.buttonText,
                  activeButton === '바다와 함께' && styles.textActive,
                ]}>
                바다와 함께
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textButton,
                activeButton === '자연친화' && styles.ButtonActive,
              ]}
              onPress={() => handleButtonPressIn('자연친화')}>
              <Text
                style={[
                  styles.buttonText,
                  activeButton === '자연친화' && styles.textActive,
                ]}>
                자연친화
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textButton,
                activeButton === '노을맛집' && styles.ButtonActive,
              ]}
              onPress={() => handleButtonPressIn('노을맛집')}>
              <Text
                style={[
                  styles.buttonText,
                  activeButton === '노을맛집' && styles.textActive,
                ]}>
                노을맛집
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginTop: 16}}>
            <ScrollView horizontal>
              <View style={{flexDirection: 'row', gap: 16}}>
                <Pressable>
                  <Image
                    source={require('../../assets/image/homeTopImg.jpg')}
                    style={styles.preferenceImage}
                  />
                  <Heart style={{position: 'absolute', right: 16, top: 16}} />
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 14,
                      color: '#ffffff',
                      bottom: 51,
                      left: 17,
                    }}>
                    아름다운 해안을 따라 달리는
                  </Text>
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 18,
                      color: '#ffffff',
                      bottom: 25,
                      left: 17,
                    }}>
                    삼척 새천년 해안도로
                  </Text>
                </Pressable>
                <Pressable>
                  <Image
                    source={require('../../assets/image/homeTopImg.jpg')}
                    style={styles.preferenceImage}
                  />
                  <Heart style={{position: 'absolute', right: 16, top: 16}} />
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 14,
                      color: '#ffffff',
                      bottom: 51,
                      left: 17,
                    }}>
                    아름다운 해안을 따라 달리는
                  </Text>
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 18,
                      color: '#ffffff',
                      bottom: 25,
                      left: 17,
                    }}>
                    삼척 새천년 해안도로
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            width: width,
            height: 10,
            marginTop: 24,
            backgroundColor: '#F6F6F7',
          }}>
          <Text></Text>
        </View>
        <View style={{marginLeft: 16, marginTop: 24, height: 182}}>
          <View style={{flexDirection: 'row', gap: 4}}>
            <MiniBus />
            <Text style={styles.preferenceText}>이런 여행코스가 인기에요!</Text>
          </View>
          <View style={{flex: 1, marginTop: 16}}>
            <ScrollView horizontal>
              <View style={{flexDirection: 'row', gap: 16}}>
                <Pressable>
                  <Image
                    source={require('../../assets/image/homeTopImg.jpg')}
                    style={{width: 312, height: 139, borderRadius: 15}}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 16,
                      color: '#ffffff',
                      bottom: 16,
                      left: 16,
                    }}>
                    1석 2조 코스 {'\n'} 드라이브 하면서 전통 관광지 탐방까지!
                  </Text>
                </Pressable>
                <Pressable>
                  <Image
                    source={require('../../assets/image/homeTopImg.jpg')}
                    style={{width: 312, height: 139, borderRadius: 15}}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      fontFamily: 'SUIT-Bold',
                      fontSize: 16,
                      color: '#ffffff',
                      bottom: 16,
                      left: 16,
                    }}>
                    1석 2조 코스 {'\n'} 드라이브 하면서 전통 관광지 탐방까지!
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Pressable: {
    flex: 1,
  },

  topImage: {
    width: width,
    height: 516,
    resizeMode: 'cover',
    borderBottomRightRadius: 40,
  },
  textOverlay: {
    position: 'absolute',
    fontFamily: 'SUIT-Bold',
    fontSize: 24,
    color: '#ffffff',
    bottom: 37,
    left: 24,
  },

  preferenceContainer: {
    height: 330,
    marginTop: 32,
    marginLeft: 16,
  },

  preferenceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },

  preferenceText: {
    fontFamily: 'SUIT-Bold',
    fontSize: 20,
    color: '#000000',
  },

  recommendationContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  textButton: {
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDDDDE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 12,
    fontFamily: 'SUIT-SemiBold',
  },

  ButtonActive: {
    backgroundColor: '#151618',
  },

  textActive: {
    color: '#ffffff',
  },

  preferenceImage: {
    width: 230,
    height: 245.86,
    borderRadius: 15,
  },
});
export default HomeMain;
