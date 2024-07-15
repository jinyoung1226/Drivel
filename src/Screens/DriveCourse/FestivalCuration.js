import React from 'react';
import {Text, Image, Pressable} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const FestivalCuration = ({item}) => {
  const navigation = useNavigation();

  const handleFestivalInfo = id => {
    navigation.navigate('FestivalInfo', {festivalId: id});
  };

  return (
    <Pressable onPress={() => handleFestivalInfo(item.id)}>
      <Image
        src={item.firstImagePath}
        style={{width: 160, height: 221.54, borderRadius: 8.79}}
      />
      <Text
        style={[
          textStyles.H4,
          {color: colors.white, position: 'absolute', bottom: 40, left: 12},
        ]}>
        {item.title}
      </Text>
      <Text
        style={[
          textStyles.H6,
          {color: colors.Gray03, position: 'absolute', bottom: 19, left: 12},
        ]}>
        2024.2.3 ~ 7.28
      </Text>
    </Pressable>
  );
};

export default FestivalCuration;
