import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {imageMap} from '../../assets/magazineData/magazineData';

const {width, height} = Dimensions.get('window');
console.log(height);

const MagazineInfo = ({route}) => {
  const navigation = useNavigation();
  const imageKey = route.params.imageKey;
  console.log(imageKey);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
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
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View >
        <Image
          source={imageMap[imageKey]}
          style={{width: width, height: 3000}}
          resizeMode='contain'
        />
      </View>
    </ScrollView>
  );
};

export default MagazineInfo;
