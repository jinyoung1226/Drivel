import React, {useEffect} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import colors from '../../styles/colors';
import DriveBlogList from './DriveBlogList';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogReview} from '../../features/drive/driveActions';
const DriveBlog = ({item}) => {
  const dispatch = useDispatch();
  const {blogReviewList} = useSelector(state => state.drive);

  useEffect(() => {
    if (blogReviewList == null) {
      dispatch(getBlogReview(item.courseInfo.title));
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        marginTop: 8,
      }}>
      {blogReviewList ? (
        <FlatList
          scrollEnabled={false}
          key={blogReviewList.id}
          data={blogReviewList}
          renderItem={({item}) => <DriveBlogList item={item} />}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View>
          {[1, 2, 3, 4, 5].map((item, index) => (
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
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 20,
                    backgroundColor: colors.Gray04,
                    borderRadius: 5,
                    flex: 3,
                  }}
                />
                <View style={{flex: 1}} />
              </View>
              <View
                style={{
                  height: 30,
                  backgroundColor: colors.Gray04,
                  borderRadius: 5,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 10,
                    backgroundColor: colors.Gray04,
                    borderRadius: 5,
                    flex: 3,
                  }}
                />
                <View style={{flex: 2}} />
                <View
                  style={{
                    height: 10,
                    backgroundColor: colors.Gray04,
                    borderRadius: 5,
                    flex: 1,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DriveBlog;
