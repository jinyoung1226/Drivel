import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import colors from '../../styles/colors';
import FilterIcon from '../../assets/icons/FilterIcon';
import LinearGradient from 'react-native-linear-gradient';
import { textStyles } from '../../styles/textStyles';
import MeetListItem from './MeetListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetList } from '../../features/meet/meetActions';

const MeetList = ({goMeetDetail, ListHeaderComponent, data}) => {

  return (
    <FlatList
    ListHeaderComponent={ListHeaderComponent}
    data={data}
    renderItem={({item}) => <MeetListItem item={item} goMeetDetail={goMeetDetail}/>}
    keyExtractor={item => item.meetingId}
    />
  );
}
export default MeetList;