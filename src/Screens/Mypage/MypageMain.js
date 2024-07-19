import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import UserIcon from '../../assets/icons/UserIcon';
import PenIcon from '../../assets/icons/PenIcon';
import ScrapIcon from '../../assets/icons/ScrapIcon';
import ReviewIcon from '../../assets/icons/ReviewIcon';
import DriveHistoryIcon from '../../assets/icons/DriveHistoryIcon';
import {ScrollView} from 'react-native-gesture-handler';
import {tags} from 'react-native-svg/lib/typescript/xml';
const MyPage = ({navigation}) => {
  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();
  const item = {tags: ['태그1', '태그2', '태그3']};
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      <View style={{height: 32}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <TouchableOpacity
          style={{width: 90, height: 90}}
          onPress={() => navigation.navigate('ProfileSetting')}>
          <View
            style={{
              width: 90,
              height: 90,
              backgroundColor: colors.Gray02,
              borderRadius: 45,
              overflow: 'hidden',
            }}>
            <UserIcon />
          </View>
          <View
            style={{
              position: 'absolute',
              width: 24,
              height: 24,
              backgroundColor: colors.Gray04,
              borderRadius: 12,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 0,
            }}>
            <PenIcon />
          </View>
        </TouchableOpacity>
        <View style={{width: 16}} />
        <View>
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            {nickname}
          </Text>
          <Text style={[textStyles.C4, {color: colors.Gray05}]}>
            {'차종,경력,성별,나이'}
          </Text>
          <Text style={[textStyles.C4, {color: colors.Gray08}]}>
            {'소개글'}
          </Text>
        </View>
      </View>
      <View style={{height: 8}} />
      <View
        style={{
          padding: 16,
          margin: 16,
          backgroundColor: colors.white,
          borderRadius: 20,
          elevation: 2,
        }}>
        <Text style={[textStyles.B3, {color: colors.Gray10}]}>
          나의 드라이브 태그
        </Text>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {item.tags.map((tag, index) => (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                height: 35,
                paddingHorizontal: 16,
                borderRadius: 24,
                justifyContent: 'center',
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: colors.Light_Blue,
              }}>
              <Text style={[textStyles.B4, {height: 15, color: colors.Blue}]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          margin: 16,
          backgroundColor: colors.white,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
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
          style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
          <ReviewIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>내 리뷰</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 39, backgroundColor: colors.Gray02}} />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
          <DriveHistoryIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            드라이브 기록
          </Text>
        </TouchableOpacity>
      </View>
      <Text>My Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

export default MyPage;
