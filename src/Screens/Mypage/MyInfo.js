import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import PenIcon from '../../assets/icons/PenIcon';
import chageBrithToAge from '../../utils/changeBrithToAge';
import {useNavigation} from '@react-navigation/native';
const MyInfo = ({myProfileInfo, setModalVisible, modalVisible}) => {
  const navigation = useNavigation();

  const handlePressMyInfo = () => {
    if (myProfileInfo.gender == null) {
      navigation.navigate('RequiredInfo');
    }
    if (myProfileInfo.gender !== null) {
      navigation.navigate('MyInfoDetail', {originPage: 'MyPageMain'});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <TouchableOpacity
        style={{width: 90, height: 90}}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
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
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
        onPress={() => {
          handlePressMyInfo();
        }}>
        <View style={{flex: 1}}>
          <Text style={[textStyles.H2, {color: colors.Gray10}]}>
            {myProfileInfo.nickname}
          </Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              {myProfileInfo.carModel && 
              <Text
                style={[textStyles.C4, {color: colors.Gray05}]}>
                  {myProfileInfo.carModel}
              </Text>}
              {myProfileInfo.carModel && myProfileInfo.carCareer && 
              <Text style={[textStyles.C4, {color: colors.Gray05}]}>
                {' • '}
              </Text>
              }
              {myProfileInfo.carCareer &&
              <Text style={[textStyles.C4, {color: colors.Gray05}]}>
                운전경력 {myProfileInfo.carCareer}년
              </Text>}
            </View>
            <View style={{flexDirection: 'row'}}>
              {myProfileInfo.gender && 
              <Text
                style={[textStyles.C4, {color: colors.Gray05}]}>
                  {myProfileInfo.gender}
              </Text>}
              {myProfileInfo.gender && myProfileInfo.birth && 
              <Text style={[textStyles.C4, {color: colors.Gray05}]}>
                {' • '}
              </Text>
              }
              {myProfileInfo.birth &&
              <Text style={[textStyles.C4, {color: colors.Gray05}]}>
                {chageBrithToAge(myProfileInfo.birth)}세
              </Text>}
            </View>
            {myProfileInfo.description &&
            <Text style={[textStyles.C4, {color: colors.Gray08}]}>
              {myProfileInfo.description}
            </Text>}
          </View>
        </View>
        <View style={{width: 10}} />
        <Text
          style={{fontFamily: 'SUIT-Bold', color: colors.Gray03, fontSize: 20}}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyInfo;
