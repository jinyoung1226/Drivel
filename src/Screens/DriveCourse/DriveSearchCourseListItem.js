import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {useNavigation} from '@react-navigation/native';
import StarIcon from '../../assets/icons/StarIcon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriveSearchCourseListItem = ({item, setSearchHistory, searchHistoryList}) => {
  const navigation = useNavigation();


  const handleDriveDetail = id => {
    navigation.navigate('DriveDetail', {id});
  };

  const handlePress = async() => {
    handleDriveDetail(item.id);
    setSearchHistory([{title:item.title, id:item.id}, ...searchHistoryList.filter((history) => history.id !== item.id)]);
    let firstSearchHistory = []
    const searchHistory = await AsyncStorage.getItem('searchHistory')
    if (searchHistory) {
      let newSearchHistory = JSON.parse(searchHistory);
      console.log(newSearchHistory, "aaaa");
      newSearchHistory = [{title:item.title, id:item.id}, ...newSearchHistory.filter((history) => history.id !== item.id)];
      console.log(newSearchHistory, "bbbb");
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
    } else {
      console.log(item.title);
      firstSearchHistory = [{title:item.title, id:item.id}];
      console.log(firstSearchHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(firstSearchHistory));
    }
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
      onPress={handlePress}>
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
          {item.address}
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
