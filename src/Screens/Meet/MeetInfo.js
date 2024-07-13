import React, {useEffect} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import CarIcon from '../../assets/icons/CarIcon.svg';
import PersonIcon from '../../assets/icons/PersonIcon.svg';
import PinIcon from '../../assets/icons/PinIcon.svg';
import {ScrollView} from 'react-native-gesture-handler';
import GrayLine from '../../components/GrayLine';
const MeetInfo = ({item}) => {
  const width = Dimensions.get('window').width;
  console.log(width);

  const renderMemberInfo = (imagePath, nickname, description, index) => {
    return (
      <View key={index} style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 50,
            height: 50,
            overflow: 'hidden',
            borderRadius: 100,
            backgroundColor: colors.Gray04,
          }}>
          <Image style={{flex: 1}} src={imagePath} />
        </View>
        <View style={{width: 24}} />
        <View>
          <Text style={[textStyles.H5, {color: colors.Gray10}]}>
            {nickname}
          </Text>
          <View style={{height: 4}} />
          <Text
            style={[textStyles.B4, {color: colors.Gray06, width: width - 122}]}
            numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View style={{width: 16}} />
      </View>
    );
  };
  return (
    <View style={{width: width}}>
      <View style={{padding: 16}}>
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>모임 소개</Text>
        <View style={{height: 16}} />
        <Text style={[textStyles.M14, {color: colors.Gray09}]}>
          {item.meetingInfo.description}
        </Text>
        <View style={{height: 32}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>모임 조건</Text>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <PinIcon />
          <Text
            style={[textStyles.M14, {color: colors.Gray08, marginLeft: 4}]}
            numberOfLines={1}>
            {item.meetingInfo.condition.meetingPoint}
          </Text>
        </View>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <PersonIcon />
          <Text
            style={[textStyles.M14, {color: colors.Gray08, marginLeft: 4}]}
            numberOfLines={1}>
            {item.meetingInfo.participantsInfo.membersInfo.length}/
            {item.meetingInfo.condition.capacity}
            {item.meetingInfo.condition.startAge == null &&
            item.meetingInfo.condition.endAge == null
              ? null
              : ' · '}
            {item.meetingInfo.condition.startAge == null &&
            item.meetingInfo.condition.endAge == null
              ? null
              : `${item.meetingInfo.condition.startAge}-${item.meetingInfo.condition.endAge}세`}
            {item.meetingInfo.condition.gender == null ? null : ' · '}
            {item.meetingInfo.condition.gender == null
              ? null
              : item.meetingInfo.condition.gender}
          </Text>
        </View>
        <View style={{height: 16}} />
        {(item.meetingInfo.condition.minCarCareer !== null ||
          item.meetingInfo.condition.carModel !== null) && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CarIcon />
            <Text
              style={[textStyles.M14, {color: colors.Gray08, marginLeft: 4}]}
              numberOfLines={1}>
              {item.meetingInfo.condition.minCarCareer == null
                ? null
                : `운전경력 ${item.meetingInfo.condition.minCarCareer}년 이상`}
              {item.meetingInfo.condition.minCarCareer == null ||
              item.meetingInfo.condition.carModel == null
                ? null
                : ' · '}
              {item.meetingInfo.condition.carModel == null
                ? null
                : item.meetingInfo.condition.carModel}
            </Text>
          </View>
        )}
        <View style={{height: 32}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>모임장</Text>
        <View style={{height: 16}} />
        {renderMemberInfo(
          item.meetingInfo.masterInfo.imagePath,
          item.meetingInfo.masterInfo.nickname,
          item.meetingInfo.masterInfo.description,
        )}
      </View>
      <GrayLine />
      <View style={{padding: 16}}>
        <View style={{height: 16}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>
          참여자 ({item.meetingInfo.participantsInfo.membersInfo.length}/
          {item.meetingInfo.condition.capacity})
        </Text>
        <View style={{height: 16}} />
        {item.meetingInfo.participantsInfo.membersInfo.map((member, index) =>
          renderMemberInfo(
            member.imagePath,
            member.nickname,
            member.description,
            index,
          ),
        )}
      </View>
    </View>
  );
};

export default MeetInfo;
