import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Candy from '../../assets/icons/Candy.svg';
import CurationButton from './CurationButton';
import CurationListItem from './CurationListItem';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const DriveCourseCuration = ({data}) => {
  const nickname = useSelector(state => state.auth.nickname);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 32,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingLeft: 16,
        }}>
        <Candy />
        <Text style={[textStyles.H2, {color: colors.Gray10}]}>
          {nickname}님의 취향을 담았어요
        </Text>
      </View>
      <View style={{flex: 1, paddingTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={data}
            renderItem={({item}) => <CurationListItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{width: 16}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
          />
        </View>
      </View>
    </View>
  );
};

export default DriveCourseCuration;
