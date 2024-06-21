import {React, useEffect} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const DriveDetail = () => {
  const driveInfo = useSelector(state => state.drive.driveInfo);
  const {width} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/homeTopImg.jpg')}
        style={[styles.image, {width: width}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    height: 210,
  },
});

export default DriveDetail;
