import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MagazineCuration = ({item}) => {
  const navigation = useNavigation();

  const handleMagazineInfo = body => {
    navigation.navigate('MagazineInfo', {body});
  };

  return (
    <View>
      <TouchableOpacity
        style={{width: 312, height: 139, borderRadius: 10, overflow: 'hidden'}}
        onPress={() => handleMagazineInfo(item.body)}>
        <ImageBackground src={item.cover} style={{flex: 1}}>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default MagazineCuration;
