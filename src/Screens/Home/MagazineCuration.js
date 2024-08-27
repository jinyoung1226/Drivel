import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { imageMap } from '../../assets/magazineData/magazineData';


const MagazineCuration = ({ item }) => {
  const navigation = useNavigation();

  const handleMagazineInfo = imageKey => {
    navigation.navigate('MagazineInfo', { imageKey: imageKey });
  };
  
  return (
    <View>
      <Pressable onPress={() => handleMagazineInfo(item.final)}>
        <Image
          source={imageMap[item.cover]}  // 동적으로 이미지 매핑에서 가져옴
          style={{ width: 312, height: 139, borderRadius: 10 }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default MagazineCuration;
