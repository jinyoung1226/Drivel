import React from 'react';
import {FlatList, View} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import DriveCourseListItem from './DriveCourseListItem';

const DriveCourseList = ({
  ListHeaderComponent,
  data,
  refreshing,
  onRefresh,
  onEndReached,
}) => {
  return (
    <FlatList
      ListFooterComponent={<View style={{height: 8}} />}
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      renderItem={({item}) => <DriveCourseListItem item={item} />}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

export default DriveCourseList;
