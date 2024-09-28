import React from 'react';
import {Text, Image, Pressable, View, } from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import MainLogo from '../../assets/icons/MainLogo';

const DriveRestaurantCuration = ({item}) => {
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
      {item.imagePath == "No Image Available" ? 
      <View
        style={{
          width: 120, 
          height: 120, 
          borderRadius: 10,
          overflow: 'hidden',
      }}>
        <View style={{width: 120, height: 120, zIndex:1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.1)',}}>
          
        </View>
        <MainLogo width={120} height={120} />
      </View>
      :
        <Image
          src={item.imagePath}
          style={{width: 120, height: 120, borderRadius: 10}}
        />}
      <Text style={[textStyles.H5, {color: colors.Gray10, marginTop: 8}]}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export default DriveRestaurantCuration;
