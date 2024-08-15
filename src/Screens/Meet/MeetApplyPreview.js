import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import {textStyles} from '../../styles/textStyles'
import colors from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'

const MeetApplyPreview = ({applyList}) => {
  const navigation = useNavigation()
  
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
        }}>
        <Text style={[textStyles.H2, {color: colors.Gray10}]}>
          👤 모임원을 살펴보세요
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MeetApplyDetail', {applyList: applyList})
          }}>
          <Text
            style={[
              textStyles.B3,
              {fontFamily: 'SUIT-Bold', color: colors.Gray04},
            ]}>
            {'자세히보기  >'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 8}} />
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          내가 만든 모임에 참여를 원하는 사람들이 있어요
        </Text>
      </View>
      <View style={{height: 16}} />
      <View style={{paddingHorizontal:16}}>
        {applyList.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MeetApplyDetail', {applyList: applyList})
            }}
            key={index}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 16,
              alignItems: 'center',
              elevation: 5,
              backgroundColor: colors.white,
              borderRadius: 10,
              marginBottom:8
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
            <View style={{flex: 1}} />
            <View style={{width:45, height:45, backgroundColor: colors.Light_Blue, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
              <Text style={[textStyles.H5, {color: colors.Blue}]}>
                {item.requestedMembers.length}명
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default MeetApplyPreview