import React from 'react';
import {Image, ImageBackground, Pressable, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const MagazineCuration = ({item}) => {
  const navigation = useNavigation();

  const handleMagazineInfo = id => {
    navigation.navigate('MagazineInfo', {id: id});
  };

  return (
    <View>
      <TouchableOpacity
        style={{width: 312, height: 139, borderRadius: 10, overflow: 'hidden'}}
        onPress={() => handleMagazineInfo(item.id)}>
        <ImageBackground src={item.imagePath} style={{flex: 1}}>
          <LinearGradient
            style={{flex: 1, padding: 16}}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}>
            <View style={{flex: 1}} />
            <Text
              style={[textStyles.H4, {color: colors.white, lineHeight: 24}]}>
              {item.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default MagazineCuration;
