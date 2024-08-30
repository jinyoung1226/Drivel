import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, Text, FlatList} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import RestaurantBlogList from './RestaurantBlogList';
import config from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { getCafeBlogReview } from '../../features/drive/driveActions';

const RestaurantReviewTab = ({placeInfo}) => {
  const dispatch = useDispatch();
  const {cafeBlogReviewList} = useSelector(state => state.drive);
  useEffect(() => {
    if (cafeBlogReviewList == null) {
      dispatch(getCafeBlogReview(placeInfo.name))
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          padding: 16,
          marginTop: 8,
        }}>
        {cafeBlogReviewList ? (
          <FlatList
            data={cafeBlogReviewList}
            renderItem={({item}) => <RestaurantBlogList item={item} />}
            keyExtractor={item => item.id} // keyExtractor 추가
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        ) : (
        <View>
        {[1,2,3,4,5].map((item, index) => (
          <View 
            key={index}
            style={{
            padding: 16,
            borderRadius: 14,
            backgroundColor: colors.Gray02,
            height: 123,
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <View style={{flexDirection:'row'}}>
              <View style={{height:20, backgroundColor:colors.Gray04, borderRadius:5, flex:3}}/>
              <View style={{flex:1}}/>
            </View>
            <View style={{height:30, backgroundColor:colors.Gray04, borderRadius:5}}/>
            <View style={{flexDirection:'row'}}>
              <View style={{height:10, backgroundColor:colors.Gray04, borderRadius:5, flex:3}}/>
              <View style={{flex:2}}/>
              <View style={{height:10, backgroundColor:colors.Gray04, borderRadius:5, flex:1}}/>
            </View>
          </View>
        ))}
        </View>
        )}
      </View>
    </View>
  );
};

export default RestaurantReviewTab;
