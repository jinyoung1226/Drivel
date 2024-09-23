import React from 'react';
import {FlatList, View} from 'react-native';
import OtherMeetItem from './OtherMeetItem';

const OtherMeetList = ({ListHeaderComponent, data}) => {
  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<View style={{height: 16}} />}
      ItemSeparatorComponent={<View style={{height: 16}} />}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginHorizontal: 16,
      }}
      data={data}
      numColumns={2}
      renderItem={({item}) => <OtherMeetItem item={item} />}
      keyExtractor={item => item.meetingId}
    />
  );
};
export default OtherMeetList;
