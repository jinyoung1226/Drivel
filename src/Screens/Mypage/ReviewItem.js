import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';

import formatDate from '../../utils/formatDate';
const ReviewItem = ({item, goDriveDetail}) => {
  console.log(item);

  const renderItem = ({item: image, index}) => (
    <View style={{backgroundColor:colors.Gray01}}>
      <Image
        key={index}
        source={{uri: image.imagePath}}
        style={{width: 150, height: 150, borderRadius: 5, resizeMode: 'cover'}}
      />
    </View>
  );

  return (
    <View style={{
      borderRadius: 10,
      backgroundColor: colors.Light_Blue,
      marginHorizontal: 16,
      paddingBottom:16
      }}>
      <TouchableOpacity
        style={{
          padding: 16,
        }}
        onPress={() => goDriveDetail(item.courseId)}>
        <Text style={[textStyles.H4, {color: colors.Blue}]}>
          {/* {item.courseTitle} */}
        </Text>
        <View style={{height: 4}} />
        <Text style={[textStyles.B4, {color: colors.Gray06}]}>
          {formatDate(item.reviewDate)}
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.C4, {color: colors.Gray10}]}>
          {item.comment}
        </Text>
      </TouchableOpacity>
      {item.images.length > 0 && (
        <View>
          <FlatList
            ListHeaderComponent={() => <View style={{width: 16}} />}
            ListFooterComponent={() => <View style={{width: 16}} />}
            data={item.images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 8}} />}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
