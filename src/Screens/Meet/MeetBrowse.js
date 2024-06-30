import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import colors from '../../styles/colors';
import PlusIcon from '../../assets/icons/PlusIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import LinearGradient from 'react-native-linear-gradient';
import { textStyles } from '../../styles/textStyles';
import MeetList from './MeetList'
import { useSelector, useDispatch } from 'react-redux';
import { getMeetList } from '../../features/meet/meetActions';
const MeetBrowse = ({goFilter, goMeetDetail, page, size, sort}) => {

  const { meetList, totalMeeting } = useSelector(state => state.meet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeetList({page: page, size: size, sort: sort}));
    console.log(meetList);

  }, [dispatch]);

  const category = ['텍스트', '연령', '성별', '차종','지역']

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => {}}
      style={[{backgroundColor: colors.Gray02, paddingHorizontal:16, borderRadius:100, height:30, flexDirection:'row', alignItems:'center'}]}
    >
      <PlusIcon/>
      <Text style={[textStyles.B3, {color: colors.Gray10, marginLeft:8, marginBottom:1.5}]}>{item}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{flex:1, backgroundColor: colors.BG}}>
      <View style={{flexDirection: 'row', padding:20}}>
        <Text style={[textStyles.B4, {color: colors.Gray10}]}>{totalMeeting}개 모임</Text>
        <View style={{flex:1}}/>
        <Text style={[textStyles.B4, {color: colors.Gray10}]}>인기순</Text>
      </View>
      <View style={{flexDirection:'row', paddingRight:16, paddingVertical:8, borderBottomWidth:1, borderBottomColor: colors.Gray02}}>
        <FlatList
          data={category}
          renderItem={renderCategory}
          horizontal
          ListHeaderComponent={<View style={{width:16}}/>}
          ListFooterComponent={<View style={{width:16}}/>}
          ItemSeparatorComponent={<View style={{width:8}}/>}
          showsHorizontalScrollIndicator={false}
        />
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0.1, y: 1}}
          locations={[0, 0.8]}
          colors={['rgba(255, 255, 255, 1)','rgba(255, 255, 255, 0)' ]}
          style={{ width: 60, height: '100%',position: 'absolute', right: 46, zIndex: 1}}
        />
        <TouchableOpacity
          onPress={goFilter}
          style={[{backgroundColor: colors.Gray02, width:30, borderRadius:100, height:30, flexDirection:'row', alignItems:'center', justifyContent:'center' }]}
        >
          <FilterIcon/>
        </TouchableOpacity>
      </View>
      <MeetList goMeetDetail={goMeetDetail} data={meetList} />
    </View>
  );
}
export default React.memo(MeetBrowse);