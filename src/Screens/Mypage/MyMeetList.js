import React from 'react';
import {FlatList, View} from 'react-native';
import MyMeetItem from './MyMeetItem';
const MyMeetList = ({ListHeaderComponent, data}) => {
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
      renderItem={({item}) => (
        <MyMeetItem item={item}/>
      )}
      keyExtractor={item => item.meetingId}
    />
  );
};
export default MyMeetList;
