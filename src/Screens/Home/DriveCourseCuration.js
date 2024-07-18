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
import Pin from '../../assets/icons/PinIcon.svg';
import CurationButton from './CurationButton';
import CurationList from './CurationList';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const DriveCourseCuration = ({
  activeButton,
  handleButtonPress,
  handleDriveCourse,
  driveCourseLists,
}) => {
  const nickname = useSelector(state => state.auth.nickname);
  return (
    <View style={{height: 330, marginTop: 32}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
          marginLeft: 16,
        }}>
        <Pin />
        <Text style={[textStyles.H2, {color: colors.Gray10}]}>
          {nickname}님의 취향을 담았어요
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={driveCourseLists}
            renderItem={({item}) => (
              <CurationList item={item} handleDriveCourse={handleDriveCourse} />
            )}
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
