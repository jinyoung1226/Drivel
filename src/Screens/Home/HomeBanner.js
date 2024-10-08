import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HomeLogo from '../../assets/icons/HomeLogo.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const HomeBanner = ({magazineList, randomBannerId}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const handleMagazineInfo = body => {
    navigation.navigate('MagazineInfo', {body});
  };
  // console.log(insets)
  return (
    <View>
      <Pressable onPress={() => handleMagazineInfo(magazineList[randomBannerId].body)}>
        <View
          style={{
            width: '100%',
            height: width*1.3,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
          }}>
          {randomBannerId !== null && magazineList && (
            <ImageBackground
              src={magazineList[randomBannerId].banner}
              style={{flex: 1, paddingTop:insets.top}}
              imageStyle={{borderBottomRightRadius: 40}}>
                <View style={{padding:16}}>
                  <HomeLogo/>
                </View>
            </ImageBackground>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default HomeBanner;
