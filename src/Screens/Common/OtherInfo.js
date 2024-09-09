import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import PenIcon from '../../assets/icons/PenIcon';
import chageBrithToAge from '../../utils/changeBrithToAge';
import {useNavigation} from '@react-navigation/native';
const OtherInfo = ({myProfileInfo}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <View style={{width: 90, height: 90}}>
        <View
          style={{
            width: 90,
            height: 90,
            backgroundColor: colors.Gray02,
            borderRadius: 45,
            overflow: 'hidden',
          }}>
          <Image src={myProfileInfo.imagePath} style={{flex: 1}} />
        </View>
      </View>
      <View style={{width: 16}} />
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            {myProfileInfo.nickname}
          </Text>
          <View>
            <Text
              style={[textStyles.C4, {color: colors.Gray05}]}
              numberOfLines={2}>
              {`${myProfileInfo.carModel} • 운전경력 ${
                myProfileInfo.carCareer
              }년\n${myProfileInfo.gender} • ${chageBrithToAge(
                myProfileInfo.birth,
              )}세`}
            </Text>
            <Text style={[textStyles.C4, {color: colors.Gray08}]}>
              {myProfileInfo.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherInfo;
