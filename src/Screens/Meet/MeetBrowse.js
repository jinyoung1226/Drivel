import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';
import PlusIcon from '../../assets/icons/PlusIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
import MeetList from './MeetList';
import {useSelector, useDispatch} from 'react-redux';
import {getMeetList, getMeetListMore} from '../../features/meet/meetActions';
import {
  driveStyle,
  driveTheme,
  driveWith,
} from '../../assets/onboardingData/onBoardingData';
import { useNavigation } from '@react-navigation/native';

const MeetBrowse = () => {

  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    meetList,
    totalMeeting,
    isLastPage,
    inititalPage,
    currentPage,
    sort,
    filterDriveTheme,
    filterDriveWith,
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    isLoading,
  } = useSelector(state => state.meet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        orderBy: sort,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    );
    // console.log(meetList);
  }, [dispatch]);

  const goFilter = () => {
    navigation.navigate('MeetFilter');
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        orderBy: sort,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    ).finally(() => setIsRefreshing(false));
  };

  const onEndReached = () => {
    if (!isLastPage) {
      dispatch(
        getMeetListMore({
          page: currentPage + 1,
          size: 10,
          orderBy: sort,
          themeId: filterDriveTheme == '' ? null : filterDriveTheme,
          togetherId: filterDriveWith == '' ? null : filterDriveWith,
          styleId: filterDriveStyle == '' ? null : filterDriveStyle,
          genderId: filterGender == '' ? null : filterGender,
          age: filterAge == '' ? null : filterAge,
          carModel: filterCarModel == '' ? null : filterCarModel,
          carCareer: filterCarCareer == '' ? null : filterCarCareer,
        }),
      );
      // console.log(isLastPage);
    }
  };

  const driveThemeDisplayName = filterDriveTheme
    ? driveTheme.find(style => style.id === filterDriveTheme)?.displayName
    : '';

  const driveWithDisplayName = filterDriveWith
    ? driveWith.find(style => style.id === filterDriveWith)?.displayName
    : '';

  const driveStyleDisplayName = filterDriveStyle
    ? driveStyle.find(style => style.id === filterDriveStyle)?.displayName
    : '';

  const genderDisplayName = filterGender
    ? [
        {id: 1, displayName: '남성'},
        {id: 2, displayName: '여성'},
      ].find(style => style.id === filterGender)?.displayName
    : '';

  const category = [
    {key: '풍경', value: driveThemeDisplayName, unit: ''},
    {key: '활동', value: driveStyleDisplayName, unit: ''},
    {key: '동행자', value: driveWithDisplayName, unit: ''},
    {key: '성별', value: genderDisplayName, unit: ''},
    {key: '나이', value: filterAge, unit: '세'},
    {key: '차종', value: filterCarModel, unit: ''},
    {key: '운전경력', value: filterCarCareer, unit: '년'},
  ];

  const sortedCategory = category.sort((a, b) => {
    if (a.value === '' && b.value !== '') return 1;
    if (a.value !== '' && b.value === '') return -1;
    return 0;
  });

  const renderCategory = ({item}) => {
    const isActive = item.value !== '';
    return (
      <TouchableOpacity
        onPress={goFilter}
        style={[
          {
            backgroundColor: isActive ? colors.Light_Blue : colors.Gray02,
            paddingHorizontal: 16,
            borderRadius: 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {isActive ? (
          <Text
            style={[textStyles.B4, {color: colors.Blue, marginBottom: 1.5}]}>
            {item.value}
            {item.unit}
          </Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PlusIcon />
            <Text
              style={[
                textStyles.B4,
                {color: colors.Gray10, marginLeft: 8, marginBottom: 1.5},
              ]}>
              {item.key}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <Text style={[textStyles.B4, {color: colors.Gray10}]}>
          {totalMeeting}개 모임
        </Text>
        <View style={{flex: 1}} />
        {/* <Text style={[textStyles.B4, {color: colors.Gray10}]}>인기순</Text> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.Gray02,
        }}>
        <FlatList
          data={sortedCategory}
          renderItem={renderCategory}
          horizontal
          ListHeaderComponent={<View style={{width: 16}} />}
          ListFooterComponent={<View style={{width: 16}} />}
          ItemSeparatorComponent={<View style={{width: 8}} />}
          showsHorizontalScrollIndicator={false}
        />
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0.1, y: 1}}
          locations={[0, 0.8]}
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
          style={{
            width: 60,
            height: '100%',
            position: 'absolute',
            right: 46,
            zIndex: 1,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={goFilter}
          style={[
            {
              backgroundColor: colors.Gray02,
              width: 30,
              borderRadius: 100,
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {!isRefreshing ? 
        <MeetList
          ListHeaderComponent={<View style={{height: 16}} />}
          data={meetList}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />
        :
        <View style={{padding:16}}>
        {[1,2,3,4].map((item, index) => (
          <View key={index} style={{padding:16, backgroundColor:colors.Gray02, borderRadius:10, marginBottom:16}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{width: 104, height: 113, backgroundColor:colors.Gray04, borderRadius:10}}/>
              <View style={{width:16}}/>
              <View style={{flex:1}}>
                <View style={{height:20, width: 120, backgroundColor:colors.Gray04, borderRadius:5}}/>
                <View style={{height:8}}/>
                <View style={{height:16, width: 180, backgroundColor:colors.Gray04, borderRadius:5}}/>
                <View style={{height:8}}/>
                <View style={{height:14, width: 50, backgroundColor:colors.Gray04, borderRadius:5}}/>
                <View style={{height:8}}/>
                <View style={{height:14, width: 90, backgroundColor:colors.Gray04, borderRadius:5}}/>
              </View>
            </View>
          </View>
        ))}
        </View>
        }
      </View>
      {isLoading && 
      <View style={{position:'absolute', bottom: 24, alignSelf:'center', alignItems:'center', justifyContent:'center', elevation:5}}>
        <View style={{position:'absolute', width:32, height:32, backgroundColor:colors.Gray10, opacity:0.7, borderRadius:20}}/>
        <ActivityIndicator size={'small'} style={{position:'absolute' }} color={colors.BG}/>
      </View>}
    </View>
  );
};
export default MeetBrowse;
