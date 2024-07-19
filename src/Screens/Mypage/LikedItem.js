import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import LinearGradient from 'react-native-linear-gradient';
const LikedItem = ({item, goDriveDetail}) => {
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      style={{
        width: (width - 48) / 2,
        borderRadius: 10,
        backgroundColor: colors.BG,
        height: 174,
        overflow: 'hidden',
      }}
      onPress={() => goDriveDetail(item.id)}>
      <ImageBackground src={item.imagePath} style={{flex: 1}}>
        <LinearGradient
          style={{flex: 1, padding: 16}}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.7)']}>
          <View style={{flex: 1}} />
          <Text style={[textStyles.H5, {color: colors.Gray02}]}>
            {item.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default LikedItem;
