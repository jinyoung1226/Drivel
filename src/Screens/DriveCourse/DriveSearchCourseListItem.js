import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {useNavigation} from '@react-navigation/native';
import StarIcon from '../../assets/icons/StarIcon.svg';

const DriveSearchCourseListItem = ({item, disabled}) => {
  const navigation = useNavigation();

  const handleDriveDetail = id => {
    navigation.navigate('DriveDetail', {id});
  };

  const handlePress = () => {
    handleDriveDetail(item.id);
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: colors.BG,
      }}
      onPress={handlePress}
      disabled={disabled}>
      <View style={{flex: 1}}>
        <Text style={[textStyles.H5, {color: colors.Gray10}]} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={{height: 4}} />
        <Text style={[textStyles.B4, {color: colors.Gray10}]} numberOfLines={1}>
          {item.waypoints}
        </Text>
        <View style={{height: 4}} />
        <Text style={[textStyles.B4, {color: colors.Gray07}]} numberOfLines={1}>
          {item.region}
        </Text>
        <View style={{height: 8}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <StarIcon />
          <View style={{width: 4}} />
          <Text
            style={[textStyles.B4, {color: colors.Gray08}]}
            numberOfLines={1}>
            {item.rating}
          </Text>
          <View style={{width: 4}} />
          <Text
            style={[textStyles.B4, {color: colors.Gray05}]}
            numberOfLines={1}>
            ({item.reviewCount})
          </Text>
        </View>
      </View>
      <View style={{width: 16}} />
      <View
        style={{width: 70, height: 80, borderRadius: 10, overflow: 'hidden'}}>
        <Image source={{uri: item.imagePath}} style={{flex: 1}} />
      </View>
    </TouchableOpacity>
  );
};

export default DriveSearchCourseListItem;
