import React from 'react';
import {FlatList, View} from 'react-native';

import ReviewItem from './ReviewItem';
const ReviewList = ({goDriveDetail, ListHeaderComponent, data}) => {
  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<View style={{height: 16}} />}
      ItemSeparatorComponent={<View style={{height: 16}} />}
      data={data}
      renderItem={({item}) => (
        <ReviewItem item={item} goDriveDetail={goDriveDetail} />
      )}
      keyExtractor={item => item.id}
    />
  );
};
export default ReviewList;
