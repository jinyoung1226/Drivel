import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import SmallSearchIcon from '../../assets/icons/SmallSearchIcon.svg';
import PlusIcon from '../../assets/icons/PlusIcon.svg';
import FilterIcon from '../../assets/icons/FilterIcon.svg';
import DriveEmptyIcon from '../../assets/icons/DriveEmptyIcon.svg';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDriveList,
  getDriveListMore,
} from '../../features/drive/driveActions';
import DriveCourseList from './DriveCourseList';
import {
  driveStyle,
  driveTheme,
  driveWith,
  regions,
} from '../../assets/onboardingData/onBoardingData';

const DriveMain = ({navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {
    driveList,
    initialPage,
    isLastPage,
    currentPage,
    filterDriveWith,
    filterDriveTheme,
    filterDriveStyle,
    filterRegion,
    isLoading,
  } = useSelector(state => state.drive);

  const goFilter = () => {
    navigation.navigate('DriveFilter');
  };

  useEffect(() => {
    dispatch(
      getDriveList({
        page: initialPage,
        size: 10,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
      }),
    );
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getDriveList({
        page: initialPage,
        size: 10,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
      }),
    ).finally(() => setIsRefreshing(false));
  };

  const onEndReached = () => {
    if (!isLastPage) {
      dispatch(
        getDriveListMore({
          page: currentPage + 1,
          size: 10,
          themeId: filterDriveTheme == '' ? null : filterDriveTheme,
          togetherId: filterDriveWith == '' ? null : filterDriveWith,
          styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        }),
      );
      // console.log(isLastPage, '22222');
    }
  };

  const regionDisplayName = filterRegion
  ? regions.find(style => style.id === filterRegion)?.displayName
  : '';

  const driveThemeDisplayName = filterDriveTheme
    ? driveTheme.find(style => style.id === filterDriveTheme)?.displayName
    : '';

  const driveWithDisplayName = filterDriveWith
    ? driveWith.find(style => style.id === filterDriveWith)?.displayName
    : '';

  const driveStyleDisplayName = filterDriveStyle
    ? driveStyle.find(style => style.id === filterDriveStyle)?.displayName
    : '';

  const category = [
    {key: '지역', value: regionDisplayName, unit: ''},
    {key: '풍경', value: driveThemeDisplayName, unit: ''},
    {key: '활동', value: driveStyleDisplayName, unit: ''},
    {key: '동행자', value: driveWithDisplayName, unit: ''},
  ];

  const sortedCategory = category.sort((a, b) => {
    if (a.value === '' && b.value !== '') return 1;
    if (a.value !== '' && b.value === '') return -1;
    return 0;
  });

  const goDriveSearch = () => {
    navigation.navigate('DriveSearch');
  };

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
      {Platform.OS === 'ios' && <View style={{height: 44}} />}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.Gray02,
          height: 41,
          borderRadius: 21,
          margin: 16,
          paddingHorizontal: 16,
        }}
        onPress={goDriveSearch}>
        <Text style={[textStyles.B3, {color: colors.Gray06}]}>
          원하는 드라이브코스를 검색해보세요
        </Text>
        <SmallSearchIcon />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 16,
          paddingBottom: 8,
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
      {driveList != null && !isRefreshing ? (
        driveList.length == 0 ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <DriveEmptyIcon />
          <View style={{height: 24}} />
          <Text style={[textStyles.C4, {color: colors.Gray07}]}>필터에 해당하는 모임이 없어요</Text>
        </View>
        :
        <DriveCourseList
          ListHeaderComponent={<View style={{height: 8}} />}
          data={driveList}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />
      ) : (
        <View style={{padding: 16}}>
          {[1, 2, 3, 4].map((item, index) => (
            <View
              key={index}
              style={{
                padding: 16,
                backgroundColor: colors.Gray02,
                borderRadius: 10,
                marginBottom: 16,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      height: 17,
                      width: 120,
                      backgroundColor: colors.Gray04,
                      borderRadius: 5,
                    }}
                  />
                  <View style={{height: 8}} />
                  <View
                    style={{
                      height: 14,
                      width: 80,
                      backgroundColor: colors.Gray04,
                      borderRadius: 5,
                    }}
                  />
                  <View style={{height: 8}} />
                  <View
                    style={{
                      height: 50,
                      backgroundColor: colors.Gray04,
                      borderRadius: 5,
                    }}
                  />
                  <View style={{height: 8}} />
                  <View
                    style={{
                      height: 14,
                      width: 60,
                      backgroundColor: colors.Gray04,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View style={{width: 16}} />
                <View
                  style={{
                    height: 115,
                    width: 84,
                    backgroundColor: colors.Gray04,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            bottom: 24,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
          }}>
          <View
            style={{
              position: 'absolute',
              width: 32,
              height: 32,
              backgroundColor: colors.Gray10,
              opacity: 0.7,
              borderRadius: 20,
            }}
          />
          <ActivityIndicator
            size={'small'}
            style={{position: 'absolute'}}
            color={colors.BG}
          />
        </View>
      )}
    </View>
  );
};

export default DriveMain;
