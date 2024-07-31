import {useState} from 'react';
import {View, Text, Image, Pressable, Linking} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import SeeMore from '../../assets/icons/SeeMore.svg';

const DriveBlogList = ({item}) => {
  const removeHtmlTags = str => {
    return str.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const formatDate = data => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const date = date.substring(6, 8);
    return `${year}년${month}월${date}일`;
  };

  const title = removeHtmlTags(item.title);
  const description = removeHtmlTags(item.description);
  const postDate = formatDate(item.postdate);

  return (
    <Pressable>
      <View
        style={{
          padding: 16,
          borderRadius: 14,
          backgroundColor: colors.Gray01,
          height: 123,
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <View style={{marginBottom: 8}}>
          <Text
            style={[textStyles.B2, {color: colors.Gray10, marginBottom: 8}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={[textStyles.C4, {color: colors.Gray07}]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Text style={[textStyles.B5, {color: colors.Blue}]}>
              {item.bloggername}
            </Text>
            <Text style={[textStyles.B5, {color: colors.Gray06}]}>
              {postDate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Text style={[textStyles.B5, {color: colors.Gray04}]}>더보기</Text>
            <SeeMore />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DriveBlogList;
