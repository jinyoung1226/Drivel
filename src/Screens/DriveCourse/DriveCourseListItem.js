import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Star from '../../assets/icons/Star.svg';

const DriveCourseListItem = ({item}) => {
  console.log(item);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.BG,
        marginVertical: 8,
        height: 147,
        borderWidth: 1,
        borderColor: colors.Gray01,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }}>
      <View style={{flex: 1}}>
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          {item.title}
        </Text>
        <Text style={{color: colors.Gray07, marginTop: 4}}>{item.id}</Text>
        <Text
          style={{color: colors.Gray07, marginTop: 8, width: 200}}
          numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View
        style={{width: 100, height: 115, borderRadius: 10, overflow: 'hidden'}}>
        <Image source={{uri: item.imagePath}} style={{height: 115}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          gap: 2,
          alignItems: 'center',
          position: 'absolute',
          left: 16,
          bottom: 16,
        }}>
        <Star />
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          {item.averageRating}
        </Text>
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          ({item.reviewCount})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriveCourseListItem;
