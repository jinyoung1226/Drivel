import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const HomeBanner = ({magazineList, randomBannerId}) => {
  const navigation = useNavigation();

  const handleMagazineInfo = body => {
    navigation.navigate('MagazineInfo', {body});
  };

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
              style={{flex: 1}}
              imageStyle={{borderBottomRightRadius: 40}}>
            </ImageBackground>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default HomeBanner;
