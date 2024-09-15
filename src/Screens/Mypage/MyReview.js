import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {authApi} from '../../api/api';
import RenderingPage from '../../components/RenderingPage';
import ReiviewList from './ReviewList';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon';
import {textStyles} from '../../styles/textStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyReview = ({navigation}) => {
  const [myReviews, setMyReviews] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '내 리뷰',
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

  const getMyReview = async () => {
    try {
      const response = await authApi.get('review/my');
      if (response.status == 200) {
        // console.log(response.data.reviews[5].images, 'review');
        setMyReviews(response.data.reviews);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log('서버 접속 오류');
      }
    }
  };

  useEffect(() => {
    getMyReview();
  }, []);

  const goDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  if (myReviews == null) {
    return <RenderingPage />;
  }

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <ReiviewList
        ListHeaderComponent={<View style={{height: 16}} />}
        data={myReviews}
        goDriveDetail={goDriveDetail}
      />
    </View>
  );
};

export default MyReview;
