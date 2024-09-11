import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import CustomButton from '../../components/CustomButton';
import colors from '../../styles/colors';
import {formDataApi} from '../../api/api';
import BackIcon from '../../assets/icons/BackIcon';
import {getMyProfileInfo} from '../../features/profile/profileActions';
import RenderingPage from '../../components/RenderingPage';

const SelectedProfileImage = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const image = route.params.photo;
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필 사진 수정',
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
    });
  }, [navigation]);

  const changeProfileImage = async () => {
    console.log(image, '이미지');
    try {
      const formData = new FormData();
      formData.append('image', {
        name: image.fileName,
        type: image.type,
        uri: image.uri,
      });
      setIsLoading(true);
      const response = await formDataApi.post('/profile/image', formData);
      if (response.status == 200) {
        dispatch(getMyProfileInfo());
        setIsLoading(false);
        console.log(response.status);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <RenderingPage />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: image.uri}}
        style={{flex: 1, resizeMode: 'contain'}}
      />
      <View
        style={{
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
        }}>
        <CustomButton
          title="프로필 사진 적용"
          onPress={() => {
            changeProfileImage();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectedProfileImage;
