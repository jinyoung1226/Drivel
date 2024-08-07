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
      keyExtractor={(item, index) => `${item.id}-${index}`} // 인덱스를 함께 사용하여 고유 키 생성
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default DriveCourseList;
