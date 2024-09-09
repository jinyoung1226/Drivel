import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import formatDate from '../../utils/formatDate';
const ReviewItem = ({item, goDriveDetail}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: colors.Light_Blue,

        padding: 16,
        marginHorizontal: 16,
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
      <View style={{height: 16}} />
      {item.images.length !== 0 && (
        <Image
          src={item.images[0].imagePath}
          style={{height: 150, resizeMode: 'cover', borderRadius: 5}}
        />
      )}
    </TouchableOpacity>
  );
};

export default ReviewItem;
