import React from 'react';
import {Text, Image, Pressable} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const DriveRestaurantCuration = ({item, driveId}) => {
  const navigation = useNavigation();

  const handleRestaurantInfo = restaurantId => {
    navigation.navigate('RestaurantInfo', {
      restaurantId: restaurantId,
    });
  };

  return (
    <Pressable
      style={{width: 120, height: 162}}
      onPress={() => handleRestaurantInfo(item.id)}>
      <Image
        src={item.imagePath}
        style={{width: 120, height: 120, borderRadius: 10}}
      />
      <Text style={[textStyles.H5, {color: colors.Gray10, marginTop: 8}]}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default DriveRestaurantCuration;
