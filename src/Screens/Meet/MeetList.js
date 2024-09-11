import React from 'react';
import {FlatList} from 'react-native';
import MeetListItem from './MeetListItem';
import {RefreshControl} from 'react-native-gesture-handler';
const MeetList = ({
  ListHeaderComponent,
  data,
  refreshing,
  onRefresh,
  onEndReached,
  ListFooterComponent,
  scrollEnabled = true,
}) => {
  return (
    <FlatList
      scrollEnabled={scrollEnabled}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      renderItem={({item}) => <MeetListItem item={item} />}
      keyExtractor={item => item.meetingId}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};
export default MeetList;
