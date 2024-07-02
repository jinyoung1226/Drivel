import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';

const ProfileSetting = ({navigation}) => {
  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileSetting;
