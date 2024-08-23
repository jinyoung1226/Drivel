import React, {useEffect, useLayoutEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import BackIcon from "../../assets/icons/BackIcon";
import { ScrollView } from "react-native-gesture-handler";
import { authApi } from "../../api/api";
import {getMeetingApplyList} from '../../features/meet/meetActions';
import refreshMeetList from "../../utils/refreshMeetList";
const MeetApplyDetail = ({navigation}) => {
  const dispatch = useDispatch();
  
  const {
    meetApplyList
  } = useSelector(state => state.meet);


  useEffect(() => {
    return () => {
      refreshMeetList(dispatch);
    }
  }, [])


  const acceptUser = async(id, accepted) => {
    try {
      const response = await authApi.post('/meeting/join/accept',
        {id, accepted}
      )
      if (response.status === 200) {
        if (accepted) {
          Alert.alert('수락되었습니다.');
        } else {
          Alert.alert('거절되었습니다.');
        }
        dispatch(getMeetingApplyList());
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(error.response.data.message);
        dispatch(getMeetingApplyList());
      } else {
        console.log(error);
      }
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '모임 신청목록',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{backgroundColor: colors.BG, flex:1}}>
      <ScrollView>
        {meetApplyList.map((item, index) => (
          <View
          key={index}
          style={{
            backgroundColor: colors.white,
            elevation: 5,
            borderRadius: 10,
            marginVertical:16,
            marginHorizontal: 16,
          }}
          >
            <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 16,
              alignItems: 'center',
              
            }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 5,
                  backgroundColor: colors.Gray04,
                  overflow: 'hidden'
                }}
              >
                <ImageBackground src={item.imagePath} style={{flex:1}}>
                  <View style={{backgroundColor: '#00000010', flex: 1}} />
                </ImageBackground>
              </View>
              <View style={{width: 16}} />
              <View>
                <Text style={[textStyles.B3, {color: colors.Gray10}]}>
                  {item.meetingTitle}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      textStyles.B4,
                      {
                        color: colors.Gray10,
                        borderRadius: 3,
                        backgroundColor: colors.Gray02,
                        padding: 4,
                      },
                    ]}
                    numberOfLines={1}>
                    {item.courseTitle}
                  </Text>
                  <View style={{flex: 1}} />
                </View>
              </View>
            </View>
            <View style={{height:1, backgroundColor:colors.Gray01, marginHorizontal:16}}/>
            {item.requestedMembers.map((item, index) => (
              <View
                key={index}
                style={{
                  flex:1,
                  flexDirection: 'row',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {navigation.navigate('OtherProfile')}}
                  style={{
                    flex:1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}  
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: colors.Gray04,
                      overflow: 'hidden'
                    }}
                  >
                    <ImageBackground src={item.imagePath} style={{flex:1}}>
                      <View style={{backgroundColor: '#00000010', flex: 1}} />
                    </ImageBackground>
                  </View>
                  <View style={{width: 16}} />
                  <View style={{flex:1}}>
                    <Text style={[textStyles.H6, {color: colors.Gray10}]}>
                      {item.nickname}
                    </Text>
                    <Text style={[textStyles.B4, {color: colors.Gray06}]}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{width: 16}} />
                <View style={{flexDirection:'row'}} >
                  <TouchableOpacity
                  style={{
                    backgroundColor: colors.Light_Blue,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 100,
                  }}
                  onPress={() => acceptUser(item.requestId, true)}
                  >
                    <Text style={[textStyles.B4, {color: colors.Blue}]}>수락</Text>
                  </TouchableOpacity>
                  <View style={{width: 8}} />
                  <TouchableOpacity
                  style={{
                    backgroundColor: colors.Gray02,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 100,
                  }}
                  onPress={() => acceptUser(item.requestId, false)}
                  >
                    <Text style={[textStyles.B4, {color: colors.Gray10}]}>거절</Text>
                  </TouchableOpacity>
                </View>
              </View>

            ))}
          </View>
        ))}
      </ScrollView>
    </View>   
  );
}

export default MeetApplyDetail;