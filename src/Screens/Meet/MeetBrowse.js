import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import PlusIcon from '../../assets/icons/PlusIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
import MeetList from './MeetList';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMeetList,
  getMeetListMore,
  setFilterGender,
  setFilterAge,
  setFilterCarModel,
  setFilterCarCareer,
} from '../../features/meet/meetActions';
const MeetBrowse = ({goFilter, goMeetDetail}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    meetList,
    totalMeeting,
    isLastPage,
    inititalPage,
    currentPage,
    sort,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
  } = useSelector(state => state.meet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        sort: sort,
        gender: filterGender == '' ? null : filterGender == '남성' ? 1 : 2,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        minCarCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    );
    console.log(meetList);
  }, [dispatch]);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        sort: sort,
        gender: filterGender == '' ? null : filterGender == '남성' ? 1 : 2,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        minCarCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    ).finally(() => setIsRefreshing(false));
    console.log('@@@');
  };

  const onEndReached = () => {
    if (!isLastPage) {
      dispatch(
        getMeetListMore({
          page: currentPage + 1,
          size: 10,
          sort: sort,
          gender: filterGender == '' ? null : filterGender == '남성' ? 1 : 2,
          age: filterAge == '' ? null : filterAge,
          carModel: filterCarModel == '' ? null : filterCarModel,
          minCarCareer: filterCarCareer == '' ? null : filterCarCareer,
        }),
      );
      console.log(isLastPage);
    }
  };

  const category = [
    {key: '텍스트', value: '', unit: ''},
    {key: '성별', value: filterGender, unit: ''},
    {key: '나이', value: filterAge, unit: '세'},
    {key: '차종', value: filterCarModel, unit: ''},
    {key: '운전경력', value: filterCarCareer, unit: '년'},
  ];

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
        <Text style={[textStyles.B4, {color: colors.Gray10}]}>인기순</Text>
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
          data={category}
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
      <MeetList
        goMeetDetail={goMeetDetail}
        data={meetList}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </View>
  );
};
export default MeetBrowse;