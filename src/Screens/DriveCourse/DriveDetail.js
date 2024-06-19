import {React, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const DriveDetail = () => {
  const driveInfo = useSelector(state => state.drive.driveInfo);
  console.log(driveInfo);

  return (
    <View>
      <Text>DriveMai</Text>
    </View>
  );
};
export default DriveDetail;
