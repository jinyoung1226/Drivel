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
import MiniBus from '../../assets/Icon/Minibus.svg';

const Magazine = () => {
  return (
    <View style={{marginLeft: 16, marginTop: 24, height: 182}}>
      <View style={{flexDirection: 'row', gap: 6}}>
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
              <Text style={styles.textStyleH1}>
                1석 2조 코스 {'\n'} 드라이브 하면서 전통 관광지 탐방까지!
              </Text>
            </Pressable>
            <Pressable>
              <Image
                source={require('../../assets/image/homeTopImg.jpg')}
                style={{width: 312, height: 139, borderRadius: 15}}
              />
              <Text style={styles.textStyleH1}>
                1석 2조 코스 {'\n'} 드라이브 하면서 전통 관광지 탐방까지!
              </Text>
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
    fontSize: 16,
    color: '#ffffff',
    bottom: 16,
    left: 16,
  },
});

export default Magazine;
