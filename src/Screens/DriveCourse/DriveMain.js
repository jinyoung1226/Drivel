import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import SmallSearchIcon from '../../assets/icons/SmallSearchIcon.svg';
import PlusIcon from '../../assets/icons/PlusIcon.svg';
import FilterIcon from '../../assets/icons/FilterIcon.svg';
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
} from '../../assets/onboardingData/onBoardingData';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  }, [dispatch]);

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
    {key: '풍경', value: driveThemeDisplayName, unit: ''},
    {key: '스타일', value: driveStyleDisplayName, unit: ''},
    {key: '형태', value: driveWithDisplayName, unit: ''},
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
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
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
        <DriveCourseList
          ListHeaderComponent={<View style={{height: 8}} />}
          data={driveList}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  );
};

export default DriveMain;
