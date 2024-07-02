import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';

const MyPage = ({navigation}) => {
  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.H2, textStyles.Gray10]}>안녕하세요</Text>
      <Text style={[textStyles.H2, textStyles.Blue]}>
        {nickname}
        <Text style={textStyles.Gray10}>님</Text>
      </Text>
      <Button
        title="프로필 설정"
        onPress={() => navigation.navigate('ProfileSetting')}
      />
      <Text>My Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyPage;
