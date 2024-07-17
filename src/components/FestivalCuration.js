import React from 'react';
import {Text, Image, Pressable} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';

const formatDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const formatShortDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

const FestivalCuration = ({item}) => {
  const navigation = useNavigation();

  const handleFestivalInfo = id => {
    navigation.navigate('FestivalInfo', {festivalId: id});
  };

  return (
    <Pressable onPress={() => handleFestivalInfo(item.id)}>
      <Image
        src={item.imagePath}
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
        {item.startDate && formatDate(item.startDate)} -{' '}
        {item.endDate && formatShortDate(item.endDate)}
      </Text>
    </Pressable>
  );
};

export default FestivalCuration;
