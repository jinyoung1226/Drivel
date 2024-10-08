import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Star from '../../assets/icons/Star.svg';
import {useNavigation} from '@react-navigation/native';

const DriveCourseListItem = ({item}) => {
  const navigation = useNavigation();

  const handleDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  return (
    <TouchableOpacity
      onPress={() => handleDriveDetail(item.id)}
      style={{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.BG,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.Gray01,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
      }}>
      <View style={{flex: 1}}>
        <Text style={[textStyles.H5, {color: colors.Gray10}]}>
          {item.title}
        </Text>
        <Text style={[textStyles.B4, {color: colors.Gray07}]}>
          {item.region}
        </Text>
        <View style={{height: 8}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {item.tags.slice(0, 5).map((tag, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                margin: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.Gray02,
                  borderRadius: 4,
                  paddingLeft: 4,
                  paddingRight: 4,
                  height: 22,
                  justifyContent: 'center',
                }}>
                <Text style={[textStyles.B4, {color: colors.Gray04}]}>
                  {tag}
                </Text>
              </View>
              {item.tags.slice(0, 5).length - 1 !== index ? (
                <View style={{padding: 2}}>
                  <Text style={[textStyles.B4, {color: colors.Gray04}]}>
                    {'  · '}
                  </Text>
                </View>
              ) : (
                item.tags.length > 5 && (
                  <View style={{padding: 2}}>
                    <Text style={[textStyles.B4, {color: colors.Gray04}]}>
                      {' ... '}
                    </Text>
                  </View>
                )
              )}
            </View>
          ))}
        </View>
        <View style={{height: 8}} />
        <View style={{flex: 1}} />
        <View style={{flexDirection: 'row'}}>
          <Star />
          <View style={{width: 4}} />
          <Text style={[textStyles.B4, {color: colors.Gray07}]}>
            {item.averageRating}
          </Text>
          <View style={{width: 2}} />
          <Text style={[textStyles.B4, {color: colors.Gray06}]}>
            ({item.reviewCount})
          </Text>
        </View>
      </View>
      <View style={{width: 8}} />
      <View
        style={{
          width: 90,
          minHeight: 120,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <ImageBackground src={item.imagePath} style={{flex: 1}}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.1)', flex: 1}} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default DriveCourseListItem;
