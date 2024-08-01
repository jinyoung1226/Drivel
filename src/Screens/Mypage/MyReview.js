import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {authApi} from "../../api/api";
import RenderingPage from "../../components/RenderingPage";
import ReiviewList from "./ReviewList";
import colors from "../../styles/colors";
const MyReview = ({navigation}) => {
  const [myReviews, setMyReviews] = useState([]);

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
  }

  useEffect(() => {
    getMyReview();
  }, []);

  const goDriveDetail = id => {
    navigation.navigate('DriveDetail', {id: id});
  };

  if (myReviews.length == 0) {
    return (
      <RenderingPage/>
    )
  }

 return (
  <View style={{backgroundColor:colors.BG}}>
    <ReiviewList ListHeaderComponent={<View style={{height:16}}/>} data={myReviews} goDriveDetail={goDriveDetail} />
  </View>
 )
}

export default MyReview;