import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import CarIcon from '../../assets/icons/CarIcon.svg';
import PersonIcon from '../../assets/icons/PersonIcon.svg';
import PinIcon from '../../assets/icons/PinIcon.svg';
import GrayLine from '../../components/GrayLine';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MeetInfo = ({item, isMeetEnd}) => {

  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {userId} = useSelector(state => state.auth);
  const {participateStatus, feedbackUserList} = useSelector(state => state.meet);
  const getTopItems = (items, topN) => {
    return Object.keys(items)
      .sort((a, b) => items[b] - items[a]) // 값을 기준으로 내림차순 정렬
      .slice(0, topN); // 상위 N개의 항목만 취함
  };

  const topCarModels = getTopItems(item.meetingInfo.summary.carModel, 2);
  const topCarCareers = getTopItems(item.meetingInfo.summary.carCareer, 4);
  const topAgeGroups = getTopItems(item.meetingInfo.summary.ageGroup, 4);
  const topGenders = getTopItems(item.meetingInfo.summary.gender, 2);

  const totalParticipants =
    item.meetingInfo.participantsInfo.membersInfo.length;
  const maxCarCareer = Math.max(
    ...Object.values(item.meetingInfo.summary.carCareer),
  );
  const maxCarModel = Math.max(
    ...Object.values(item.meetingInfo.summary.carModel),
  );
  const maxAgeGroup = Math.max(
    ...Object.values(item.meetingInfo.summary.ageGroup),
  );
  const maxGender = Math.max(...Object.values(item.meetingInfo.summary.gender));

  const renderMemberInfo = (imagePath, nickname, description, memberId) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginBottom: 16}}
        onPress={() => {
          navigation.navigate('OtherProfile', {memberId: memberId});
        }}
        disabled={!(item.meetingInfo.status == 'JOINED')}>
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
        <View style={{justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[textStyles.H5, {color: colors.Gray10}]}>
              {nickname}
            </Text>
            <View style={{width: 4}} />
            {isMeetEnd && userId !== memberId && participateStatus == "JOINED" && !feedbackUserList.includes(memberId) ? 
            (<TouchableOpacity style={{padding:4}}
              onPress={() => {navigation.navigate('UserEvaluate', {targetId: memberId, meetingId: item.meetingInfo.id, imagePath: imagePath, nickname: nickname, description: description})}}  
            >
              <Text style={[textStyles.H6, {color: colors.Blue}]}>
                평가하기
              </Text>
            </TouchableOpacity>)
            :
            (
            isMeetEnd && userId !== memberId && participateStatus == "JOINED" && feedbackUserList.includes(memberId) &&
            <TouchableOpacity
              style={{paddingLeft: 4}}
              disabled={true}
            >
              <Text style={[textStyles.H6, {color: colors.Gray04}]}>
                평가완료
              </Text>
            </TouchableOpacity>)}
          </View>
          <View style={{height: 4}} />
          <Text style={[textStyles.B4, {color: colors.Gray06}]}>
            {description}
          </Text>
        </View>
        <View style={{width: 16}} />
      </TouchableOpacity>
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
          (imagePath = item.meetingInfo.masterInfo.imagePath),
          (nickname = item.meetingInfo.masterInfo.nickname),
          (description = item.meetingInfo.masterInfo.description),
          (memberId = item.meetingInfo.masterInfo.id),
        )}
      </View>
      <GrayLine />
      <View style={{padding: 16}}>
        <View style={{height: 16}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>참여자 현황</Text>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.Gray01,
              padding: 16,
              borderRadius: 10,
              minHeight: 136,
            }}>
            <Text
              style={[
                textStyles.H5,
                {color: colors.Gray09, alignSelf: 'center'},
              ]}>
              운전경력
            </Text>
            <View style={{height: 10}} />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 16,
              }}>
              {topCarCareers.map((keyword, index) => {
                const isMax =
                  item.meetingInfo.summary.carCareer[keyword] === maxCarCareer;
                return (
                  <View
                    key={index}
                    style={{alignItems: 'center', alignSelf: 'flex-end'}}>
                    <View
                      style={{
                        width: 13,
                        height:
                          (item.meetingInfo.summary.carCareer[keyword] /
                            totalParticipants) *
                          60,
                        backgroundColor: isMax ? colors.Blue : colors.Gray03,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    <Text
                      style={[
                        textStyles.B5,
                        {color: isMax ? colors.Blue : colors.Gray06},
                      ]}>
                      {keyword}년
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{width: 16}} />
          <View
            style={{
              flex: 1,
              backgroundColor: colors.Gray01,
              padding: 16,
              borderRadius: 10,
              minHeight: 136,
            }}>
            <Text
              style={[
                textStyles.H5,
                {color: colors.Gray09, alignSelf: 'center'},
              ]}>
              차종
            </Text>
            <Text
              style={[
                textStyles.B5,
                {color: colors.Gray06, alignSelf: 'center'},
              ]}>
              * 상위 두 항목만 표시됩니다.
            </Text>
            <View style={{height: 10}} />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 4,
              }}>
              {topCarModels.map((keyword, index) => {
                const isMax =
                  item.meetingInfo.summary.carModel[keyword] === maxCarModel;
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                      marginHorizontal: 4,
                    }}>
                    <View>
                      <View
                        style={{
                          width: 13,
                          height:
                            (item.meetingInfo.summary.carModel[keyword] /
                              totalParticipants) *
                            60,
                          backgroundColor: isMax ? colors.Blue : colors.Gray03,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}
                      />
                    </View>
                    <View style={{width: 2}} />
                    <View>
                      <Text
                        numberOfLines={1}
                        style={[
                          textStyles.B5,
                          {
                            color: isMax ? colors.Blue : colors.Gray06,
                            textAlign: 'center',
                          },
                        ]}>
                        {keyword}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.Gray01,
              padding: 16,
              borderRadius: 10,
              minHeight: 136,
            }}>
            <Text
              style={[
                textStyles.H5,
                {color: colors.Gray09, alignSelf: 'center'},
              ]}>
              연령대
            </Text>
            <View style={{height: 10}} />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 16,
              }}>
              {topAgeGroups.map((keyword, index) => {
                const isMax =
                  item.meetingInfo.summary.ageGroup[keyword] === maxAgeGroup;
                return (
                  <View
                    key={index}
                    style={{
                      width: 36,
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                    }}>
                    <View
                      style={{
                        width: 13,
                        height:
                          (item.meetingInfo.summary.ageGroup[keyword] /
                            totalParticipants) *
                          60,
                        backgroundColor: isMax ? colors.Blue : colors.Gray03,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    <Text
                      style={[
                        textStyles.B5,
                        {color: isMax ? colors.Blue : colors.Gray06},
                      ]}>
                      {keyword}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{width: 16}} />
          <View
            style={{
              flex: 1,
              backgroundColor: colors.Gray01,
              padding: 16,
              borderRadius: 10,
              minHeight: 136,
            }}>
            <Text
              style={[
                textStyles.H5,
                {color: colors.Gray09, alignSelf: 'center'},
              ]}>
              성별
            </Text>
            <View style={{height: 10}} />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 16,
              }}>
              {topGenders.map((keyword, index) => {
                const isMax =
                  item.meetingInfo.summary.gender[keyword] === maxGender;
                return (
                  <View
                    key={index}
                    style={{
                      width: 36,
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                    }}>
                    <View
                      style={{
                        width: 13,
                        height:
                          (item.meetingInfo.summary.gender[keyword] /
                            totalParticipants) *
                          60,
                        backgroundColor: isMax ? colors.Blue : colors.Gray03,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    <View style={{width: 2}} />
                    <View>
                      <Text
                        style={[
                          textStyles.B5,
                          {color: isMax ? colors.Blue : colors.Gray06},
                        ]}>
                        {keyword}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <GrayLine />
      <View style={{padding: 16}}>
        <View style={{height: 16}} />
        <Text style={[textStyles.H4, {color: colors.Gray10}]}>
          참여자 ({item.meetingInfo.participantsInfo.membersInfo.length}/
          {item.meetingInfo.condition.capacity})
        </Text>
        <View style={{height: 16}} />
        {item.meetingInfo.participantsInfo.membersInfo.map((member, index) => (
          <View key={index}>
            {renderMemberInfo(
              member.imagePath,
              member.nickname,
              member.description,
              member.memberId,
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MeetInfo;
