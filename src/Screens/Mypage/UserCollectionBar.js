import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import ScrapIcon from '../../assets/icons/ScrapIcon';
import ReviewIcon from '../../assets/icons/ReviewIcon';
import DriveHistoryIcon from '../../assets/icons/DriveHistoryIcon';
import {useNavigation} from '@react-navigation/native';
const UserCollectionBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 16,
        backgroundColor: colors.white,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}>
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center', paddingVertical: 16}}
        onPress={() => navigation.navigate('MyScrap')}>
        <ScrapIcon />
        <View style={{height: 16}} />
        <Text style={[textStyles.B3, {color: colors.Gray10}]}>내 스크랩</Text>
      </TouchableOpacity>
      <View style={{width: 1, height: 39, backgroundColor: colors.Gray02}} />
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center', paddingVertical: 16}}
        onPress={() => navigation.navigate('MyReview')}>
        <ReviewIcon />
        <View style={{height: 16}} />
        <Text style={[textStyles.B3, {color: colors.Gray10}]}>내 리뷰</Text>
      </TouchableOpacity>
      {/* <View style={{width: 1, height: 39, backgroundColor: colors.Gray02}} />
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
        <DriveHistoryIcon />
        <View style={{height: 16}} />
        <Text style={[textStyles.B3, {color: colors.Gray10}]}>
          드라이브 기록
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default UserCollectionBar;
