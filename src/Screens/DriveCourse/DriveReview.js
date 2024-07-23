import React, {useState} from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text, Pressable, TextInput} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import NoneStar from '../../assets/icons/NoneStar.svg';
import Pencil from '../../assets/icons/Pencil.svg';
import Star from '../../assets/icons/Star.svg';

const DriveReview = ({item}) => {
  const tabName = ['방문자', '블로그'];
  const [activeTab, setActiveTab] = useState(0);
  const [rating, setRating] = useState(0);

  const handlePress = index => {
    setActiveTab(index);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Pressable key={i} onPress={() => setRating(i)}>
          {i <= rating ? <Star /> : <NoneStar />}
        </Pressable>,
      );
    }
    return stars;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 30,
          paddingLeft: 16,
          marginTop: 24,
          flexDirection: 'row',
          gap: 8,
        }}>
        {tabName.map((item, index) => (
          <Pressable onPress={() => handlePress(index)}>
            <View
              key={index}
              style={{
                borderRadius: 100,
                width: 64,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: activeTab === index ? 0 : 1,
                borderColor: colors.Gray03,
                backgroundColor: activeTab === index ? colors.Blue : null,
              }}>
              <Text
                style={[
                  textStyles.B4,
                  {
                    color:
                      activeTab === index ? colors.White_Blue : colors.Gray10,
                  },
                ]}>
                {item}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          height: 17,
          marginTop: 24,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Star />
          <Text style={[textStyles.H5, {color: colors.Gray07, paddingLeft: 8}]}>
            {item.averageRating}
          </Text>
          <Text style={[textStyles.B3, {color: colors.Gray04, paddingLeft: 8}]}>
            {item.reviewCount}개 리뷰
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pencil />
          <Pressable>
            <Text style={[textStyles.B3, {color: colors.Blue, paddingLeft: 5}]}>
              리뷰 쓰기
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.Gray01,
          borderRadius: 14,
          marginHorizontal: 16,
          marginTop: 16,
          padding: 16,
          height: 171.62,
          justifyContent: 'top',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[textStyles.B4, {color: colors.Gray06}]}>
            해당 코스는 어떠셨나요?
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8, gap: 8}}>
            {renderStars()}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 86,
            width: '100%',
            padding: 16,
            backgroundColor: colors.white,
            marginTop: 16,
            borderRadius: 10,
          }}>
          <TextInput
            style={{height: 18}}
            placeholder="댓글을 남겨주세요"
            maxLength={5}></TextInput>
        </View>
      </View>
    </View>
  );
};

export default DriveReview;
