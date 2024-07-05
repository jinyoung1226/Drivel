import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Sparkler from '../../assets/icons/Sparkler.svg';

const Festival = () => {
  return (
    <View
      style={{marginLeft: 16, marginTop: 24, height: 293, marginBottom: 51}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <Sparkler />
        <Text style={styles.preferenceText}>
          지금 가장 핫한 행사가 궁금하다면?
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 16}}>
        <ScrollView horizontal>
          <View style={{flexDirection: 'row', gap: 16}}>
            <Pressable>
              <Image
                source={require('../../assets/image/homeTopImg.jpg')}
                style={{width: 182, height: 252, borderRadius: 15}}
              />
              <Text style={styles.textStyleH1}>경기도 음악 페스티벌</Text>
              <Text style={styles.textStyleH2}>2024.2.3 ~ 7.28</Text>
            </Pressable>
            <Pressable>
              <Image
                source={require('../../assets/image/homeTopImg.jpg')}
                style={{width: 182, height: 252, borderRadius: 15}}
              />
              <Text style={styles.textStyleH1}>경기도 음악 페스티벌</Text>
              <Text style={styles.textStyleH2}>2024.2.3 ~ 7.28</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preferenceText: {
    fontFamily: 'SUIT-Bold',
    fontSize: 20,
    color: '#000000',
  },

  textStyleH1: {
    position: 'absolute',
    fontFamily: 'SUIT-Bold',
    fontSize: 18,
    color: '#ffffff',
    bottom: 40,
    left: 12,
  },

  textStyleH2: {
    position: 'absolute',
    fontFamily: 'SUIT-Bold',
    fontSize: 14,
    color: '#DDDDDE',
    bottom: 19,
    left: 12,
  },
});

export default Festival;
