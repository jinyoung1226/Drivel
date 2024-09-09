import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {magazineBanner} from '../../assets/magazineData/magazineData';

const {width} = Dimensions.get('window');

const HomeBanner = () => {
  const navigation = useNavigation();
  const [randomBannerId, setRandomBannerId] = useState(null);
  useEffect(() => {
    setRandomBannerId(Math.floor(Math.random() * 4));
  }, []);

  const handleMagazineInfo = id => {
    navigation.navigate('MagazineInfo', {id: id + 1});
  };

  return (
    <View>
      <Pressable onPress={() => handleMagazineInfo(randomBannerId)}>
        <View
          style={{
            width: width,
            height: width * 1.3,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
          }}>
          {randomBannerId !== null && (
            <ImageBackground
              source={{uri: magazineBanner[randomBannerId].imagePath}}
              style={{flex: 1}}
              imageStyle={{borderBottomRightRadius: 40}}>
              <View style={{flex: 3}} />
              <LinearGradient
                style={{flex: 2, paddingVertical: 31, paddingLeft: 24}}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}>
                <View style={{flex: 1}} />
                <Text style={[textStyles.H1, {color: colors.white}]}>
                  {magazineBanner[randomBannerId].title}
                </Text>
              </LinearGradient>
            </ImageBackground>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default HomeBanner;
