import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Star from '../../assets/icons/Star.svg';
import {useNavigation} from '@react-navigation/native';
import {authApi} from '../../api/api';
import RenderingPage from '../../components/RenderingPage';

const DriveCourseListItem = ({item}) => {
  const navigation = useNavigation();

  const handleDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  return (
    <TouchableOpacity
      onPress={() => handleDriveDetail(item.id)}
      style={{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.BG,
        marginHorizontal: 16,
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
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          강원도 · 30km
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.B4, {color: colors.Gray04}]}>
          자연 · 경치... 매핑써서 하면 될듯
        </Text>
      </View>
      <View style={{width: 16}} />
      <View
        style={{width: 84, height: 115, borderRadius: 10, overflow: 'hidden'}}>
        <Image source={{uri: item.imagePath}} style={{flex: 1}} />
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
