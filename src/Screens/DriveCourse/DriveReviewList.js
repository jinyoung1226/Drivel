import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import DriveReviewListItem from './DriveReviewListItem';

const DriveReviewList = ({
  data,
  userId,
  updateReviewInfo,
  updateCourseInfo,
}) => {
  const [selectedReview, setSelectedReview] = useState(null);
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <DriveReviewListItem
          item={item}
          userId={userId}
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
          updateReviewInfo={updateReviewInfo}
          updateCourseInfo={updateCourseInfo}
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={<View style={{height: 16}} />}
      ListFooterComponent={<View style={{height: 16}} />}
      scrollEnabled={false}
    />
  );
};

export default DriveReviewList;
