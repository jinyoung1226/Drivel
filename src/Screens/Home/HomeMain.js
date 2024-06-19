import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriveInfo} from '../../features/drive/driveActions';

const {width} = Dimensions.get('window');

const HomeMain = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [press, setPress] = useState(false);

  const handleDriveCourse = id => {
    dispatch(fetchDriveInfo({id}));
    navigation.navigate('DriveDetail');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable
          onPress={() => handleDriveCourse(2)}
          onPressIn={() => setPress(true)}
          onPressOut={() => setPress(false)}>
          <Image
            source={require('../../assets/image/homeTopImg.jpg')}
            style={[styles.image, {opacity: press ? 0.2 : 1}]}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: 516,
    resizeMode: 'cover',
  },
});
export default HomeMain;
